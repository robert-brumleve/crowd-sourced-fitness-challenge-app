
import { create } from "zustand";

export const useChatDetailStore = create((set) => ({
    chatDetail: null,
    storeChatDetail: (state) => {
        return set({chatDetail: state})
    },
    
}));


