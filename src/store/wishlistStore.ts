import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {type Motorcycle } from '../types/motorcycle';

interface WishlistState {
  wishlistItems: Motorcycle[];
  addToWishlist: (motorcycle: Motorcycle) => void;
  removeFromWishlist: (motorcycleId: string) => void;
  toggleWishlist: (motorcycle: Motorcycle) => void;
  isInWishlist: (motorcycleId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
  getWishlistTotalValue: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistItems: [],
      addToWishlist: (motorcycle) => {
        const { wishlistItems } = get();
        if (!wishlistItems.find(item => item.id === motorcycle.id)) {
          set({ wishlistItems: [...wishlistItems, motorcycle] });
        }
      },

      removeFromWishlist: (motorcycleId) => {
        const { wishlistItems } = get();
        set({ wishlistItems: wishlistItems.filter(item => item.id !== motorcycleId) });
      },

      toggleWishlist: (motorcycle) => {
        const { wishlistItems, addToWishlist, removeFromWishlist } = get();
        if (wishlistItems.find(item => item.id === motorcycle.id)) {
          removeFromWishlist(motorcycle.id);
        } else {
          addToWishlist(motorcycle);
        }
      },

      isInWishlist: (motorcycleId) => {
        const { wishlistItems } = get();
        return wishlistItems.some(item => item.id === motorcycleId);
      },

      clearWishlist: () => {
        set({ wishlistItems: [] });
      },

      getWishlistCount: () => {
        const { wishlistItems } = get();
        return wishlistItems.length;
      },

      getWishlistTotalValue: () => {
        const { wishlistItems } = get();
        return wishlistItems.reduce((total, item) => total + item.price, 0);
      },
    }),
    {
      name: 'motorcycle-wishlist', // localStorage key
    }
  )
);