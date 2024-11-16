import { create } from "zustand";

export const useActiveTabStore = create((set)=>({
    activeTab: "chatlist",
    setActiveTab: (state) => {
        return set({activeTab: state})
    },
}));