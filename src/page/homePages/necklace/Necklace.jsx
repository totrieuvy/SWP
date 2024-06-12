import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Card } from "react-bootstrap";
import { Button, Modal } from "antd";
import api from "../../../config/axios";

import "./NeckLace.css";

function Necklace({ numberOfSlides = 5 }) {
  const [diamondProducts, setDiamondProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedNecklace, setSelectedNecklace] = useState(null);

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

  const handleOpenModal = (product) => {
    setSelectedNecklace(product);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSelectedNecklace(null);
  };

  return (
    <div className="DiamondProduct container">
      <div className="DiamondProduct__advertise">
        <h2 className="DiamondProduct__advertise__text">Dây chuyền</h2>
        <div className="DiamondProduct__product">
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
                    <Button type="primary" ghost onClick={() => handleOpenModal(diamondProduct)}>
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <Modal open={visible} onCancel={handleCloseModal} footer={null} className="diamond-modal">
            {selectedNecklace && (
              <div className="diamond-modal-content">
                <img src={selectedNecklace.image} alt={selectedNecklace.name} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedNecklace.name}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedNecklace.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedNecklace.description}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedNecklace.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedNecklace.cost}`}</p>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Necklace;
