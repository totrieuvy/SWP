import React from "react";
import "./Header.css";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to={"/"}>
        <img src="./images/Logo.png" alt="Logo" className="header__logo" />
      </Link>
      <Link to={"/"}>
        <h2 className="header__title">JEWELRYMS</h2>
      </Link>
      <div className="header__account">
        <Button type="link" className="header__account-button">
          <UserOutlined className="header__account-icon" />
          <Link to="/login" className="header__account-text">
            Tài khoản
          </Link>
        </Button>
      </div>
    </header>
  );
}

export default Header;
