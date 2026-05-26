import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {type Motorcycle } from '../types/motorcycle';

interface ViewRecord {
  motorcycleId: string;
  viewCount: number;
  lastViewed: Date;
}

interface AnalyticsState {
  viewRecords: ViewRecord[];
  popularMotorcycles: string[]; // Array of motorcycle IDs sorted by popularity
  incrementViewCount: (motorcycleId: string) => void;
  getPopularMotorcycles: (limit?: number) => string[];
  getTopViewedMotorcycles: (motorcycles: Motorcycle[], limit?: number) => Motorcycle[];
  getTotalViews: () => number;
  getMotorcycleViewCount: (motorcycleId: string) => number;
  resetAnalytics: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      viewRecords: [],
      popularMotorcycles: [],

      incrementViewCount: (motorcycleId) => {
        const { viewRecords } = get();
        const existingRecord = viewRecords.find(record => record.motorcycleId === motorcycleId);
        
        let updatedRecords;
        if (existingRecord) {
          updatedRecords = viewRecords.map(record =>
            record.motorcycleId === motorcycleId
              ? { 
                  ...record, 
                  viewCount: record.viewCount + 1,
                  lastViewed: new Date()
                }
              : record
          );
        } else {
          updatedRecords = [
            ...viewRecords,
            {
              motorcycleId,
              viewCount: 1,
              lastViewed: new Date()
            }
          ];
        }
        
        // Sort by view count to get popular motorcycles
        const sortedByViews = [...updatedRecords].sort((a, b) => b.viewCount - a.viewCount);
        const popularMotorcycles = sortedByViews.map(record => record.motorcycleId);
        
        set({ 
          viewRecords: updatedRecords,
          popularMotorcycles 
        });
      },

      getPopularMotorcycles: (limit = 6) => {
        const { popularMotorcycles } = get();
        return popularMotorcycles.slice(0, limit);
      },

      getTopViewedMotorcycles: (motorcycles, limit = 6) => {
        const { viewRecords } = get();
        const motorcyclesWithViews = motorcycles.map(motorcycle => ({
          motorcycle,
          viewCount: viewRecords.find(record => record.motorcycleId === motorcycle.id)?.viewCount || 0
        }));
        
        return motorcyclesWithViews
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, limit)
          .map(item => item.motorcycle);
      },

      getTotalViews: () => {
        const { viewRecords } = get();
        return viewRecords.reduce((total, record) => total + record.viewCount, 0);
      },

      getMotorcycleViewCount: (motorcycleId) => {
        const { viewRecords } = get();
        const record = viewRecords.find(r => r.motorcycleId === motorcycleId);
        return record?.viewCount || 0;
      },

      resetAnalytics: () => {
        set({ viewRecords: [], popularMotorcycles: [] });
      },
    }),
    {
      name: 'motorcycle-analytics',
    }
  )
);