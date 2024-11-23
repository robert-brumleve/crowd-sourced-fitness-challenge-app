//This code is based from
// https://zustand.docs.pmnd.rs/getting-started/introduction
// and https://firebase.google.com/docs/firestore/query-data/get-data

import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../lib/firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data() });
      } else {
        set({ currentUser: null });
      }
    } catch (err) {
      return set({ currentUser: null });
    }
  },
}));
