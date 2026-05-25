import React from "react";
import { useNavigate } from "react-router-dom";
import { SortDropdownMenu } from "./SortDropdownMenu";
import { type SortOption } from "../types/sorting";
import { Button } from "./ui/button";
import { Bike, Search, Heart } from "lucide-react";

interface HeaderProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  onSortChange: (option: SortOption) => void;
  currentSort: SortOption;
  wishlistCount?: number;
  onWishlistClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  searchTerm,
  onSortChange,
  currentSort,
  wishlistCount = 0,
  onWishlistClick,
}) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group"
            onClick={handleLogoClick}
          >
            <div className="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
              <Bike className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                MotoShop
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Find Your Perfect Ride
              </p>
            </div>
          </div>

          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search motorcycles by name..."
                value={searchTerm}
                onChange={onSearchChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onWishlistClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onWishlistClick}
                className="relative text-white hover:bg-gray-700"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            )}
            <SortDropdownMenu onSort={onSortChange} currentSort={currentSort} />
          </div>
        </div>
      </div>
    </header>
  );
};
