# Firestore Schema

## /users/{uid}
- displayName
- email
- photoURL
- role ("admin" | "user")
- createdAt

## /quotes/{quoteId}
- text: string
- authorName: string
- submitterId: uid
- createdAt: timestamp
- approved: boolean (default false)
- ratingCount: number
- ratingTotal: number
- ratingAvg: number
- deleted: boolean (optional soft-delete)

### Subcollection: /quotes/{quoteId}/ratings/{uid}
- value: number (1–5)
- createdAt: timestamp

## /news/{newsId}
- title
- body
- authorId
- createdAt
- published: boolean

## /meta/song
- title
- videoUrl
- audioUrl
- setBy: uid
- setAt: timestamp

## /records/{recordId}
- name
- winner1: { name, imageUrl }
- winner2: { name, imageUrl }
- winner3: { name, imageUrl }
- recordImageUrl (optional)
- description
- createdAt
- createdBy: uid
