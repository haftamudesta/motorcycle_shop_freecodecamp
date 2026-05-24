import React from "react";
import { useNavigate } from "react-router-dom";
import { type Motorcycle } from "../types/motorcycle";

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
}

export const MotorcycleCard: React.FC<MotorcycleCardProps> = ({
  motorcycle,
}) => {
  const navigate = useNavigate();

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

  return (
    <div className="motorcycle-card">
      <div className="motorcycle-card-image-container">
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
