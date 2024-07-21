import React from "react";
import { Typography, Divider, List, Row, Col, Image } from "antd";
import "./Policy.css";

const { Title, Text } = Typography;

const policyData = [
  {
    title: "Chính sách đổi trả:",
    className: "section-title-refund",
    content: [
      "Thời gian đổi trả: Các sản phẩm có thể được trả lại trong vòng 30 ngày kể từ ngày mua. Thời gian hoàn trả bắt đầu vào ngày mặt hàng được mua, như được ghi trên hóa đơn của bạn.",
      "Biên lai gốc: Biên lai gốc phải được xuất trình tại thời điểm mua lại. Điều này giúp chúng tôi xác minh việc mua hàng và tính toán giá trị mua lại.",
      "Tình trạng của sản phẩm: Các mặt hàng phải được trả lại trong tình trạng ban đầu, bắt đầu từ thời điểm thanh toán xong và xuất trên hóa đơn. Sản phẩm chưa qua sử dụng và không bị thay đổi, trầy xước hay va đập dưới bất kỳ hình thức nào. Tất cả các bao bì, hộp chứa và tài liệu gốc phải được bao gồm.",
      "Các mặt hàng không thể hoàn lại: Các mặt hàng đã bị thay đổi kích thước, hư hỏng hoặc bị thay đổi sau khi mua hàng sẽ không được chấp nhận trả lại.",
      "Điều kiện hoàn trả: Khách hàng phải sử dụng tài khoản khách hàng khi thanh toán hóa đơn để hoàn trả lại số tiền tương ứng. Trong trường hợp không có tài khoản khách hàng, quý khách có thể đăng ký tài khoản mình với nhân viên thanh toán.",
    ],
  },
  {
    title: "Chính sách mua hàng:",
    className: "section-title-purchase",
    content: [
      "Đủ điều kiện: Chúng tôi mua nhiều loại trang sức, bao gồm vàng cũng như các mảnh kim cương hoặc đá quý khác.",
      "Thẩm định: Khi bạn mang một mặt hàng đến bán, nhân viên kiểm định của chúng tôi sẽ kiểm tra và thẩm định mặt hàng đó dựa trên tình trạng, giá trị thị trường và nhu cầu tồn kho hiện tại của chúng tôi. Quá trình này đảm bảo rằng chúng tôi cung cấp một mức giá hợp lý cho tất cả các mặt hàng.",
      "Thanh toán: Nếu bạn chọn chấp nhận đề nghị của chúng tôi, chúng tôi sẽ xử lý thanh toán ngay lập tức bao gồm thanh toán bằng tiền mặt và chuyển khoản ngân hàng. Xin lưu ý rằng bạn phải xuất trình giấy tờ tùy thân hợp lệ cho tất cả các giao dịch.",
      "Tình trạng mặt hàng: Chúng tôi chấp nhận mặt hàng ở mọi điều kiện, nhưng xin lưu ý rằng tình trạng của mặt hàng có thể ảnh hưởng đáng kể đến giá trị của nó.",
    ],
  },
  {
    title: "Chính sách bảo hành:",
    className: "section-title-guarantee",
    content: [
      "Bảo hiểm: Bảo hành của chúng tôi chỉ bao gồm mọi khiếm khuyết về vật liệu hoặc tay nghề đối với tất cả đồ trang sức mua từ cửa hàng của chúng tôi. Nếu bạn nhận thấy bất kỳ khiếm khuyết nào như vậy, chúng tôi sẽ sửa chữa hoặc thay thế sản phẩm của bạn miễn phí.",
      "Thời hạn: Bảo hành có thơì gian hiệu lực kể từ ngày mua. Thời hạn bảo hành bắt đầu vào ngày mặt hàng được mua, như được ghi trên biên lai của bạn.",
      "Dịch vụ: Theo chế độ bảo hành, chúng tôi cũng cung cấp các dịch vụ định kỳ miễn phí dựa theo chính sách trên sản phẩm như vệ sinh, kiểm tra hoặc siết chặt đá.",
      "Ngoại lệ: Bảo hành này không bao gồm các thiệt hại do sử dụng sai, các thay đổi không được thực hiện bởi cửa hàng của chúng tôi hoặc không đáp ứng bất kỳ lịch trình bảo trì nào.",
      "Quy trình yêu cầu bồi thường: Để yêu cầu bồi thường theo chính sách bảo hành này, vui lòng mang sản phẩm đến cửa hàng của chúng tôi để đánh giá. Nhân viên chuyên môn của chúng tôi sẽ kiểm tra mặt hàng và cung cấp hỗ trợ thêm.",
    ],
  },
];

function Policy() {
  return (
    <div className="Policy">
      <Row justify="center" className="header__policy" align="middle">
        <Col>
          <Image src="./images/Logo.png" width={50} preview={false} />
        </Col>
        <Col>
          <Title level={1} className="header__policy__logo">
            JEWELRYMS
          </Title>
        </Col>
      </Row>

      <Divider />

      <Row justify="center">
        <Col>
          <Title level={1} className="title">
            CHÍNH SÁCH CỬA HÀNG
          </Title>
        </Col>
      </Row>

      <Divider />

      {policyData.map((section, index) => (
        <div key={index} className="content__policy__section">
          <Title level={2} className={section.className}>
            {section.title}
          </Title>
          <List
            dataSource={section.content}
            renderItem={(item) => (
              <List.Item>
                <Text>{item}</Text>
              </List.Item>
            )}
          />
          <Divider />
        </div>
      ))}
    </div>
  );
}

export default Policy;
