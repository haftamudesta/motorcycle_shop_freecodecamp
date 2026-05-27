import React, { useState } from "react";
import { DealershipMap } from "../components/DealershipMap";
import { type Motorcycle } from "../types/motorcycle";
import { Filter, X } from "lucide-react";

interface MapPageProps {
  motorcycles: Motorcycle[];
}

export const MapPage: React.FC<MapPageProps> = ({ motorcycles }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  const brands = ["All", ...new Set(motorcycles.map((m) => m.manufacturer))];

  return (
    <div className="map-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dealership Locator
          </h1>
          <p className="text-gray-600">
            Find authorized dealerships near you and explore our network
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-toggle"
          >
            <Filter className="w-4 h-4" />
            Filter by Brand
          </button>

          {showFilters && (
            <div className="filter-dropdown">
              {brands.map((brand) => (
                <button
                  key={brand}
                  className={`filter-option ${selectedBrand === brand ? "active" : ""}`}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setShowFilters(false);
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}

          {selectedBrand !== "All" && (
            <div className="selected-filter">
              <span>{selectedBrand}</span>
              <button onClick={() => setSelectedBrand("All")}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Map Component */}
        <DealershipMap
          motorcycles={motorcycles}
          selectedBrand={selectedBrand !== "All" ? selectedBrand : undefined}
        />
      </div>
    </div>
  );
};
