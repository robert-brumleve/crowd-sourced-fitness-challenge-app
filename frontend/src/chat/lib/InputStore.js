
import { create } from "zustand";


export const useInputStore = create((set) => ({
  text: "",

  setText: (newText) => set({text: newText}),

  imgInput:{
    file: null,
    url:null,
  },

  setImgInput:(newFile) =>set(
    {
    imgInput:{
        file: newFile, 
        url: URL.createObjectURL(newFile)}
    }),

  resetInput: () => set({
    text: "",
    imgInput:{
        file: null,
        url:null,
      },
      
  }),

}));