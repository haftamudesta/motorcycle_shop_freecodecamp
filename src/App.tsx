import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { MotorcycleDetailPage } from "./pages/MotorcycleDetailPage";
import { useMotorcycleSearch } from "./hooks/useMotorcycleSearch";
import "./App.css";

function App() {
  const { searchTerm, handleSearchChange } = useMotorcycleSearch();

  return (
    <Router>
      <div id="app">
        <Header onSearchChange={handleSearchChange} searchTerm={searchTerm} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/motorcycle/:id" element={<MotorcycleDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
