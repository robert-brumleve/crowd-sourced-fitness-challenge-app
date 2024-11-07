//This code is based from
// https://zustand.docs.pmnd.rs/getting-started/introduction
// and https://firebase.google.com/docs/firestore/query-data/get-data

import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
import { useUserStore } from "./UserStore";

export const useChatStore = create((set) => ({
  chatId: null,
  user:null,
    changeChat:(chatId,user)=>{
        const currentUser = useUserStore.getState().currentUser;
        return set({chatId,user});
    }
    

    
  
}));