import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingBag, Sparkles } from "lucide-react";
import { useWishlistStore } from "../store/wishlistStore";
import { MotorcycleCard } from "../components/MotorcycleCard";

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    wishlistItems,
    clearWishlist,
    getWishlistCount,
    getWishlistTotalValue,
  } = useWishlistStore();
  const count = getWishlistCount();
  const totalValue = getWishlistTotalValue();

  const formattedTotalValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalValue);

  const handleRemoveAll = () => {
    if (
      window.confirm(
        "Are you sure you want to remove all items from your wishlist?",
      )
    ) {
      clearWishlist();
    }
  };

  return (
    <div className="wishlist-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-2">
                You have {count} {count === 1 ? "motorcycle" : "motorcycles"} in
                your wishlist
              </p>
            </div>

            <div className="flex gap-3">
              {count > 0 && (
                <>
                  <button
                    onClick={handleRemoveAll}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all flex items-center gap-2 hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove All
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2 hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {count > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-8 shadow-lg">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Value</p>
                <p className="text-3xl font-bold text-orange-600">
                  {formattedTotalValue}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Average Price
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(totalValue / count)}
                </p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Request Quotes for All
              </button>
            </div>
          </div>
        )}

        {count === 0 ? (
          <div className="empty-wishlist text-center py-20 bg-white rounded-xl shadow-lg">
            <Heart className="w-32 h-32 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-gray-700 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              Start adding motorcycles you love to your wishlist!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all text-lg font-semibold hover:scale-105"
            >
              Browse Motorcycles
            </button>
          </div>
        ) : (
          <div className="motorcycle-grid">
            {wishlistItems.map((motorcycle) => (
              <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
