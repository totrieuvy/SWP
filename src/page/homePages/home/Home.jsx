import React, { useEffect, useState } from "react";
import "./Home.scss";
import Header from "../header/Header";
import AdvertiseCarousel from "../advertiseCarousel/AdvertiseCarousel";
import AboutUs from "../aboutUs/AboutUs";
import Footer from "../footer/Footer";
import api from "../../../config/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Button, Modal } from "antd";
import { Card } from "react-bootstrap";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    document.title = "Trang chủ";
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/category");
      setCategories(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/productSell/active");
      setProducts(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error("Error fetching active products:", error);
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSelectedProduct(null);
  };

  return (
    <div className="Home">
      <Header />
      <AdvertiseCarousel />
      <AboutUs />
      <h1 className="Home__jewelry">
        CÁC SẢN PHẨM CỦA <span className="jewelry">JEWELRYMS</span>
      </h1>

      {categories.map((category) => (
        <div key={category.id} className="ProductCategory">
          <h2 className="ProductCategory__title">{category.name}</h2>
          <Swiper navigation={true} modules={[Navigation]} slidesPerView={5} className="ProductCategory__swiper">
            {products
              .filter((product) => product.category_id === category.id)
              .map((product) => (
                <SwiperSlide key={product.productID}>
                  <Card className="Product__card">
                    <Card.Img variant="top" src={product.image} className="Product__card__image" alt={product.pname} />
                    <Card.Body className="card__body">
                      <Card.Title className="card__name">{product.pname}</Card.Title>
                      {product.carat === null ? (
                        ""
                      ) : (
                        <Card.Title className="card__carat">{`Carat: ${product.carat}`}</Card.Title>
                      )}
                      {product.chi === null ? (
                        ""
                      ) : (
                        <Card.Title className="card__chi">{`Chỉ: ${product.chi}`}</Card.Title>
                      )}
                      <Card.Title className="card__cost">{`Giá: ${product.cost}`}</Card.Title>
                      <Button type="primary" ghost onClick={() => handleOpenModal(product)}>
                        Detail
                      </Button>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ))}

      <Modal open={visible} onCancel={handleCloseModal} footer={null} className="product-modal">
        {selectedProduct && (
          <div className="product-modal-content">
            <img src={selectedProduct.image} alt={selectedProduct.pname} className="product-modal-image" width={200} />
            <h2 className="product-modal-title">{selectedProduct.pname}</h2>
            {selectedProduct.carat === null ? (
              ""
            ) : (
              <p className="product-modal-detail">{`Carat: ${selectedProduct.carat}`}</p>
            )}
            <p className="product-modal-detail">{`Mô tả: ${selectedProduct.pdescription}`}</p>
            {selectedProduct.chi === null ? (
              ""
            ) : (
              <p className="product-modal-detail">{`Chỉ: ${selectedProduct.chi}`}</p>
            )}
            <p className="product-modal-detail">{`Giá: ${selectedProduct.cost}`}</p>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}

export default Home;
