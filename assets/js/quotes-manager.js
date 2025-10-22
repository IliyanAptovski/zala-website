import { db, auth } from './firebase.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc, 
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  runTransaction
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { isAdmin } from './auth.js';

class QuotesManager {
  constructor() {
    this.quotesCollection = collection(db, 'quotes');
    this.ratingsCollection = (quoteId) => collection(db, `quotes/${quoteId}/ratings`);
  }

  // Add a new quote (requires login)
  async addQuote(text, authorName) {
    if (!auth.currentUser) {
      throw new Error('You must be logged in to add a quote');
    }

    const quoteData = {
      text: text.trim(),
      authorName: authorName.trim(),
      submitterId: auth.currentUser.uid,
      submitterName: auth.currentUser.displayName || auth.currentUser.email,
      createdAt: serverTimestamp(),
      approved: isAdmin(), // Auto-approve if admin
      rating: {
        avg: 0,
        count: 0,
        total: 0
      }
    };

    const docRef = await addDoc(this.quotesCollection, quoteData);
    return docRef.id;
  }

  // Get all approved quotes
  async getQuotes(includeUnapproved = false) {
    let q;
    if (includeUnapproved && isAdmin()) {
      q = query(this.quotesCollection, orderBy('createdAt', 'desc'));
    } else {
      q = query(this.quotesCollection, 
        where('approved', '==', true), 
        orderBy('createdAt', 'desc')
      );
    }

    const snapshot = await getDocs(q);
    const quotes = [];
    
    for (const doc of snapshot.docs) {
      const quote = { id: doc.id, ...doc.data() };
      
      // Get user's rating for this quote
      if (auth.currentUser) {
        quote.userRating = await this.getUserRating(doc.id);
      }
      
      quotes.push(quote);
    }
    
    return quotes;
  }

  // Rate a quote
  async rateQuote(quoteId, rating) {
    if (!auth.currentUser) {
      throw new Error('You must be logged in to rate quotes');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const quoteRef = doc(db, 'quotes', quoteId);
    const userRatingRef = doc(db, `quotes/${quoteId}/ratings`, auth.currentUser.uid);

    await runTransaction(db, async (transaction) => {
      const quoteDoc = await transaction.get(quoteRef);
      if (!quoteDoc.exists()) {
        throw new Error('Quote not found');
      }

      const userRatingDoc = await transaction.get(userRatingRef);
      const oldRating = userRatingDoc.exists() ? userRatingDoc.data().value : 0;
      
      // Update user's rating
      transaction.set(userRatingRef, {
        value: rating,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });

      // Update quote aggregate ratings
      const quoteData = quoteDoc.data();
      const currentTotal = quoteData.rating.total || 0;
      const currentCount = quoteData.rating.count || 0;
      
      const newTotal = currentTotal - oldRating + rating;
      const newCount = userRatingDoc.exists() ? currentCount : currentCount + 1;
      const newAvg = newCount > 0 ? newTotal / newCount : 0;

      transaction.update(quoteRef, {
        'rating.avg': Math.round(newAvg * 10) / 10,
        'rating.count': newCount,
        'rating.total': newTotal
      });
    });
  }

  // Get user's rating for a quote
  async getUserRating(quoteId) {
    if (!auth.currentUser) return null;
    
    const ratingDoc = await getDoc(doc(db, `quotes/${quoteId}/ratings`, auth.currentUser.uid));
    return ratingDoc.exists() ? ratingDoc.data().value : null;
  }

  // Admin: Approve quote
  async approveQuote(quoteId) {
    if (!isAdmin()) {
      throw new Error('Only admins can approve quotes');
    }

    await updateDoc(doc(db, 'quotes', quoteId), {
      approved: true
    });
  }

  // Admin: Delete quote
  async deleteQuote(quoteId) {
    if (!isAdmin()) {
      throw new Error('Only admins can delete quotes');
    }

    await deleteDoc(doc(db, 'quotes', quoteId));
  }

  // User: Delete own quote
  async deleteOwnQuote(quoteId) {
    if (!auth.currentUser) {
      throw new Error('You must be logged in to delete quotes');
    }

    const quoteDoc = await getDoc(doc(db, 'quotes', quoteId));
    if (!quoteDoc.exists()) {
      throw new Error('Quote not found');
    }

    const quoteData = quoteDoc.data();
    if (quoteData.submitterId !== auth.currentUser.uid && !isAdmin()) {
      throw new Error('You can only delete your own quotes');
    }

    await deleteDoc(doc(db, 'quotes', quoteId));
  }
}

export default QuotesManager;