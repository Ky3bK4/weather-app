import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import City from "./pages/City/City";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":cityName" element={<City />} />
      </Routes>
    </div>
  );
}

export default App;
