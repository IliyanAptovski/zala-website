// supabase-quotes.js
import { supabase } from './supabase-config.js'
import { isAdmin, getCurrentUser } from './supabase-auth.js'

class SupabaseQuotesManager {
  constructor() {
    this.tableName = 'quotes'
    this.ratingsTable = 'quote_ratings'
  }

  // Add a new quote
  async addQuote(text, authorName) {
    if (!getCurrentUser()) {
      throw new Error('You must be logged in to add a quote')
    }

    const quoteData = {
      text: text.trim(),
      author_name: authorName.trim(),
      submitter_id: getCurrentUser().id,
      approved: isAdmin() // Auto-approve if admin
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .insert([quoteData])
      .select()

    if (error) throw error
    return data[0].id
  }

  // Get all quotes (approved only for non-admins)
  async getQuotes(includeUnapproved = false) {
    let query = supabase
      .from(this.tableName)
      .select(`
        *,
        users:submitter_id(display_name, email)
      `)
      .order('created_at', { ascending: false })

    // If not admin, only get approved quotes
    if (!includeUnapproved || !isAdmin()) {
      query = query.eq('approved', true)
    }

    const { data, error } = await query

    if (error) throw error

    // Get user ratings for each quote
    const quotesWithRatings = await Promise.all(
      data.map(async (quote) => {
        if (getCurrentUser()) {
          quote.user_rating = await this.getUserRating(quote.id)
        }
        return quote
      })
    )

    return quotesWithRatings
  }

  // Rate a quote
  async rateQuote(quoteId, rating) {
    if (!getCurrentUser()) {
      throw new Error('You must be logged in to rate quotes')
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    // Start a transaction by getting current state
    const { data: existingRating, error: fetchError } = await supabase
      .from(this.ratingsTable)
      .select('value')
      .eq('quote_id', quoteId)
      .eq('user_id', getCurrentUser().id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError

    const oldRating = existingRating?.value || 0

    // Upsert the rating
    const { error: ratingError } = await supabase
      .from(this.ratingsTable)
      .upsert({
        quote_id: quoteId,
        user_id: getCurrentUser().id,
        value: rating
      }, {
        onConflict: 'quote_id,user_id'
      })

    if (ratingError) throw ratingError

    // Update quote aggregates
    await this.updateQuoteRatings(quoteId, oldRating, rating)
  }

  async updateQuoteRatings(quoteId, oldRating, newRating) {
    // Get current aggregates
    const { data: quote, error: fetchError } = await supabase
      .from(this.tableName)
      .select('rating_count, rating_total, rating_avg')
      .eq('id', quoteId)
      .single()

    if (fetchError) throw fetchError

    const currentCount = quote.rating_count || 0
    const currentTotal = quote.rating_total || 0

    // Calculate new aggregates
    const newTotal = currentTotal - oldRating + newRating
    const newCount = oldRating === 0 ? currentCount + 1 : currentCount
    const newAvg = newCount > 0 ? Math.round((newTotal / newCount) * 10) / 10 : 0

    // Update quote
    const { error: updateError } = await supabase
      .from(this.tableName)
      .update({
        rating_count: newCount,
        rating_total: newTotal,
        rating_avg: newAvg
      })
      .eq('id', quoteId)

    if (updateError) throw updateError
  }

  // Get user's rating for a quote
  async getUserRating(quoteId) {
    if (!getCurrentUser()) return null

    const { data, error } = await supabase
      .from(this.ratingsTable)
      .select('value')
      .eq('quote_id', quoteId)
      .eq('user_id', getCurrentUser().id)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data?.value || null
  }

  // Admin: Approve quote
  async approveQuote(quoteId) {
    if (!isAdmin()) {
      throw new Error('Only admins can approve quotes')
    }

    const { error } = await supabase
      .from(this.tableName)
      .update({ approved: true })
      .eq('id', quoteId)

    if (error) throw error
  }

  // Delete quote (users can delete their own, admins can delete any)
  async deleteQuote(quoteId) {
    if (!getCurrentUser()) {
      throw new Error('You must be logged in to delete quotes')
    }

    // Check if user owns the quote or is admin
    const { data: quote, error: fetchError } = await supabase
      .from(this.tableName)
      .select('submitter_id')
      .eq('id', quoteId)
      .single()

    if (fetchError) throw fetchError

    if (quote.submitter_id !== getCurrentUser().id && !isAdmin()) {
      throw new Error('You can only delete your own quotes')
    }

    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', quoteId)

    if (error) throw error
  }
}

export default SupabaseQuotesManager