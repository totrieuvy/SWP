import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Card } from "react-bootstrap";
import { Button, Modal } from "antd";
import api from "../../../config/axios";

import "./Earring.css";

function Earring({ numberOfSlides = 5 }) {
  const [diamondProducts, setDiamondProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedEarring, setSelectedEarring] = useState(null);

  const fetchEarring = async () => {
    try {
      const response = await api.get("/api/productSell");
      console.log(response.data);
      setDiamondProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const filterEarring = diamondProducts.filter((data) => data.category_name === "Bông tai");
  console.log(filterEarring);

  useEffect(() => {
    fetchEarring();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedEarring(product);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSelectedEarring(null);
  };

  return (
    <div className="Earring container">
      <div className="Earring__advertise">
        <h2 className="Earring__advertise__text">Bông tai</h2>
        <div className="Earring__product">
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
            {filterEarring.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="Earring__card">
                  <Card.Img
                    variant="top"
                    src={diamondProduct.image}
                    className="Earring__card__image"
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
            {selectedEarring && (
              <div className="diamond-modal-content">
                <img src={selectedEarring.image} alt={selectedEarring.pname} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedEarring.pname}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedEarring.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedEarring.pdescription}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedEarring.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedEarring.cost}`}</p>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Earring;
