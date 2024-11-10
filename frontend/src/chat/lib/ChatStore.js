//This code is based from
// https://zustand.docs.pmnd.rs/getting-started/introduction
// and https://firebase.google.com/docs/firestore/query-data/get-data


import { create } from "zustand";

export const useChatStore = create((set) => ({
  chatId: null,
  user:null,
  changeChat:(chatId,user)=>{return set({chatId,user});
  },
  resetChat: ()=> {return set({chatId: null, user:null})},

}));