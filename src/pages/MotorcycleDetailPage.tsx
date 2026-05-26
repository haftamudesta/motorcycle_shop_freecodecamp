import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";
import type { Motorcycle } from "../types/motorcycle";
import { fetchMotorcycleById } from "../services/motorcycleService";
import { useWishlistStore } from "../store/wishlistStore";
import { useRecentlyViewedStore } from "../store/recentlyViewedStore";
import { useAnalyticsStore } from "../store/analyticsStore";

export const MotorcycleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addToRecentlyViewed } = useRecentlyViewedStore();
  const isWishlisted = isInWishlist(id || "");
  const { incrementViewCount } = useAnalyticsStore();

  useEffect(() => {
    const loadMotorcycle = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchMotorcycleById(id);
        if (data) {
          setMotorcycle(data);
          // Add to recently viewed when motorcycle is loaded
          addToRecentlyViewed(data);
          // Track view for analytics
          incrementViewCount(data.id);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Failed to fetch motorcycle:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadMotorcycle();
  }, [id, addToRecentlyViewed]);

  const formattedPrice = motorcycle
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(motorcycle.price)
    : "";

  const handleWishlistToggle = () => {
    if (motorcycle) {
      toggleWishlist(motorcycle);
    }
  };

  const handleShare = async () => {
    if (motorcycle) {
      const shareData = {
        title: motorcycle.name,
        text: `Check out ${motorcycle.name} by ${motorcycle.manufacturer}`,
        url: window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          console.log("Error sharing:", error);
        }
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: "400px" }}>
        <div className="loading-spinner">
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
            className="w-24 h-24 text-orange-500 animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error || !motorcycle) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="no-results">
          <p className="no-results-text">Motorcycle not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate("/")}
        className="mb-12 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
      >
        ← Back to all motorcycles
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative h-96 md:h-full">
              <img
                src={motorcycle.image_url}
                alt={motorcycle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-bold">
                {motorcycle.year}
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold mb-3">
                {motorcycle.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {motorcycle.name}
              </h1>
              <p className="text-xl text-gray-600">{motorcycle.manufacturer}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-orange-600 mb-2">
                {formattedPrice}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>{motorcycle.horsepower} Horsepower</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {motorcycle.description}
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Specifications
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Manufacturer</span>
                  <span className="font-semibold text-gray-900">
                    {motorcycle.manufacturer}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold text-gray-900">
                    {motorcycle.category}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Year</span>
                  <span className="font-semibold text-gray-900">
                    {motorcycle.year}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Horsepower</span>
                  <span className="font-semibold text-gray-900">
                    {motorcycle.horsepower} HP
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleWishlistToggle}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`}
                />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>

              <button
                onClick={handleShare}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            <button
              className="mt-3 w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              onClick={() => alert(`Inquiry sent for ${motorcycle.name}`)}
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
