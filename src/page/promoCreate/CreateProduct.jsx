import PromoCreateform from "./Component/PromoCreateform";
import React from "react";
import NavBar from "../defaultComponent/navBar";
import SideBar from "../defaultComponent/sideBar";
import "./Component/CSS/style.css";
function CreateProduct() {
  return (
    <>
      <NavBar />
      <section id="divider">
        <SideBar />
        <div id="promoContainer">
          <PromoCreateform />
        </div>
      </section>
    </>
  );
}

export default CreateProduct;
