import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Clock, Trash2 } from "lucide-react";
import { useRecentlyViewedStore } from "../store/recentlyViewedStore";
import { type Motorcycle } from "../types/motorcycle";

export const RecentlyViewed: React.FC = () => {
  const navigate = useNavigate();
  const { recentlyViewed, clearRecentlyViewed, removeFromRecentlyViewed } =
    useRecentlyViewedStore();

  if (recentlyViewed.length === 0) {
    return null;
  }

  const handleMotorcycleClick = (motorcycle: Motorcycle) => {
    navigate(`/motorcycle/${motorcycle.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="recently-viewed-section">
      <div className="recently-viewed-header">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-900">Recently Viewed</h2>
        </div>
        {recentlyViewed.length > 0 && (
          <button
            onClick={clearRecentlyViewed}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="recently-viewed-grid">
        {recentlyViewed.map((motorcycle) => (
          <div
            key={motorcycle.id}
            className="recently-viewed-card group"
            onClick={() => handleMotorcycleClick(motorcycle)}
          >
            <div className="recently-viewed-image">
              <img src={motorcycle.image_url} alt={motorcycle.name} />
              <div className="recently-viewed-overlay">
                <Eye className="w-6 h-6 text-white" />
                <span>View Details</span>
              </div>
            </div>
            <div className="recently-viewed-content">
              <h3 className="recently-viewed-title">{motorcycle.name}</h3>
              <p className="recently-viewed-manufacturer">
                {motorcycle.manufacturer}
              </p>
              <p className="recently-viewed-price">
                {formatPrice(motorcycle.price)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromRecentlyViewed(motorcycle.id);
              }}
              className="recently-viewed-remove"
              aria-label="Remove from recently viewed"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
