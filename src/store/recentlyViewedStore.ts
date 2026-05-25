import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Motorcycle } from '../types/motorcycle';

interface RecentlyViewedState {
  recentlyViewed: Motorcycle[];
  addToRecentlyViewed: (motorcycle: Motorcycle) => void;
  clearRecentlyViewed: () => void;
  getRecentlyViewed: () => Motorcycle[];
  removeFromRecentlyViewed: (motorcycleId: string) => void;
}

const MAX_RECENT_ITEMS = 12; // Maximum number of recently viewed items to store

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      recentlyViewed: [],

      addToRecentlyViewed: (motorcycle) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter(item => item.id !== motorcycle.id);
        
        const updated = [motorcycle, ...filtered];
        
        const trimmed = updated.slice(0, MAX_RECENT_ITEMS);
        
        set({ recentlyViewed: trimmed });
      },

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] });
      },

      getRecentlyViewed: () => {
        const { recentlyViewed } = get();
        return recentlyViewed;
      },

      removeFromRecentlyViewed: (motorcycleId) => {
        const { recentlyViewed } = get();
        set({ recentlyViewed: recentlyViewed.filter(item => item.id !== motorcycleId) });
      },
    }),
    {
      name: 'motorcycle-recently-viewed', // localStorage key
    }
  )
);