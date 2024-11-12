//This code is based from
// https://zustand.docs.pmnd.rs/getting-started/introduction
// and https://firebase.google.com/docs/firestore/query-data/get-data

import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useChatStore = create((set) => ({
  currentChat: null,
  currentChatId: null,
  participant:[],
  changeChat:(selectedChatId)=>{return set({currentChatId: selectedChatId});
  },
  resetChat: ()=> {return set({currentChat: null, currentChatId: null})},
  fetchChatInfo: async (chatId) => {
    if (!chatId) return set({ chatId: null });
    try {
      const docRef = doc(db, "chats", chatId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentChat: docSnap.data() });
      } else {
        set({ currentChat: null });
      }
    } catch (err) {
      return set({ currentChat: null});
    }
  },

}));