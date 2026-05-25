import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryState {
  recentSearches: string[];
  addSearch: (searchTerm: string) => void;
  clearRecentSearches: () => void;
  removeSearch: (searchTerm: string) => void;
}

const MAX_RECENT_SEARCHES = 8;

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      recentSearches: [],

      addSearch: (searchTerm) => {
        if (!searchTerm.trim()) return;
        
        const { recentSearches } = get();
        // Remove if already exists
        const filtered = recentSearches.filter(term => term !== searchTerm);
        // Add to beginning
        const updated = [searchTerm, ...filtered];
        // Keep only MAX_RECENT_SEARCHES
        const trimmed = updated.slice(0, MAX_RECENT_SEARCHES);
        
        set({ recentSearches: trimmed });
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },

      removeSearch: (searchTerm) => {
        const { recentSearches } = get();
        set({ recentSearches: recentSearches.filter(term => term !== searchTerm) });
      },
    }),
    {
      name: 'motorcycle-search-history',
    }
  )
);