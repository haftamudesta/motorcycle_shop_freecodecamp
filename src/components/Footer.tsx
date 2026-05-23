import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">
          © {currentYear} MotoGallery. Ride with passion, choose with
          confidence.
        </p>
      </div>
    </footer>
  );
};
