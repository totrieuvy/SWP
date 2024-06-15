import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Card } from "react-bootstrap";
import { Button, Modal } from "antd";
import api from "../../../config/axios";

import "./ShowProduct.css";

function ShowProduct({ numberOfSlides = 5 }) {
  const [diamondProducts, setDiamondProducts] = useState([]);
  const [visibleNecklace, setVisibleNecklace] = useState(false);
  const [visibleBracelet, setVisibleBracelet] = useState(false);
  const [visibleAnklet, setVisibleAnklet] = useState(false);
  const [visibleEarring, setVisibleEarring] = useState(false);
  const [visibleRingPage, setVisibleRingPage] = useState(false);
  const [visibleGoldPage, setVisibleGoldPage] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchNecklace = async () => {
    try {
      const response = await api.get("/api/productSell");
      setDiamondProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const filterByCategory = (category) => diamondProducts.filter((data) => data.category_name === category);

  useEffect(() => {
    fetchNecklace();
  }, []);

  const handleOpenModal = (product, setVisible) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleCloseModal = (setVisible) => {
    setVisible(false);
    setSelectedProduct(null);
  };

  const categories = [
    {
      name: "Necklace",
      filter: filterByCategory("Necklace"),
      visible: visibleNecklace,
      setVisible: setVisibleNecklace,
    },
    {
      name: "Bracelet",
      filter: filterByCategory("Bracelet"),
      visible: visibleBracelet,
      setVisible: setVisibleBracelet,
    },
    { name: "Anklet", filter: filterByCategory("Anklet"), visible: visibleAnklet, setVisible: setVisibleAnklet },
    { name: "Earring", filter: filterByCategory("Earring"), visible: visibleEarring, setVisible: setVisibleEarring },
    { name: "Ring", filter: filterByCategory("Ring"), visible: visibleRingPage, setVisible: setVisibleRingPage },
    { name: "Gold", filter: filterByCategory("Gold"), visible: visibleGoldPage, setVisible: setVisibleGoldPage },
  ];

  return (
    <div className="DiamondProduct container">
      <div className="DiamondProduct__advertise">
        <div className="DiamondProduct__product">
          <Swiper
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            slidesPerView={numberOfSlides}
            className="mySwiper"
          >
            {categories.map((category) =>
              category.filter.map((product) => (
                <SwiperSlide key={product.productID}>
                  <Card style={{ width: "20rem", height: "28.4rem" }} className="DiamondProduct__card">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      className="DiamondProduct__card__image"
                      alt={category.name}
                    />
                    <Card.Body className="card__body">
                      <Card.Title className="card__name">{product.name}</Card.Title>
                      <Card.Title className="card__carat">{`Carat: ${product.carat}`}</Card.Title>
                      <Card.Title className="card__chi">{`Chỉ: ${product.chi}`}</Card.Title>
                      <Card.Title className="card__cost">{`Giá: ${product.cost}`}</Card.Title>
                      <Button type="primary" ghost onClick={() => handleOpenModal(product, category.setVisible)}>
                        Detail
                      </Button>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              ))
            )}
          </Swiper>
          {categories.map((category) => (
            <Modal
              key={category.name}
              open={category.visible}
              onCancel={() => handleCloseModal(category.setVisible)}
              footer={null}
              className="diamond-modal"
            >
              {selectedProduct && (
                <div className="diamond-modal-content">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="diamond-modal-image" />
                  <h2 className="diamond-modal-title">{selectedProduct.name}</h2>
                  <p className="diamond-modal-detail">{`Carat: ${selectedProduct.carat}`}</p>
                  <p className="diamond-modal-detail">{`Mô tả: ${selectedProduct.description}`}</p>
                  <p className="diamond-modal-detail">{`Chỉ: ${selectedProduct.chi}`}</p>
                  <p className="diamond-modal-detail">{`Giá: ${selectedProduct.cost}`}</p>
                </div>
              )}
            </Modal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowProduct;
