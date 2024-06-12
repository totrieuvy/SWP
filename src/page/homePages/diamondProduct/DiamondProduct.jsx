import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Card } from "react-bootstrap";
import { Button } from "antd";
import api from "../../../config/axios";

import "./DiamondProduct.css";

function DiamondProduct({ numberOfSlides = 5 }) {
  const [diamondProducts, setDiamondProducts] = useState([]);

  const fetchNecklace = async () => {
    try {
      const response = await api.get("/api/productSell/readall");
      console.log(response.data);
      setDiamondProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const filterNecklace = diamondProducts.filter((data) => data.category_name === "Necklace");
  console.log(filterNecklace);

  useEffect(() => {
    fetchNecklace();
  }, []);

  const handleDetailClick = (product) => {
    console.log("Product details:", product);
    // You can add more logic here, such as navigating to a product detail page.
  };

  return (
    <div className="DiamondProduct container">
      <div className="DiamondProduct__advertise">
        <div className="DiamondProduct__advertise__image">
          <img src="./images/DiamondProduct.png" alt="Diamond" />
        </div>
        <h2 className="DiamondProduct__advertise__text">Dây chuyền</h2>
        <div className="DiamondProduct__product">
          <Swiper navigation={true} modules={[Navigation]} slidesPerView={numberOfSlides} className="mySwiper">
            {filterNecklace.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="DiamondProduct__card">
                  <Card.Img
                    variant="top"
                    src={diamondProduct.image}
                    className="DiamondProduct__card__image"
                    alt="Diamond"
                  />
                  <Card.Body className="card__body">
                    <Card.Title className="card__name">{diamondProduct.name}</Card.Title>
                    <Card.Title className="card__carat">{`Carat: ${diamondProduct.carat}`}</Card.Title>
                    <Card.Title className="card__chi">{`Chỉ: ${diamondProduct.chi}`}</Card.Title>
                    <Card.Title className="card__cost">{`Giá: ${diamondProduct.cost}`}</Card.Title>
                    <Button type="primary" ghost onClick={() => handleDetailClick(diamondProduct)}>
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default DiamondProduct;
