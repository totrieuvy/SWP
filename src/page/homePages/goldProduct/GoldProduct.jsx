import React from "react";
import "./GoldProduct.css";

function GoldProduct() {
  return (
    <div className="GoldProduct">
      <div className="GoldProduct__advertise">
        <div className="GoldProduct__advertise__image">
          <img src="./images/Gold.jpg" alt="Gold" />
        </div>
        <h2 className="GoldProduct__advertise__text">Trang sức Vàng</h2>
      </div>
    </div>
  );
}

export default GoldProduct;
