import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { type Motorcycle } from "../types/motorcycle";
import { useWishlistStore } from "../store/wishlistStore";

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
}

export const MotorcycleCard: React.FC<MotorcycleCardProps> = ({
  motorcycle,
}) => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(motorcycle.id);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(motorcycle.price);

  const escapeHtml = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const handleViewDetails = () => {
    navigate(`/motorcycle/${motorcycle.id}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    toggleWishlist(motorcycle);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="motorcycle-card group relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all hover:scale-110 ${
          isAnimating ? "heart-animation" : ""
        }`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`w-5 h-5 transition-all duration-200 ${
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-600 hover:text-red-500"
          }`}
        />
      </button>

      <div
        className="motorcycle-card-image-container cursor-pointer"
        onClick={handleViewDetails}
      >
        <img
          src={motorcycle.image_url}
          alt={motorcycle.name}
          className="motorcycle-card-image"
        />
        <div className="motorcycle-card-year-badge">{motorcycle.year}</div>
      </div>
      <div className="motorcycle-card-content">
        <div className="motorcycle-card-header">
          <div>
            <h3 className="motorcycle-card-title">
              {escapeHtml(motorcycle.name)}
            </h3>
            <p className="motorcycle-card-manufacturer">
              {escapeHtml(motorcycle.manufacturer)}
            </p>
          </div>
          <span className="motorcycle-card-category">
            {motorcycle.category}
          </span>
        </div>
        <p className="motorcycle-card-description">
          {escapeHtml(motorcycle.description)}
        </p>
        <div className="motorcycle-card-footer">
          <div>
            <span className="motorcycle-card-price">{formattedPrice}</span>
            <div className="motorcycle-card-engine">
              {motorcycle.horsepower} HP
            </div>
          </div>
          <button
            className="motorcycle-card-button"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
