import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MotorcycleGrid } from "./components/MotorcycleGrid";
import { Footer } from "./components/Footer";
import { MotorcycleDetailPage } from "./pages/MotorcycleDetailPage";
import { useMotorcycleSearch } from "./hooks/useMotorcycleSearch";
import "./App.css";

function App() {
  const location = useLocation();
  const isDetailsPage = location.pathname.includes("/motorcycle/");

  const {
    filteredMotorcycles,
    loading,
    handleSearchChange,
    searchTerm,
    sortOption,
    handleSortChange,
    totalResults,
  } = useMotorcycleSearch();

  return (
    <div id="app" className="min-h-screen flex flex-col">
      <Header
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-6 flex justify-between items-center">
                  <div id="results-count" className="results-count">
                    <p className="text-gray-600">
                      Showing{" "}
                      <span
                        id="results-number"
                        className="font-bold text-orange-600"
                      >
                        {totalResults}
                      </span>{" "}
                      motorcycles
                    </p>
                  </div>

                  {sortOption && (
                    <div className="text-sm text-gray-500 hidden md:block">
                      Sorted by:{" "}
                      <span className="font-medium text-gray-700">
                        {sortOption.replace("-", " ").replace(/-/g, " ")}
                      </span>
                    </div>
                  )}
                </div>

                <MotorcycleGrid
                  motorcycles={filteredMotorcycles}
                  loading={loading}
                />
              </main>
            </>
          }
        />
        <Route path="/motorcycle/:id" element={<MotorcycleDetailPage />} />
      </Routes>

      {!isDetailsPage && <Footer />}
    </div>
  );
}

export default App;
