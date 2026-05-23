import React from "react";
import { type Motorcycle } from "../types/motorcycle";
import { MotorcycleCard } from "./MotorcycleCard";

interface MotorcycleGridProps {
  motorcycles: Motorcycle[];
  loading: boolean;
}

export const MotorcycleGrid: React.FC<MotorcycleGridProps> = ({
  motorcycles,
  loading,
}) => {
  if (loading) {
    return (
      <div id="loading-container" className="loading-container">
        <div className="loading-spinner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-24 h-24 text-orange-500 animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
        </div>
      </div>
    );
  }

  if (motorcycles.length === 0) {
    return (
      <div id="no-results" className="no-results">
        <p className="no-results-text">
          No motorcycles found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div id="motorcycle-grid" className="motorcycle-grid">
      {motorcycles.map((motorcycle) => (
        <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
      ))}
    </div>
  );
};
