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
import Staff from "./page/staff/staff-page/Staff";
import Manager from "./page/manager/manager-page/Manager";
import Admin from "./page/admin/admin-page/Admin";
import AdminAccount from "./page/admin/admin-account/AdminAccount";
import Manager_StaffAccount from "./page/manager/manager-staffAccount/Manager_StaffAccount";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
import AdminAccountStaff from "./page/admin/admin-account-staff/AdminAccountStaff";
import { notification } from "antd";
import AdminAccountManager from "./page/admin/admin-account-manager/AdminAccountManager";
import ChangePasswordAdmin from "./page/admin/changepasswordadmin/ChangePasswordAdmin";
import ChangePasswordManager from "./page/manager/changepasswordmanager/ChangePasswordManager";
import ManagerProfile from "./page/manager/manager-profile/ManagerProfile";

const PrivateProute = ({ children }) => {
  const user = useSelector(selectUser);
  console.log(user);
  if (user == null && user?.role != "ROLE_ADMIN") {
    notification.error({
      message: "Truy cập thất bại",
      description: "Bạn không có quyền truy cập vào đây",
    });
    return <Navigate to="/login" />;
  } else if (user == null && user?.role != "ROLE_MANAGER") {
    notification.error({
      message: "Truy cập thất bại",
      description: "Bạn không có quyền truy cập vào đây",
    });
    return <Navigate to="/login" />;
  } else if (user == null && user?.role != "ROLE_STAFF") {
    notification.error({
      message: "Truy cập thất bại",
      description: "Bạn không có quyền truy cập vào đây",
    });
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
      <Route path="/admin/profile" element={<AdminAccount />} />
      <Route path="/admin/view/staff" element={<AdminAccountStaff />} />
      <Route path="/admin/view/manager" element={<AdminAccountManager />} />
      <Route path="/admin/changepassword" element={<ChangePasswordAdmin />} />

      <Route path="/manager/profile" element={<ManagerProfile />} />
      <Route path="/manager/view/staff" element={<Manager_StaffAccount />} />
      <Route path="/manager/changepassword" element={<ChangePasswordManager />} />

      <Route
        path="/admin"
        element={
          <PrivateProute>
            <Admin />
          </PrivateProute>
        }
      />
      <Route
        path="/manager"
        element={
          <PrivateProute>
            <Manager />
          </PrivateProute>
        }
      />
      <Route
        path="/staff"
        element={
          <PrivateProute>
            <Staff />
          </PrivateProute>
        }
      />
    </Routes>
  );
}

export default App;
