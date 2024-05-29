import HomePage from "./page/homePages/HomePage";
import DisplayGold from "./page/Gold/DisplayGold";

import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/Gold" element={<DisplayGold />} />
      <Route path="/Home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
