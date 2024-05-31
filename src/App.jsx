import React from "react";
import DisplayGold from "./page/Gold/DisplayGold";
import { Navigate, Route, Routes } from "react-router-dom";
import Policy from "./page/policy/Policy";
import Login from "./page/loginPage/Login";
import Register from "./page/registerStaffPage/RegisterStaff";
import ResetPassword from "./page/resetPasswordPage/ResetPassword";
import ChangePassword from "./page/changePassword/ChangePassword";
import Home from "./page/homePages/home/Home";
import Promotion from "./page/homePages/promotion/Promotion";
import RingPage from "./page/homePages/ringPage/RingPage";
import Necklace from "./page/homePages/necklace/Necklace";
import Bracelet from "./page/homePages/bracelet/Bracelet";
import Anklet from "./page/homePages/anklet/Anklet";
import Earring from "./page/homePages/earring/Earring";
import GoldPage from "./page/homePages/goldPage/GoldPage";
import GemstonePage from "./page/homePages/gemstonePage/GemstonePage";
import Staff from "./page/staff/Staff";
import Manager from "./page/manager/manager-page/Manager";
import Admin from "./page/admin/admin-page/Admin";
import AdminAccount from "./page/admin/admin-account/AdminAccount";
import Manager_StaffAccount from "./page/manager/manager-staffAccount/Manager_StaffAccount";
import Manager_ViewProduct from "./page/manager/manager-viewProduct/Manager-ViewProduct";
import SidebarManager from "./page/manager/sidebarManager/SidebarManager";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
import ProductList from "./page/productList/ProductList";
import CreateProduct from "./page/promoCreate/CreateProduct";

const PrivateProute = ({ children }) => {
  const user = useSelector(selectUser);
  console.log(user);
  if (user == null && user?.role != "ROLE_ADMIN") {
    alert("m ko co quyen vao day");
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/displaygold" element={<DisplayGold />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="/promotion" element={<Promotion />} />
      <Route path="/ring" element={<RingPage />} />
      <Route path="/necklace" element={<Necklace />} />
      <Route path="/bracelet" element={<Bracelet />} />
      <Route path="/anklet" element={<Anklet />} />
      <Route path="/earring" element={<Earring />} />
      <Route path="/gold" element={<GoldPage />} />
      <Route path="/gemstone" element={<GemstonePage />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/product/list" element={<ProductList />} />
      <Route path="/promo/create" element={<CreateProduct />} />
      <Route
        path="/admin"
        element={
          <PrivateProute>
            <Admin />
          </PrivateProute>
        }
      />
      <Route path="/manager" element={<Manager />} />
      <Route path="/adminprofile" element={<AdminAccount />} />
      <Route path="/managerprofile" element={<AdminAccount />} />
      <Route path="/manager-staffaccount" element={<Manager_StaffAccount />} />
      <Route path="/manager-viewProduct" element={<Manager_ViewProduct />} />
      <Route path="/sidebarmanager" element={<SidebarManager />} />
    </Routes>
  );
}

export default App;
