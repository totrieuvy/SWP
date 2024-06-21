import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import ProductCard from "./ProductCard";

function SaleProductMenu({ category, setOrder }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [orderRequest, setOrderRequest] = useState({
    paymentType: "credit_card",
    totalAmount: 100,
    purchaseDate: new Date().toISOString(),
    status: 1,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/productSell`);
        const fetchedData = response.data;
        setData(fetchedData);

        const filteringData = category
          ? fetchedData.filter((product) => product.category_id === category.id)
          : fetchedData;

        setFilteredData(filteringData);
      } catch (error) {
        console.error("Error fetching the order", error);
      }
    };

    fetchData();
    console.log(data);
  }, [category]);

  useEffect(() => {
    const filteringData = category
      ? data.filter((product) => product.category_id === category.id)
      : data;
    setFilteredData(filteringData);
  }, [category, data]);
  const handleAddToOrder = (product) => {
    setOrder(product);
  };

  return (
    <div className="SaleProductMenu">
      {filteredData.map((filteredData) => (
        <ProductCard
          key={filteredData.productID}
          productID={filteredData.productID}
          carat={filteredData.carat}
          chi={filteredData.chi}
          cost={filteredData.cost}
          pname={filteredData.pname}
          productCode={filteredData.productCode}
          onAddToOrder={handleAddToOrder}
          image={
            filteredData.image
              ? filteredData.image
              : "https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k"
          } // provide default image URL
        />
      ))}
    </div>
  );
}

export default SaleProductMenu;
