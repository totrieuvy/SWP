import React, { useEffect, useState } from "react";
import { Table, Spin, Typography } from "antd";
import api from "../../../config/axios";

const { Title } = Typography;

function StatisticWorkArea() {
  const [dataDay, setDataDay] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    document.title = "Thống kê theo quầy";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dayResponse, monthResponse, yearResponse] = await Promise.all([
          api.get("/api/Dashboard/workArea-statistics-day"),
          api.get("/api/Dashboard/workArea-statistics-month"),
          api.get("/api/Dashboard/workArea-statistics-year"),
        ]);
        setDataDay(dayResponse.data);
        setDataMonth(monthResponse.data);
        setDataYear(yearResponse.data);
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Mã quầy",
      dataIndex: "workAreaCode",
      key: "workAreaCode",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Số đơn hàng",
      dataIndex: "numberOrder",
      key: "numberOrder",
    },
    {
      title: "Doanh thu tổng",
      dataIndex: "totalRevenueAmount",
      key: "totalRevenueAmount",
      render: (text) => `${text}`,
    },
  ];

  const staffColumns = [
    {
      title: "Mã nhân viên",
      dataIndex: "staffID",
      key: "staffID",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: "Doanh thu",
      dataIndex: "revenueAmount",
      key: "revenueAmount",
      render: (text) => `${text}`,
    },
  ];

  const renderTables = (data) => {
    return data.map((item) => ({
      ...item,
      staffWorkAreaRevenues: (
        <Table
          size="small"
          columns={staffColumns}
          dataSource={item.staffWorkAreaRevenues}
          pagination={false}
          rowKey="staffID"
        />
      ),
    }));
  };

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Title level={2}>Thống kê theo ngày</Title>
          <Table
            dataSource={renderTables(dataDay)}
            columns={columns}
            expandable={{ expandedRowRender: (record) => record.staffWorkAreaRevenues }}
            rowKey="workAreaID"
          />
        </>
      )}

      {loading ? (
        <Spin />
      ) : (
        <>
          <Title level={2}>Thống kê theo tháng</Title>
          <Table
            dataSource={renderTables(dataMonth)}
            columns={columns}
            expandable={{ expandedRowRender: (record) => record.staffWorkAreaRevenues }}
            rowKey="workAreaID"
          />
        </>
      )}

      {loading ? (
        <Spin />
      ) : (
        <>
          <Title level={2}>Thống kê theo năm</Title>
          <Table
            dataSource={renderTables(dataYear)}
            columns={columns}
            expandable={{ expandedRowRender: (record) => record.staffWorkAreaRevenues }}
            rowKey="workAreaID"
          />
        </>
      )}
    </div>
  );
}

export default StatisticWorkArea;
