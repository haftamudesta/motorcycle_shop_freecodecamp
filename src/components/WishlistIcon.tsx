import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../store/wishlistStore";

export const WishlistIcon: React.FC = () => {
  const navigate = useNavigate();
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());

  return (
    <button
      onClick={() => navigate("/wishlist")}
      className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors group"
      aria-label="Wishlist"
    >
      <Heart className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors" />
      {wishlistCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-lg animate-pulse">
          {wishlistCount > 99 ? "99+" : wishlistCount}
        </span>
      )}
    </button>
  );
};
