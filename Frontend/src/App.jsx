import React from "react";
import Homepage from "./components/Pages/Homepage.jsx";
import AddCard from "./components/Pages/AddCard.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
  <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="add" element={<AddCard/>} />

    
    </Routes>
    </BrowserRouter>
  );
};

export default App;
