import React from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MotorcycleGrid } from "./components/MotorcycleGrid";
import { Footer } from "./components/Footer";
import { useMotorcycleSearch } from "./hooks/useMotorcycleSearch";
import "./App.css";

function App() {
  const {
    filteredMotorcycles,
    loading,
    handleSearchChange,
    searchTerm,
    totalResults,
  } = useMotorcycleSearch();

  return (
    <div id="app">
      <Header onSearchChange={handleSearchChange} searchTerm={searchTerm} />
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

      <Footer />
    </div>
  );
}

export default App;
