import React from "react";
import { useNavigate } from "react-router-dom";
import { Flame, Eye, TrendingUp, Award } from "lucide-react";
import { type Motorcycle } from "../types/motorcycle";
import { useAnalyticsStore } from "../store/analyticsStore";

interface PopularMotorcyclesProps {
  motorcycles: Motorcycle[];
}

export const PopularMotorcycles: React.FC<PopularMotorcyclesProps> = ({
  motorcycles,
}) => {
  const navigate = useNavigate();
  const { getTopViewedMotorcycles, getMotorcycleViewCount, getTotalViews } =
    useAnalyticsStore();

  const popularBikes = getTopViewedMotorcycles(motorcycles, 6);
  const totalViews = getTotalViews();

  if (popularBikes.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Award className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <div className="popular-motorcycles-section">
      <div className="popular-header">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full">
            <Eye className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-600">
              {totalViews} total views
            </span>
          </div>
        </div>
        <p className="text-gray-600 mt-1">Based on user views and engagement</p>
      </div>

      <div className="popular-grid">
        {popularBikes.map((motorcycle, index) => {
          const viewCount = getMotorcycleViewCount(motorcycle.id);

          return (
            <div
              key={motorcycle.id}
              className="popular-card group"
              onClick={() => navigate(`/motorcycle/${motorcycle.id}`)}
            >
              <div className="popular-rank">
                {getRankIcon(index)}
                <span className="rank-number">#{index + 1}</span>
              </div>

              <div className="popular-image">
                <img src={motorcycle.image_url} alt={motorcycle.name} />
                <div className="popular-overlay">
                  <Eye className="w-6 h-6 text-white" />
                  <span>{viewCount} views</span>
                </div>
              </div>

              <div className="popular-content">
                <h3 className="popular-title">{motorcycle.name}</h3>
                <p className="popular-manufacturer">
                  {motorcycle.manufacturer}
                </p>
                <div className="popular-footer">
                  <span className="popular-price">
                    {formatPrice(motorcycle.price)}
                  </span>
                  <span className="popular-category">
                    {motorcycle.category}
                  </span>
                </div>
                <div className="popular-stats">
                  <div className="stat">
                    <Eye className="w-3 h-3" />
                    <span>{viewCount} views</span>
                  </div>
                  <div className="stat">
                    <span>{motorcycle.year}</span>
                  </div>
                  <div className="stat">
                    <span>{motorcycle.horsepower} HP</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
