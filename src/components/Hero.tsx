import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold mb-4">Find Your Perfect Ride</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Explore our curated collection of premium motorcycles from the world's
          leading manufacturers
        </p>
      </div>
    </section>
  );
};
