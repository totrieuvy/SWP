import { Button, Input, Table, message } from "antd";
import api from "../../../config/axios";
import React, { useState } from "react";

function StaffPerformanceRange() {
  const [data, setData] = useState([]);
  const [inputEmail, setinputEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  React.useEffect(() => {
    document.title = "Năng suất theo giai đoạn";
  }, []);

  const handleChangeEmail = (e) => {
    setinputEmail(e.target.value);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const handleWatch = () => {
    if (!inputEmail) {
      message.error("Bắt buộc nhập email!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      message.error("Phải nhập email hợp lệ!");
      return;
    }

    if (!startDate) {
      message.error("Hãy nhập ngày bắt đầu");
      return;
    }

    if (!endDate) {
      message.error("Hãy nhập ngày kết thúc");
      return;
    }

    if (!isValidDate(startDate)) {
      message.error("Ngày bắt đầu phải có dạng YYYY-MM-DD");
      return;
    }

    if (!isValidDate(endDate)) {
      message.error("Ngày kết thúc phải có dạng YYYY-MM-DD");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      message.error("Ngày bắt đầu phải trước ngày kết thúc");
      return;
    }

    api
      .get(`/api/Dashboard/staff-statistics-range?staffEmail=${inputEmail}&startDate=${startDate}&endDate=${endDate}`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const columns = [
    {
      title: "Số ca đã làm",
      dataIndex: "shiftsCount",
      key: "shiftsCount",
    },
    {
      title: "Số sản phẩm đã bán",
      dataIndex: "salesCount",
      key: "salesCount",
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "revenueGenerated",
      key: "revenueGenerated",
    },
    {
      title: "Số khách đã đăng kí",
      dataIndex: "customerSignUps",
      key: "customerSignUps",
    },
  ];

  return (
    <div>
      <Input
        placeholder="Nhập email"
        value={inputEmail}
        onChange={handleChangeEmail}
        style={{ width: 200, marginRight: 10 }}
      />
      <Input
        placeholder="Nhập ngày bắt đầu (YYYY-MM-DD)"
        value={startDate}
        onChange={handleStartDate}
        style={{ width: 200, marginRight: 10 }}
      />
      <Input
        placeholder="Nhập ngày kết thúc (YYYY-MM-DD)"
        value={endDate}
        onChange={handleEndDate}
        style={{ width: 200, marginRight: 10 }}
      />
      <Button type="primary" onClick={handleWatch}>
        Xem
      </Button>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default StaffPerformanceRange;
