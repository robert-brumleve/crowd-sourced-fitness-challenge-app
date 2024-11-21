import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../lib/firebase";

export const useChatImageStore = create((set)=>({
    chatImgs: [],
    fetchChatImgs: async (chatId)=>{
        if (!chatId) return set({chatImgs: []});
        try{
            const chatRef = doc(db, "chats",chatId);
            const chatSnap = await getDoc(chatRef);
            if(chatSnap.exists()){
                set({
                    chatImgs: chatSnap.data().images,
                })
            }else{
                return set({chatImages:[]})
            }
        }catch(err){
            return set({chatImgs:[]});
        }
    }
    
}));
