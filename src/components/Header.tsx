import React from "react";
import type { SortOption } from "../types/sorting";
import { SortDropdownMenu } from "./SortDropdownMenu";
import { WishlistIcon } from "./WishlistIcon";

interface HeaderProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  searchTerm,
  sortOption,
  onSortChange,
}) => {
  return (
    <header className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white sticky top-0 z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between gap-4 h-full">
          {/* Logo Section */}
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

          {/* Search and Actions Section */}
          <div className="flex-1 flex items-center gap-3">
            <div className="relative flex-1 max-w-2xl">
              <input
                type="text"
                id="name-filter-input"
                placeholder="Search by name or manufacturer..."
                value={searchTerm}
                onChange={onSearchChange}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            <SortDropdownMenu onSort={onSortChange} currentSort={sortOption} />
            <WishlistIcon />
          </div>
        </div>
      </div>
    </header>
  );
};
