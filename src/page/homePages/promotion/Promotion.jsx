import React, { useEffect } from "react";
import { Table } from "antd";
import Header from "../header/Header";
import AdvertiseCarousel from "../advertiseCarousel/AdvertiseCarousel";
import Footer from "../footer/Footer";
import "./Promotion.css";

function Promotion() {
  const columnsToPoint = [
    {
      title: "Nhóm hàng",
      dataIndex: "nhom",
      key: "nhom",
      width: "33.33%",
      align: "center",
    },
    {
      title: "Doanh thu quy đổi",
      dataIndex: "doanhthu",
      key: "doanhthu",
      width: "33.33%",
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghichu",
      key: "ghichu",
      width: "33.33%",
      align: "center",
    },
  ];

  const dataSourceToPoint = [
    {
      key: "1",
      nhom: "Kim cương rời, nữ trang 24k",
      doanhthu: "2.000.000 vnđ = 1 điểm",
      ghichu: "Điểm được sử dụng để xét hạng khách hàng",
    },
    {
      key: "2",
      nhom: "Vàng miếng",
      doanhthu: "6.000.000 vnđ = 1 điểm",
      ghichu: "Điểm được sử dụng để xét hạng khách hàng",
    },
    {
      key: "3",
      nhom: "Tất cả dòng sản phẩm còn lại",
      doanhthu: "1.000.000 vnđ = 1 điểm",
      ghichu: "Điểm được sử dụng để xét hạng khách hàng",
    },
  ];

  const columnsQuyDoi = [
    {
      title: "Hạng thẻ",
      dataIndex: "hangthe",
      key: "hangthe",
      width: "33.33%",
      align: "center",
    },
    {
      title: "Điểm tích lũy",
      dataIndex: "diemtichluy",
      key: "diemtichluy",
      width: "33.33%",
      align: "center",
    },
    {
      title: "Thời hạn sử dụng",
      dataIndex: "thoihan",
      key: "thoihan",
      width: "33.33%",
      align: "center",
    },
  ];

  const dataSourceQuyDoi = [
    {
      key: "1",
      hangthe: "Thẻ kết nối",
      diemtichluy: "0 - 99 điểm",
      thoihan: "Vô thời hạn đến khi nâng hạn thẻ cao hơn",
    },
    {
      key: "2",
      hangthe: "Thẻ thành viên",
      diemtichluy: "100 - 399 điểm",
      thoihan: "Vô thời hạn đến khi nâng hạn thẻ cao hơn",
    },
    {
      key: "3",
      hangthe: "Thẻ đồng hành",
      diemtichluy: "400 - 999 điểm",
      thoihan: "Vô thời hạn đến khi nâng hạn thẻ cao hơn",
    },
    {
      key: "4",
      hangthe: "Thẻ thân thiết",
      diemtichluy: "1000 điểm trở lên",
      thoihan: "Vô thời hạn",
    },
  ];

  const columnsKhuyenMai = [
    {
      title: "Nhóm hàng",
      dataIndex: "nhomhang",
      key: "nhomhang",
      width: "33.33%",
      align: "center",
    },
    {
      title: "Thẻ thành viên",
      dataIndex: "thanvien",
      key: "thanvien",
      width: "33.33%",
      align: "center",
    },
    {
      title: "Thời hạn sử dụng",
      dataIndex: "thoihan",
      key: "thoihan",
      width: "33.33%",
      align: "center",
    },
  ];

  const dataSourceKhuyenMai = [
    {
      key: "1",
      nhomhang: "Đá rời/ kim cương rời",
      thanvien: "2%",
      thoihan: "Vô thời hạn đến khi nâng hạn thẻ cao hơn",
    },
    {
      key: "2",
      nhomhang: "Trang sức đá màu, trang sức kim cương",
      thanvien: "2%",
      thoihan: "Vô thời hạn đến khi nâng hạn thẻ cao hơn",
    },
  ];

  useEffect(() => {
    document.title = "Chính sách khuyến mãi";
  }, []);

  return (
    <div className="Promotion">
      <Header />
      <Navigation />
      <AdvertiseCarousel />
      <div className="Promotion__content">
        <div className="Promotion__toPoint">
          <h2 className="Promotion__money__toPoint">Cách quy đổi tiền sang điểm</h2>
          <Table dataSource={dataSourceToPoint} columns={columnsToPoint} pagination={false} />
        </div>

        <div className="Promotion__QuyDoi">
          <h2 className="Promotion__money__quyDoi">Quy đổi thẻ</h2>
          <Table dataSource={dataSourceQuyDoi} columns={columnsQuyDoi} pagination={false} />
        </div>

        <div className="Promotion__GiamGia">
          <h2 className="Promotion__money__GiamGia">Khuyến mãi</h2>
          <Table dataSource={dataSourceKhuyenMai} columns={columnsKhuyenMai} pagination={false} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Promotion;
