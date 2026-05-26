import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  TrendingUp,
  Eye,
  Award,
  Clock,
  Calendar,
} from "lucide-react";
import { type Motorcycle } from "../types/motorcycle";
import { useAnalyticsStore } from "../store/analyticsStore";

interface AnalyticsDashboardProps {
  motorcycles: Motorcycle[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  motorcycles,
}) => {
  const navigate = useNavigate();
  const {
    viewRecords,
    getTopViewedMotorcycles,
    getTotalViews,
    getMotorcycleViewCount,
  } = useAnalyticsStore();

  const topViewed = getTopViewedMotorcycles(motorcycles, 5);
  const totalViews = getTotalViews();
  const uniqueViews = viewRecords.length;
  const averageViews =
    uniqueViews > 0 ? (totalViews / uniqueViews).toFixed(1) : 0;

  // Calculate views by category
  const viewsByCategory = motorcycles.reduce(
    (acc, motorcycle) => {
      const category = motorcycle.category;
      const views = getMotorcycleViewCount(motorcycle.id);
      acc[category] = (acc[category] || 0) + views;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topCategories = Object.entries(viewsByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <div className="flex items-center gap-2">
          <BarChart className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h2>
        </div>
        <p className="text-gray-600 mt-1">
          View performance and engagement metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue-100">
            <Eye className="w-6 h-6 text-blue-600" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Views</p>
            <p className="stat-value">{totalViews.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-green-100">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Unique Motorcycles Viewed</p>
            <p className="stat-value">{uniqueViews}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple-100">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Avg. Views per Motorcycle</p>
            <p className="stat-value">{averageViews}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-orange-100">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Motorcycles</p>
            <p className="stat-value">{motorcycles.length}</p>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      {topCategories.length > 0 && (
        <div className="top-categories">
          <h3 className="section-title">Top Categories by Views</h3>
          <div className="categories-list">
            {topCategories.map(([category, views], index) => (
              <div key={category} className="category-item">
                <div className="category-header">
                  <span className="category-name">{category}</span>
                  <span className="category-views">
                    {views.toLocaleString()} views
                  </span>
                </div>
                <div className="category-bar">
                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${(views / totalViews) * 100}%`,
                      background: `linear-gradient(90deg, #f97316, #ef4444)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top 5 Most Viewed */}
      {topViewed.length > 0 && (
        <div className="top-viewed">
          <h3 className="section-title">Top 5 Most Viewed Motorcycles</h3>
          <div className="top-viewed-list">
            {topViewed.map((motorcycle, index) => {
              const views = getMotorcycleViewCount(motorcycle.id);
              return (
                <div
                  key={motorcycle.id}
                  className="top-viewed-item"
                  onClick={() => navigate(`/motorcycle/${motorcycle.id}`)}
                >
                  <div className="top-viewed-rank">#{index + 1}</div>
                  <img src={motorcycle.image_url} alt={motorcycle.name} />
                  <div className="top-viewed-info">
                    <h4>{motorcycle.name}</h4>
                    <p>{motorcycle.manufacturer}</p>
                  </div>
                  <div className="top-viewed-stats">
                    <Eye className="w-4 h-4" />
                    <span>{views.toLocaleString()} views</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View Trends */}
      {viewRecords.length > 0 && (
        <div className="view-trends">
          <h3 className="section-title">View Distribution</h3>
          <div className="trend-stats">
            <div className="trend-stat">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>
                Most viewed has{" "}
                {Math.max(...viewRecords.map((r) => r.viewCount))} views
              </span>
            </div>
            <div className="trend-stat">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span>Average of {averageViews} views per motorcycle</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
