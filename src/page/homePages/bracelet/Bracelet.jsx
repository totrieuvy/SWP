import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Card } from "react-bootstrap";
import { Button, Modal } from "antd";
import api from "../../../config/axios";

import "./Bracelet.css";

function Bracelet({ numberOfSlides = 5 }) {
  const [diamondProducts, setDiamondProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedBracelet, setSelectedBracelet] = useState(null);

  const fetchBracelet = async () => {
    try {
      const response = await api.get("/api/productSell");
      console.log(response.data);
      setDiamondProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const filterBracelet = diamondProducts.filter((data) => data.category_name === "Bracelet");
  console.log(filterBracelet);

  React.useEffect(() => {
    fetchBracelet();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedBracelet(product);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    selectedBracelet(null);
  };

  return (
    <div className="Bracelet container">
      <div className="Bracelet__advertise">
        <h2 className="Bracelet__advertise__text">Vòng đeo tay</h2>
        <div className="Bracelet__product">
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
            {filterBracelet.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="Bracelet__card">
                  <Card.Img
                    variant="top"
                    src={diamondProduct.image}
                    className="Bracelet__card__image"
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
            {selectedBracelet && (
              <div className="diamond-modal-content">
                <img src={selectedBracelet.image} alt={selectedBracelet.pname} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedBracelet.pname}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedBracelet.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedBracelet.pdescription}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedBracelet.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedBracelet.cost}`}</p>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Bracelet;
