import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MotorcycleGrid } from "./components/MotorcycleGrid";
import { Footer } from "./components/Footer";
import { MotorcycleDetailPage } from "./pages/MotorcycleDetailPage";
import { WishlistPage } from "./pages/WishlistPage";
import { RecentlyViewed } from "./components/RecentlyViewed";
import { PopularMotorcycles } from "./components/PopularMotorcycles";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { useMotorcycleSearch } from "./hooks/useMotorcycleSearch";
import { useSearchHistoryStore } from "./store/searchHistoryStore";
import { MapPage } from "./pages/MapPage";
import "./App.css";

function App() {
  const location = useLocation();
  const isDetailsPage = location.pathname.includes("/motorcycle/");
  const isWishlistPage = location.pathname === "/wishlist";
  const isAnalyticsPage = location.pathname === "/analytics";

  const {
    filteredMotorcycles,
    loading,
    handleSearchChange,
    searchTerm,
    sortOption,
    handleSortChange,
    totalResults,
    motorcycles,
  } = useMotorcycleSearch();

  const { recentSearches, addSearch, clearRecentSearches } =
    useSearchHistoryStore();

  // Don't show search/sort on wishlist page, details page, or analytics page
  const showSearchAndSort =
    !isWishlistPage && !isDetailsPage && !isAnalyticsPage;
  const showHero = !isDetailsPage && !isAnalyticsPage;

  const handleSuggestionClick = (suggestion: string) => {
    // Create a synthetic event to update the search term
    const event = {
      target: { value: suggestion },
    } as React.ChangeEvent<HTMLInputElement>;
    handleSearchChange(event);
    addSearch(suggestion);
  };

  const handleSearchChangeWithHistory = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleSearchChange(e);
  };

  return (
    <div id="app" className="min-h-screen flex flex-col">
      <Header
        onSearchChange={handleSearchChangeWithHistory}
        searchTerm={searchTerm}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        motorcycles={motorcycles}
        recentSearches={recentSearches}
        onClearRecentSearches={clearRecentSearches}
        onSuggestionClick={handleSuggestionClick}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {showHero && <Hero />}
              <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {showSearchAndSort && (
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
                )}

                <PopularMotorcycles motorcycles={motorcycles} />

                <RecentlyViewed />

                <MotorcycleGrid
                  motorcycles={filteredMotorcycles}
                  loading={loading}
                />
              </main>
            </>
          }
        />
        <Route path="/motorcycle/:id" element={<MotorcycleDetailPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route
          path="/analytics"
          element={
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <AnalyticsDashboard motorcycles={motorcycles} />
            </main>
          }
        />
        <Route
          path="/map"
          element={
            <main className="flex-1">
              <MapPage motorcycles={motorcycles} />
            </main>
          }
        />
      </Routes>

      {!isDetailsPage && !isWishlistPage && !isAnalyticsPage && <Footer />}
    </div>
  );
}

export default App;
