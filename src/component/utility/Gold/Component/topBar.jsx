import React from "react";
import { Link } from "react-router-dom";
function TopBar(props) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = props.date.toLocaleDateString("en-GB", options);
  return (
    <nav id="topBar">
      <Link to="/HomePage" id="logoContainer">
        <img id="logo" src="https://i.ibb.co/rpCCWJH/image.png" />
        <p id="title">JewelryMS</p>
      </Link>
      <div id="dateNav"> {formattedDate}</div>
    </nav>
  );
}
export default TopBar;
