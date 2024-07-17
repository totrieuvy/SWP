import api from "../../../config/axios";
import React, { useState } from "react";

function ProductBuyManager() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    document.title = "Sản phẩm mua";
  }, []);

  const fetchData = async () => {
    const response = await api.get("/api/productBuy");
    console.log(response.data);
  };
  return <div>ProductBuyManager</div>;
}

export default ProductBuyManager;
