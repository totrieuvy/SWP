import DisplayGold from "./page/Gold/DisplayGold";
import Home from "./page/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/Gold" element={<DisplayGold />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;
