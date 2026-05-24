import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  searchTerm,
}) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
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
              className="w-8 h-8 text-orange-500"
            >
              <circle cx="18.5" cy="17.5" r="3.5" />
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="15" cy="5" r="1" />
              <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
            </svg>
            <h1 className="text-3xl font-bold">MotoShop</h1>
          </div>
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                id="name-filter-input"
                placeholder="Search motorcycles by name..."
                value={searchTerm}
                onChange={onSearchChange}
                className="w-full md:w-96 px-4 py-2 pl-10 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
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
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
