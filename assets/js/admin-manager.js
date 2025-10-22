import { db, storage } from './firebase.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import { isAdmin, getCurrentUser } from './auth.js';

class AdminManager {
  constructor() {
    if (!isAdmin()) {
      throw new Error('Access denied. Admin privileges required.');
    }
  }

  // News Management
  async addNews(title, body) {
    const newsData = {
      title: title.trim(),
      body: body.trim(),
      authorId: getCurrentUser().uid,
      authorName: getCurrentUser().displayName || getCurrentUser().email,
      createdAt: serverTimestamp(),
      published: true
    };

    const docRef = await addDoc(collection(db, 'news'), newsData);
    return docRef.id;
  }

  async getNews() {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async deleteNews(newsId) {
    await deleteDoc(doc(db, 'news', newsId));
  }

  // Song of the Week Management
  async setSongOfWeek(videoFile, audioFile, title) {
    const metaRef = doc(db, 'meta', 'songOfWeek');
    
    // Upload files to storage
    const videoUrl = await this.uploadFile(videoFile, 'songs/video');
    const audioUrl = await this.uploadFile(audioFile, 'songs/audio');

    // Delete previous files if they exist
    const currentDoc = await getDoc(metaRef);
    if (currentDoc.exists()) {
      const currentData = currentDoc.data();
      await this.deleteFileFromUrl(currentData.videoUrl);
      await this.deleteFileFromUrl(currentData.audioUrl);
    }

    const songData = {
      title: title.trim(),
      videoUrl: videoUrl,
      audioUrl: audioUrl,
      setBy: getCurrentUser().uid,
      setByUserName: getCurrentUser().displayName || getCurrentUser().email,
      setAt: serverTimestamp()
    };

    await setDoc(metaRef, songData);
    return songData;
  }

  async getSongOfWeek() {
    const docRef = await getDoc(doc(db, 'meta', 'songOfWeek'));
    return docRef.exists() ? docRef.data() : null;
  }

  // Records Management
  async addRecord(recordData, winnerImage, recordImage = null) {
    const winnerImageUrl = await this.uploadFile(winnerImage, 'records/winners');
    let recordImageUrl = null;
    
    if (recordImage) {
      recordImageUrl = await this.uploadFile(recordImage, 'records');
    }

    const record = {
      name: recordData.name.trim(),
      description: recordData.description || '',
      firstPlace: {
        winnerName: recordData.firstPlace.winnerName.trim(),
        winnerImage: winnerImageUrl,
        result: recordData.firstPlace.result || ''
      },
      secondPlace: {
        winnerName: recordData.secondPlace.winnerName.trim(),
        result: recordData.secondPlace.result || ''
      },
      thirdPlace: {
        winnerName: recordData.thirdPlace.winnerName.trim(),
        result: recordData.thirdPlace.result || ''
      },
      recordImage: recordImageUrl,
      createdAt: serverTimestamp(),
      createdBy: getCurrentUser().uid,
      createdByName: getCurrentUser().displayName || getCurrentUser().email
    };

    const docRef = await addDoc(collection(db, 'records'), record);
    return docRef.id;
  }

  async getRecords() {
    const q = query(collection(db, 'records'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async deleteRecord(recordId) {
    const recordDoc = await getDoc(doc(db, 'records', recordId));
    if (recordDoc.exists()) {
      const recordData = recordDoc.data();
      
      // Delete associated images
      await this.deleteFileFromUrl(recordData.firstPlace.winnerImage);
      if (recordData.recordImage) {
        await this.deleteFileFromUrl(recordData.recordImage);
      }
      
      await deleteDoc(doc(db, 'records', recordId));
    }
  }

  // File upload helper
  async uploadFile(file, path) {
    const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    return await getDownloadURL(snapshot.ref);
  }

  async deleteFileFromUrl(fileUrl) {
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.warn('Error deleting file:', error);
    }
  }

  // Get pending quotes for approval
  async getPendingQuotes() {
    const QuotesManager = (await import('./quotes-manager.js')).default;
    const quotesManager = new QuotesManager();
    return await quotesManager.getQuotes(true).then(quotes => 
      quotes.filter(quote => !quote.approved)
    );
  }
}

export default AdminManager;