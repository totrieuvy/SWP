import React from "react";
import DisplayGold from "./page/Gold/DisplayGold";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Policy from "./page/policy/Policy";
import Login from "./page/loginPage/Login";
import Register from "./page/registerStaffPage/RegisterStaff";
import ResetPassword from "./page/resetPasswordPage/ResetPassword";
import ChangePassword from "./page/changePassword/ChangePassword";
import Home from "./page/homePages/home/Home";

import Staff from "./page/staff/staff-page/Staff";
import Manager_StaffAccount from "./page/manager/manager-staffAccount/Manager_StaffAccount";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
import { notification } from "antd";
import AdminAccountManager from "./page/admin/admin-account-manager/AdminAccountManager";
import ChangePasswordAdmin from "./page/admin/changepasswordadmin/ChangePasswordAdmin";
import ManagerProfile from "./page/manager/manager-profile/ManagerProfile";
import ProductList from "./page/productList/ProductList";
import CreateProduct from "./page/promoCreate/CreateProduct";
import ListCustomer from "./page/Customer/listCustomer/ListCustomer";
import UpdateCustomer from "./page/Customer/updateCustomer/UpdateCustomer";
import QR from "./page/QRCodeScan/QR";
import Dashboard from "./page/dashboard/Dashboard";
import AdminProfile from "./page/admin/admin-profile/AdminProfile";
import AdminProduct from "./page/admin/admin-product/AdminProduct";
import AdminCategory from "./page/admin/category/AdminCategory";
import ManagerCategory from "./page/manager/category/ManagerCategory";
import ManagerChangePassword from "./page/manager/changepassword/ManagerChangePassword";
import StaffProfile from "./page/staff/staff-profile/StaffProfile";
import StaffCategory from "./page/staff/staff-category/StaffCategory";
import StaffProduct from "./page/staff/staff-product/StaffProduct";
import StaffChangePassword from "./page/staff/staff-changepassword/StaffChangePassword";
import MainCreateOrder from "./page/saleCreateOrder/MainCreateOrder";
import DisplayOrder from "./page/Cashier/DisplayOrder";
import VNPay from "./page/VNPAY/VNPay";
import OrderSuccess from "./page/defaultComponent/OrderSuccess";
import OrderFail from "./page/defaultComponent/OrderFail";
import ProductBuy from "./page/staff/staff-productbuy/ProductBuy";
import ManagerProduct from "./page/manager/product/ManagerProduct";
import ListStaffWithSchedule from "./page/manager/schedule/assign-staff/ListStaffWithSchedule";
import AssignStaffForm from "./page/manager/schedule/assign-staff-form/AssignStaffForm";
import AdminAccountStaff from "./page/admin/admin-account-staff/AdminAccountStaff";
import Promotion from "./page/manager/promotion/Promotion";
import ViewSchedule from "./page/manager/schedule/schedule_of_all_staff/ViewSchedule";
import TopProductSell from "./page/manager/top_productSell/TopProductSell";
import Analytic from "./page/admin/admin-analytic/Analytic";
import AssignMany from "./page/manager/schedule/assign-staff-many/AssignMany";
import ConfirmProductBuy from "./page/staff/staff-productbuy/ConfirmProductBuy";
import TopProductSells from "./page/admin/topproductsell/TopProductSells";
import TransactionTotal from "./page/manager/transaction/transaction-total/TransactionTotal";
import Transaction_ProductSell from "./page/manager/transaction/transaction-detail-psell/Transaction_ProductSell";
import Transaction_ProductBuy from "./page/manager/transaction/transaction-detail-pbuy/Transaction_ProductBuy";
import StaffPerformance from "./page/manager/staff-performance/StaffPerformance";

import SaleComparision from "./page/manager/sales_comparision/SaleComparision";

const PrivateProute = ({ role }) => {
  console.log(role);
  const user = useSelector(selectUser);
  console.log(user);
  if (role === user.role) {
    return <Outlet />;
  } else {
    notification.error({
      message: "Truy cập thất bại",
      description: "Bạn không có quyền truy cập vào đây",
    });
    return <Navigate to="/login" />;
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
      <Route path="/customer/view" element={<ListCustomer />} />
      <Route path="/customer/update" element={<UpdateCustomer />} />
      <Route path="/test/QR" element={<QR />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/product/list" element={<ProductList />} />
      <Route path="/promo/create" element={<CreateProduct />} />
      <Route path="/vnpay" element={<VNPay />} />

      <Route path="manager" element={<PrivateProute role="ROLE_MANAGER" />}>
        <Route path="" element={<Dashboard />}>
          <Route path="profile/:id" element={<ManagerProfile />} />
          <Route path="staff" element={<Manager_StaffAccount />} />
          <Route path="category" element={<ManagerCategory />} />
          <Route path="customer/view" element={<ListCustomer />} />
          <Route path="customer/update" element={<UpdateCustomer />} />
          <Route path="changepassword" element={<ManagerChangePassword />} />
          <Route path="product" element={<ManagerProduct />} />
          <Route path="staff" element={<Manager_StaffAccount />} />
          <Route path="staff/assign" element={<ListStaffWithSchedule />} />
          <Route path="staff/assign-to" element={<AssignStaffForm />} />
          <Route path="staff/assign-to-many" element={<AssignMany />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="staff/performance" element={<StaffPerformance />} />

          <Route path="staff/view" element={<ViewSchedule />} />
          <Route path="topproductsell" element={<TopProductSell />} />
          <Route path="transaction/total" element={<TransactionTotal />} />
          {/* <Route path="transaction/detail/:orderID/:orderType" element={<TransactionDetail />} /> */}
          salecomparision
          <Route path="salecomparision" element={<SaleComparision />} />
          <Route path="transaction/detail/:orderID/OUTGOING" element={<Transaction_ProductBuy />} />
          <Route path="transaction/detail/:orderID/INGOING" element={<Transaction_ProductSell />} />
        </Route>
      </Route>
      <Route path="admin" element={<PrivateProute role="ROLE_ADMIN" />}>
        <Route path="" element={<Dashboard />}>
          <Route path="profile/:id" element={<AdminProfile />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="category" element={<AdminCategory />} />
          <Route path="changepassword" element={<ChangePasswordAdmin />} />
          <Route path="manager" element={<AdminAccountManager />} />
          <Route path="staff" element={<AdminAccountStaff />} />
          <Route path="analytic" element={<Analytic />} />

          <Route path="topproductsell" element={<TopProductSells />} />
        </Route>
      </Route>
      <Route path="staff" element={<PrivateProute role={"ROLE_STAFF"} />}>
        <Route path="" element={<Dashboard />}>
          <Route path="profile/:id" element={<StaffProfile />} />
          <Route path="ordersuccess" element={<OrderSuccess />} />
          <Route path="orderfail" element={<OrderFail />} />
          <Route path="category" element={<StaffCategory />} />
          <Route path="create" element={<MainCreateOrder />} />
          <Route path="confirm-order" element={<DisplayOrder />} />
          <Route path="initialize-productbuy" element={<ProductBuy />} />
          <Route path="confirm-productbuy" element={<ConfirmProductBuy />} />

          <Route path="product" element={<StaffProduct />} />
          <Route path="changepassword" element={<StaffChangePassword />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
