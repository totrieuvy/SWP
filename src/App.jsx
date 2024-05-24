import React from "react";
import HomePage from "./page/homePages/HomePage";
import DisplayGold from "./page/Gold/DisplayGold";
import { Route, Routes } from "react-router-dom";
import Policy from "./page/policy/Policy";
import Login from "./page/loginPage/Login";
import Register from "./page/registerStaffPage/RegisterStaff";
import ResetPassword from "./page/resetPasswordPage/ResetPassword";
import ChangePassword from "./page/changePassword/ChangePassword";

function App() {
  return (
    <Routes>
      <Route path="/Gold" element={<DisplayGold />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/Policy" element={<Policy />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
