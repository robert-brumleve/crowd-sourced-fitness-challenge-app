import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatListStore = create(
  persist(
    (set) => ({
      chatListDetail: null,
      storeChatListDetail: (state) => set({ chatListDetail: state }),
    }),
    { name: "chatlist-detail-storage", getStorage: () => localStorage }
  )
);
