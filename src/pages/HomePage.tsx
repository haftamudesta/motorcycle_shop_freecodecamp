import React from "react";
import { Hero } from "../components/Hero";
import { MotorcycleGrid } from "../components/MotorcycleGrid";
import { useMotorcycleSearch } from "../hooks/useMotorcycleSearch";

export const HomePage: React.FC = () => {
  const { filteredMotorcycles, loading, totalResults } = useMotorcycleSearch();

  return (
    <>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div id="results-count" className="results-count">
          <p className="results-count-text">
            Showing{" "}
            <span id="results-number" className="results-count-number">
              {totalResults}
            </span>{" "}
            motorcycles
          </p>
        </div>

        <MotorcycleGrid motorcycles={filteredMotorcycles} loading={loading} />
      </main>
    </>
  );
};
