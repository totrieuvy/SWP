import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Card } from "react-bootstrap";
import { Button, Modal } from "antd";
import api from "../../../config/axios";

import "./RingPage.css";

function RingPage({ numberOfSlides = 5 }) {
  const [diamondProducts, setDiamondProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRingPage, setSelectedRingPage] = useState(null);

  const fetchRingPage = async () => {
    try {
      const response = await api.get("/api/productSell");
      console.log(response.data);
      setDiamondProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const filterRingPage = diamondProducts.filter((data) => data.category_name === "Ring");
  console.log(filterRingPage);

  useEffect(() => {
    fetchRingPage();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedRingPage(product);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSelectedRingPage(null);
  };

  return (
    <div className="RingPage container">
      <div className="RingPage__advertise">
        <h2 className="RingPage__advertise__text">Nhẫn</h2>
        <div className="RingPage__product">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Navigation]}
            slidesPerView={numberOfSlides}
            className="mySwiper"
          >
            {filterRingPage.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="RingPage__card">
                  <Card.Img
                    variant="top"
                    src={diamondProduct.image}
                    className="RingPage__card__image"
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
            {selectedRingPage && (
              <div className="diamond-modal-content">
                <img src={selectedRingPage.image} alt={selectedRingPage.pname} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedRingPage.pname}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedRingPage.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedRingPage.pdescription}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedRingPage.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedRingPage.cost}`}</p>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default RingPage;
