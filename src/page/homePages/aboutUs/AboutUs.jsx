import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="AboutUs">
      <div className="AboutUs__content">
        <div className="AboutUs__text">
          <p className="AboutUs__text__why">
            VÌ SAO CHỌN <span className="AboutUs__text__why__jewelry"> JEWELRYMS</span>
          </p>
          <div className="AboutUs__text__reason">
            <p>- Chào mừng đến với JEWELRYMS - nơi bạn có thể tìm thấy sự hoàn hảo trong trang sức.</p>
            <p>
              - Tại JEWELRYSM, chúng tôi mang đến cho bạn một bộ sưu tập đa dạng với những thiết kế tinh tế và độc đáo.
              Chúng tôi cam kết về chất lượng và sự tận tâm trong từng sản phẩm.
            </p>
            <p>
              - Chúng tôi tin rằng mỗi món trang sức đều có một câu chuyện riêng, và tại JEWELRYSM, chúng tôi giúp bạn
              kể câu chuyện của mình thông qua những thiết kế đầy ý nghĩa.
            </p>
            <p>- Hãy khám phá và tạo nên phong cách riêng của bạn cùng JEWELRYSM SHOP ngay hôm nay!</p>
          </div>
        </div>
        <div className="AboutUs__image">
          <img src="./images/advertise02.jpg" alt="customer" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
