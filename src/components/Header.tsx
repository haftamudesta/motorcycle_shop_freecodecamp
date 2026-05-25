import React, { useState, useEffect, useRef } from "react";
import type { SortOption } from "../types/sorting";
import { SortDropdownMenu } from "./SortDropdownMenu";
import { WishlistIcon } from "./WishlistIcon";
import { Search, X, TrendingUp, History } from "lucide-react";
import type { Motorcycle } from "../types/motorcycle";

interface HeaderProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  motorcycles?: Motorcycle[];
  recentSearches?: string[];
  onClearRecentSearches?: () => void;
  onSuggestionClick?: (suggestion: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  searchTerm,
  sortOption,
  onSortChange,
  motorcycles = [],
  recentSearches = [],
  onClearRecentSearches,
  onSuggestionClick,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const matchedSuggestions = new Set<string>();

    motorcycles.forEach((motorcycle) => {
      if (motorcycle.name.toLowerCase().includes(searchLower)) {
        matchedSuggestions.add(motorcycle.name);
      }
      if (motorcycle.manufacturer.toLowerCase().includes(searchLower)) {
        matchedSuggestions.add(motorcycle.manufacturer);
      }
    });

    const categories = [
      "Sport",
      "Cruiser",
      "Touring",
      "Dirt",
      "Adventure",
      "Naked",
      "Electric",
    ];
    categories.forEach((category) => {
      if (category.toLowerCase().includes(searchLower)) {
        matchedSuggestions.add(category);
      }
    });

    setSuggestions(Array.from(matchedSuggestions).slice(0, 8));
    setSelectedIndex(-1);
  }, [searchTerm, motorcycles]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions && suggestions.length > 0) {
      setShowSuggestions(true);
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (searchTerm.trim() && onSuggestionClick) {
          onSuggestionClick(searchTerm);
        }
        setShowSuggestions(false);
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onSearchChange(event);
    setShowSuggestions(false);
  };

  const showRecentSearches =
    recentSearches.length > 0 &&
    searchTerm.trim().length === 0 &&
    showSuggestions;

  return (
    <header className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white sticky top-0 z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between gap-4 h-full">
          <div className="flex items-center gap-3 flex-shrink-0">
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
              className="w-8 h-8 text-orange-500"
            >
              <circle cx="18.5" cy="17.5" r="3.5" />
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="15" cy="5" r="1" />
              <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
            </svg>
            <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-red-500">
              MotoShop
            </h1>
          </div>

          <div className="flex-1 flex items-center gap-3">
            <div ref={wrapperRef} className="relative flex-1 max-w-2xl">
              <input
                type="text"
                id="name-filter-input"
                placeholder="Search by name, manufacturer, or category..."
                value={searchTerm}
                onChange={onSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                className="w-full px-4 py-2 pl-10 pr-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {showSuggestions &&
                (suggestions.length > 0 || showRecentSearches) && (
                  <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                    {showRecentSearches && (
                      <div>
                        <div className="px-4 py-2 bg-gray-900/50 border-b border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
                              <History className="w-3 h-3" />
                              Recent Searches
                            </div>
                            {onClearRecentSearches && (
                              <button
                                onClick={onClearRecentSearches}
                                className="text-xs text-gray-500 hover:text-orange-400 transition-colors"
                              >
                                Clear All
                              </button>
                            )}
                          </div>
                        </div>
                        {recentSearches.map((search, index) => (
                          <button
                            key={`recent-${index}`}
                            onClick={() => handleSuggestionClick(search)}
                            className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2"
                          >
                            <History className="w-3 h-3 text-gray-500" />
                            <span>{search}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {suggestions.length > 0 && (
                      <div>
                        {showRecentSearches && (
                          <div className="px-4 py-2 bg-gray-900/50 border-b border-gray-700">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
                              <TrendingUp className="w-3 h-3" />
                              Suggestions
                            </div>
                          </div>
                        )}
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={`suggestion-${index}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                              selectedIndex === index ? "bg-gray-700" : ""
                            }`}
                          >
                            <Search className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-300">{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchTerm.trim().length > 0 &&
                      suggestions.length === 0 &&
                      !showRecentSearches && (
                        <div className="px-4 py-4 text-center text-gray-400 text-sm">
                          No results found for "{searchTerm}"
                        </div>
                      )}

                    {(suggestions.length > 0 || showRecentSearches) && (
                      <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-700 text-xs text-gray-500 flex items-center justify-between">
                        <span>↑↓ Navigate</span>
                        <span>↵ Select</span>
                        <span>⎋ Close</span>
                      </div>
                    )}
                  </div>
                )}
            </div>

            <SortDropdownMenu onSort={onSortChange} currentSort={sortOption} />
            <WishlistIcon />
          </div>
        </div>
      </div>
    </header>
  );
};
