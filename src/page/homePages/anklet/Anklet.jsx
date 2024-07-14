import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Card } from "react-bootstrap";
import { Button, Modal } from "antd";
import api from "../../../config/axios";

import "./Anklet.css";

function Anklet({ numberOfSlides = 5 }) {
  const [diamondProducts, setDiamondProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedAnklet, setSelectedAnklet] = useState(null);

  const fetchAnklet = async () => {
    try {
      const response = await api.get("/api/productSell");
      console.log(response.data);
      setDiamondProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const filterAnklet = diamondProducts.filter((data) => data.category_name === "Vòng chân");
  console.log(filterAnklet);

  useEffect(() => {
    fetchAnklet();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedAnklet(product);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSelectedAnklet(null);
  };

  return (
    <div className="Anklet container">
      <div className="Anklet__advertise">
        <h2 className="Anklet__advertise__text">Vòng đeo chân</h2>
        <div className="Anklet__product">
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
            {filterAnklet.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="Anklet__card">
                  <Card.Img
                    variant="top"
                    src={diamondProduct.image}
                    className="Anklet__card__image"
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
            {selectedAnklet && (
              <div className="diamond-modal-content">
                <img src={selectedAnklet.image} alt={selectedAnklet.pname} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedAnklet.pname}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedAnklet.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedAnklet.pdescription}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedAnklet.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedAnklet.cost}`}</p>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Anklet;
