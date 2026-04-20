import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, serverTimestamp } from "firebase/firestore";

// CREATE: Save an article
export const saveBookmark = async (userId, article) => {
  try {
    const docRef = await addDoc(collection(db, "bookmarks"), {
      userId,
      ...article,
      note: "",
      savedAt: serverTimestamp()
    });
    return { id: docRef.id, ...article, note: "" };
  } catch (error) {
    console.error("Error saving bookmark:", error);
    throw error;
  }
};

// READ: Get all bookmarks for a user
export const getBookmarks = async (userId) => {
  try {
    const q = query(collection(db, "bookmarks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }
};

// UPDATE: Add/Update note on a bookmark
export const updateBookmarkNote = async (bookmarkId, newNote) => {
  try {
    const bookmarkRef = doc(db, "bookmarks", bookmarkId);
    await updateDoc(bookmarkRef, {
      note: newNote
    });
  } catch (error) {
    console.error("Error updating bookmark note:", error);
    throw error;
  }
};

// DELETE: Remove a bookmark
export const deleteBookmark = async (bookmarkId) => {
  try {
    await deleteDoc(doc(db, "bookmarks", bookmarkId));
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw error;
  }
};
