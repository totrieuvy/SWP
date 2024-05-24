import HomePage from "./page/homePages/HomePage";
import DisplayGold from "./page/Gold/DisplayGold";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Policy from "./page/policy/Policy";
import Login from "./page/loginPage/Login";
import Register from "./page/registerStaffPage/RegisterStaff";

function App() {
  return (
    <Routes>
      <Route path="/Gold" element={<DisplayGold />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/Policy" element={<Policy />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

export default App;
