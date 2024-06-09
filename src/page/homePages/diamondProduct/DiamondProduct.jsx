import React from "react";
import "./DiamondProduct.css";
function DiamondProduct() {
  return (
    <div className="DiamondProduct">
      <div className="DiamondProduct__advertise">
        <div className="DiamondProduct__advertise__image">
          <img src="./images/DiamondProduct.png" alt="Diamond" />
        </div>
        <h2 className="DiamondProduct__advertise__text">Trang sức Kim cương</h2>
        <div className="DiamondProduct__product"></div>
      </div>
    </div>
  );
}

export default DiamondProduct;
