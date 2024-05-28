import React from "react";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <div className="footer">
        <div className="content__footer">
          <div className="text">
            <img src="./images/Logo.png" alt="Logo" />
            <div className="logo">JEWELRYMS</div>
          </div>
          <div className="info">
            <div className="info__address">
              <EnvironmentOutlined style={{ marginRight: "8px" }} />
              Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức
            </div>
            <div className="info__address">
              <EnvironmentOutlined style={{ marginRight: "8px" }} />
              Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương
            </div>
            <div className="info__phone">
              <PhoneOutlined style={{ marginRight: "8px" }} />
              0909113113 (anh Hoàng)
            </div>
            <div className="info__phone">
              <PhoneOutlined style={{ marginRight: "8px" }} />
              0909113113 (anh Hoàng 2)
            </div>
            <div className="info__email">
              <MailOutlined style={{ marginRight: "8px" }} />
              abc@gmail.com
            </div>
          </div>
        </div>
        <div className="target">
          <div className="target__title">Sứ mệnh của chúng tôi</div>
          <div className="target__content">
            Tại JEWELRYMS, chúng tôi cam kết mang đến cho khách hàng những món trang sức tinh xảo, độc đáo và chất lượng
            cao. Sứ mệnh của chúng tôi là:
          </div>
          <div className="target__content__1">
            - Tôn Vinh Vẻ Đẹp: Tạo ra những thiết kế trang sức không chỉ đẹp mắt mà còn tôn vinh vẻ đẹp riêng biệt của
            từng cá nhân.
          </div>
          <div className="target__content__2">
            - Chất Lượng Hàng Đầu: Sử dụng những vật liệu tốt nhất và kỹ thuật chế tác tiên tiến để đảm bảo mỗi sản phẩm
            đều đạt chuẩn mực cao nhất về chất lượng và độ bền.
          </div>
          <div className="target__content__3">
            - Khách Hàng Là Trên Hết: Đặt sự hài lòng của khách hàng lên hàng đầu bằng cách cung cấp dịch vụ chăm sóc
            khách hàng tuyệt vời và trải nghiệm mua sắm đáng nhớ.
          </div>
          <div className="target__content__4">
            - Sáng Tạo và Đổi Mới: Không ngừng đổi mới và sáng tạo để mang đến những bộ sưu tập trang sức hiện đại và
            hợp thời trang.
          </div>
          <div className="target__content__5">
            - Trách Nhiệm Xã Hội: Cam kết thực hiện các hoạt động kinh doanh có trách nhiệm, bảo vệ môi trường và đóng
            góp vào sự phát triển của cộng đồng.
          </div>
        </div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} JEWELRYMS. Tất cả các quyền được bảo lưu.</div>
    </div>
  );
}

export default Footer;
