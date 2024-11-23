import { create } from "zustand";

export const useChatListStore = create((set) => ({
  chatListDetail: null,
  storeChatListDetail: (state) => {
    set({ chatListDetail: state });
  },
}));
