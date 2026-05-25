import React, { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, History } from "lucide-react";
import { type Motorcycle } from "../types/motorcycle";

interface SearchSuggestionsProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClick: (suggestion: string) => void;
  motorcycles: Motorcycle[];
  recentSearches: string[];
  onClearRecentSearches: () => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  searchTerm,
  onSearchChange,
  onSuggestionClick,
  motorcycles,
  recentSearches,
  onClearRecentSearches,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
  const handleKeyDown = (e: React.KeyboardEvent) => {
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
          onSuggestionClick(suggestions[selectedIndex]);
        } else if (searchTerm.trim()) {
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
    onSuggestionClick(suggestion);
    setShowSuggestions(false);
  };

  const showRecentSearches =
    recentSearches.length > 0 &&
    searchTerm.trim().length === 0 &&
    showSuggestions;

  return (
    <div
      ref={wrapperRef}
      className="search-suggestions-wrapper relative w-full"
    >
      <div className="relative">
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
            onClick={() => {
              onSearchChange({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>);
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showSuggestions && (suggestions.length > 0 || showRecentSearches) && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
          {showRecentSearches && (
            <div>
              <div className="px-4 py-2 bg-gray-900/50 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
                    <History className="w-3 h-3" />
                    Recent Searches
                  </div>
                  <button
                    onClick={onClearRecentSearches}
                    className="text-xs text-gray-500 hover:text-orange-400 transition-colors"
                  >
                    Clear All
                  </button>
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

          {/* Keyboard hint */}
          <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-700 text-xs text-gray-500 flex items-center justify-between">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>⎋ Close</span>
          </div>
        </div>
      )}
    </div>
  );
};
