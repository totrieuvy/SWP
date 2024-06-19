import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Card } from "react-bootstrap";
import { Button, Modal } from "antd";
import api from "../../../config/axios";

import "./GoldPage.css";

function GoldPage({ numberOfSlides = 5 }) {
  const [diamondProducts, setDiamondProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedGoldPage, setSelectedGoldPage] = useState(null);

  const fetchGoldPage = async () => {
    try {
      const response = await api.get("/api/productSell");
      console.log(response.data);
      setDiamondProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const filterGoldPage = diamondProducts.filter((data) => data.category_name === "Gold");
  console.log(filterGoldPage);

  useEffect(() => {
    fetchGoldPage();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedGoldPage(product);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSelectedGoldPage(null);
  };

  return (
    <div className="GoldPage container">
      <div className="GoldPage__advertise">
        <h2 className="GoldPage__advertise__text">Vàng</h2>
        <div className="GoldPage__product">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            slidesPerView={numberOfSlides}
            className="mySwiper"
          >
            {filterGoldPage.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="GoldPage__card">
                  <Card.Img
                    variant="top"
                    src={diamondProduct.image}
                    className="GoldPage__card__image"
                    alt={diamondProduct.pname}
                  />
                  <Card.Body className="card__body">
                    <Card.Title className="card__name">{diamondProduct.pname}</Card.Title>
                    <Card.Title className="card__carat">{`Carat: ${diamondProduct.carat}`}</Card.Title>
                    <Card.Title className="card__chi">{`Chỉ: ${diamondProduct.chi}`}</Card.Title>
                    <Card.Title className="card__cost">{`Giá: ${diamondProduct.cost}`}</Card.Title>
                    <Button type="primary" ghost onClick={() => handleOpenModal(diamondProduct)}>
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <Modal open={visible} onCancel={handleCloseModal} footer={null} className="diamond-modal">
            {selectedGoldPage && (
              <div className="diamond-modal-content">
                <img src={selectedGoldPage.image} alt={selectedGoldPage.pname} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedGoldPage.pname}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedGoldPage.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedGoldPage.pdescription}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedGoldPage.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedGoldPage.cost}`}</p>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default GoldPage;
