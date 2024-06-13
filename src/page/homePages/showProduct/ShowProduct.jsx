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
  const [visible, setVisible] = useState(false);
  const [selectedNecklace, setSelectedNecklace] = useState(null);
  const [selectedBracelet, setSelectedBracelet] = useState(null);
  const [selectedAnklet, setSelectedAnklet] = useState(null);
  const [selectedEarring, setSelectedEarring] = useState(null);
  const [selectedRingPage, setSelectedRingPage] = useState(null);
  const [selectedGoldPage, setSelectedGoldPage] = useState(null);

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

  const filterBracelet = diamondProducts.filter((data) => data.category_name === "Bracelet");
  console.log(filterBracelet);

  const filterAnklet = diamondProducts.filter((data) => data.category_name === "Anklet");
  console.log(filterAnklet);

  const filterEarring = diamondProducts.filter((data) => data.category_name === "Earring");
  console.log(filterEarring);

  const filterRingPage = diamondProducts.filter((data) => data.category_name === "Ring");
  console.log(filterRingPage);

  const filterGoldPage = diamondProducts.filter((data) => data.category_name === "Gold");
  console.log(filterGoldPage);

  useEffect(() => {
    fetchNecklace();
  }, []);

  const handleOpenModalNecklet = (product) => {
    setSelectedNecklace(product);
    setVisible(true);
  };
  const handleCloseModalNecklet = () => {
    setVisible(false);
    setSelectedNecklace(null);
  };

  const handleOpenModalBracelet = (product) => {
    setSelectedBracelet(product);
    setVisible(true);
  };
  const handleCloseModalBracelet = () => {
    setVisible(false);
    selectedBracelet(null);
  };

  const handleOpenModalAnklet = (product) => {
    setSelectedAnklet(product);
    setVisible(true);
  };
  const handleCloseModalAnklet = () => {
    setVisible(false);
    setSelectedAnklet(null);
  };

  const handleOpenModalEarring = (product) => {
    setSelectedEarring(product);
    setVisible(true);
  };
  const handleCloseModalEarring = () => {
    setVisible(false);
    setSelectedEarring(null);
  };

  const handleOpenModalRing = (product) => {
    setSelectedRingPage(product);
    setVisible(true);
  };
  const handleCloseModalRing = () => {
    setVisible(false);
    setSelectedRingPage(null);
  };

  const handleOpenModalGold = (product) => {
    setSelectedGoldPage(product);
    setVisible(true);
  };
  const handleCloseModalGold = () => {
    setVisible(false);
    setSelectedGoldPage(null);
  };

  return (
    <div className="DiamondProduct container">
      <div className="DiamondProduct__advertise">
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
                    <Button type="primary" ghost onClick={() => handleOpenModalNecklet(diamondProduct)}>
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}

            {filterBracelet.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="Bracelet__card">
                  <Card.Img variant="top" src={diamondProduct.image} className="Bracelet__card__image" alt="Diamond" />
                  <Card.Body className="card__body">
                    <Card.Title className="card__name">{diamondProduct.name}</Card.Title>
                    <Card.Title className="card__carat">{`Carat: ${diamondProduct.carat}`}</Card.Title>
                    <Card.Title className="card__chi">{`Chỉ: ${diamondProduct.chi}`}</Card.Title>
                    <Card.Title className="card__cost">{`Giá: ${diamondProduct.cost}`}</Card.Title>
                    <Button type="primary" ghost onClick={() => handleOpenModalBracelet(diamondProduct)}>
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}

            {filterAnklet.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="Anklet__card">
                  <Card.Img variant="top" src={diamondProduct.image} className="Anklet__card__image" alt="Diamond" />
                  <Card.Body className="card__body">
                    <Card.Title className="card__name">{diamondProduct.name}</Card.Title>
                    <Card.Title className="card__carat">{`Carat: ${diamondProduct.carat}`}</Card.Title>
                    <Card.Title className="card__chi">{`Chỉ: ${diamondProduct.chi}`}</Card.Title>
                    <Card.Title className="card__cost">{`Giá: ${diamondProduct.cost}`}</Card.Title>
                    <Button type="primary" ghost onClick={() => handleOpenModalAnklet(diamondProduct)}>
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}

            {filterEarring.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="Earring__card">
                  <Card.Img variant="top" src={diamondProduct.image} className="Earring__card__image" alt="Earring" />
                  <Card.Body className="card__body">
                    <Card.Title className="card__name">{diamondProduct.name}</Card.Title>
                    <Card.Title className="card__carat">{`Carat: ${diamondProduct.carat}`}</Card.Title>
                    <Card.Title className="card__chi">{`Chỉ: ${diamondProduct.chi}`}</Card.Title>
                    <Card.Title className="card__cost">{`Giá: ${diamondProduct.cost}`}</Card.Title>
                    <Button type="primary" ghost onClick={() => handleOpenModalEarring(diamondProduct)}>
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}

            {filterRingPage.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="RingPage__card">
                  <Card.Img variant="top" src={diamondProduct.image} className="RingPage__card__image" alt="Ring" />
                  <Card.Body className="card__body">
                    <Card.Title className="card__name">{diamondProduct.name}</Card.Title>
                    <Card.Title className="card__carat">{`Carat: ${diamondProduct.carat}`}</Card.Title>
                    <Card.Title className="card__chi">{`Chỉ: ${diamondProduct.chi}`}</Card.Title>
                    <Card.Title className="card__cost">{`Giá: ${diamondProduct.cost}`}</Card.Title>
                    <Button type="primary" ghost onClick={() => handleOpenModalRing(diamondProduct)}>
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}

            {filterGoldPage.map((diamondProduct) => (
              <SwiperSlide key={diamondProduct.productID}>
                <Card style={{ width: "20rem", height: "26rem" }} className="GoldPage__card">
                  <Card.Img variant="top" src={diamondProduct.image} className="GoldPage__card__image" alt="Diamond" />
                  <Card.Body className="card__body">
                    <Card.Title className="card__name">{diamondProduct.name}</Card.Title>
                    <Card.Title className="card__carat">{`Carat: ${diamondProduct.carat}`}</Card.Title>
                    <Card.Title className="card__chi">{`Chỉ: ${diamondProduct.chi}`}</Card.Title>
                    <Card.Title className="card__cost">{`Giá: ${diamondProduct.cost}`}</Card.Title>
                    <Button type="primary" ghost onClick={() => handleOpenModalGold(diamondProduct)}>
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <Modal open={visible} onCancel={handleCloseModalNecklet} footer={null} className="diamond-modal">
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

          <Modal open={visible} onCancel={handleCloseModalBracelet} footer={null} className="diamond-modal">
            {selectedBracelet && (
              <div className="diamond-modal-content">
                <img src={selectedBracelet.image} alt={selectedBracelet.name} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedBracelet.name}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedBracelet.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedBracelet.description}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedBracelet.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedBracelet.cost}`}</p>
              </div>
            )}
          </Modal>

          <Modal open={visible} onCancel={handleCloseModalAnklet} footer={null} className="diamond-modal">
            {selectedAnklet && (
              <div className="diamond-modal-content">
                <img src={selectedAnklet.image} alt={selectedAnklet.name} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedAnklet.name}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedAnklet.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedAnklet.description}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedAnklet.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedAnklet.cost}`}</p>
              </div>
            )}
          </Modal>

          <Modal open={visible} onCancel={handleCloseModalEarring} footer={null} className="diamond-modal">
            {selectedEarring && (
              <div className="diamond-modal-content">
                <img src={selectedEarring.image} alt={selectedEarring.name} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedEarring.name}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedEarring.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedEarring.description}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedEarring.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedEarring.cost}`}</p>
              </div>
            )}
          </Modal>

          <Modal open={visible} onCancel={handleCloseModalRing} footer={null} className="diamond-modal">
            {selectedRingPage && (
              <div className="diamond-modal-content">
                <img src={selectedRingPage.image} alt={selectedRingPage.name} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedRingPage.name}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedRingPage.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedRingPage.description}`}</p>
                <p className="diamond-modal-detail">{`Chỉ: ${selectedRingPage.chi}`}</p>
                <p className="diamond-modal-detail">{`Giá: ${selectedRingPage.cost}`}</p>
              </div>
            )}
          </Modal>

          <Modal open={visible} onCancel={handleCloseModalGold} footer={null} className="diamond-modal">
            {selectedGoldPage && (
              <div className="diamond-modal-content">
                <img src={selectedGoldPage.image} alt={selectedGoldPage.name} className="diamond-modal-image" />
                <h2 className="diamond-modal-title">{selectedGoldPage.name}</h2>
                <p className="diamond-modal-detail">{`Carat: ${selectedGoldPage.carat}`}</p>
                <p className="diamond-modal-detail">{`Mô tả: ${selectedGoldPage.description}`}</p>
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

export default ShowProduct;
