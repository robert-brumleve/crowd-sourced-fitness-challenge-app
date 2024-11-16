import { create } from "zustand";

export const useInputStore = create((set) => ({
  text: "",
  imgInput: {
    file: null,
    url: null,
  },

  setText: (newText) => set({ text: newText }),

  setImgInput: (newFile) =>
    set({
      imgInput: {
        file: newFile,
        url: URL.createObjectURL(newFile),
      },
    }),

  resetInput: () =>
    set({
      text: "",
      imgInput: {
        file: null,
        url: null,
      },
    }),
}));
