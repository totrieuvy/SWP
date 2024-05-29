import React, { useEffect } from "react";
import "./GemstonePage.css";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";

function GemstonePage() {
  useEffect(() => {
    document.title = "Sản phẩm đá quý";
  }, []);
  return (
    <div className="GemstonePage">
      <Header />
      <Navigation />
    </div>
  );
}

export default GemstonePage;
