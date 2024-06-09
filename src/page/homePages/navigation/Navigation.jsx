import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Trang chủ</Link>
      <Link to="/ring">Nhẫn</Link>
      <Link to="/necklace">Dây chuyền</Link>
      <Link to="/bracelet">Vòng tay</Link>
      <Link to="/anklet">Lắc chân</Link>
      <Link to="/earring">Bông tai</Link>
      <Link to="/gold">Vàng</Link>
      <Link to="/gemstone">Đá quý</Link>
    </nav>
  );
}

export default Navigation;
