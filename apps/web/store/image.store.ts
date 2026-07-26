import { create } from "zustand";
import { AIImage } from "@/services/image.service";

interface ImageStore {
  images: AIImage[];
  generating: boolean;

  setImages: (images: AIImage[]) => void;

  addImage: (image: AIImage) => void;

  deleteImage: (id: string) => void;

  setGenerating: (
    value: boolean
  ) => void;
}

export const useImageStore =
  create<ImageStore>((set) => ({
    images: [],

    generating: false,

    setImages: (images) =>
      set({ images }),

    addImage: (image) =>
      set((state) => ({
        images: [
          image,
          ...state.images,
        ],
      })),

    deleteImage: (id) =>
      set((state) => ({
        images: state.images.filter(
          (i) => i._id !== id
        ),
      })),

    setGenerating: (
      generating
    ) =>
      set({
        generating,
      }),
  }));