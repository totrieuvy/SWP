import React from "react";
import "./Home.css";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import AdvertiseCarousel from "../advertiseCarousel/AdvertiseCarousel";
import AboutUs from "../aboutUs/AboutUs";
import DiamondProduct from "../diamondProduct/DiamondProduct";
import Footer from "../footer/Footer";
import GoldProduct from "../goldProduct/GoldProduct";
import GemstoneProduct from "../gemstoneProduct/GemstoneProduct";

function Home() {
  // const [diamondProducts, setDiamondProducts] = React.useState([]);

  // const fetchDiamondProduct = async () => {
  //   const response = await api.get("/api/productSell/readall");
  //   console.log(response.data);

  //   setDiamondProducts(response.data);
  // };

  // React.useEffect(() => {
  //   fetchDiamondProduct();
  // }, []);
  // const [listProduct, setListProduct] = useState([]);
  // let list = [];

  // function getDiamondDetail(product) {
  //   const category = categories.filter((cate) => cate.id === product.category_id);
  //   list.push({ ...product, category });
  // }

  // diamondProducts.forEach((product) => getDiamondDetail(product));
  // console.log(list);

  // console.log(list.filter((item) => item.category[0].name == "Bracelet"));

  // useEffect(() => {
  //   document.title = "JEWELRYMS";
  // }, []);
  return (
    <div className="Home">
      <Header />
      <AdvertiseCarousel />
      <AboutUs />
      <h1 className="Home__jewelry">
        CÁC SẢN PHẨM CỦA <span className="jewelry">JEWELRYMS</span>
      </h1>
      <DiamondProduct numberOfSlides={5} />
      <GoldProduct />
      <GemstoneProduct />
      <Footer />
    </div>
  );
}

export default Home;
