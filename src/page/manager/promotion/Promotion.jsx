import { Spin, Table, Tag, Button, Modal, message } from "antd";
import api from "../../../config/axios";
import React, { useEffect, useState } from "react";
import PromoCreateForm from "../../../page/promoCreate/Component/PromoCreateform";

function Promotion() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [detailsData, setDetailsData] = useState([]);
  const [productSell, setProductSell] = useState([]);
  const [currentPromotionID, setCurrentPromotionID] = useState(null); // State to store current promotionID

  const columns = [
    {
      title: "Tên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Còn hạn giảm giá" : "Hết hạn giảm giá"}
        </Tag>
      ),
      sorter: (a, b) => a.status - b.status,
      defaultSortOrder: "descend",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() =>
              handleViewDetails(record.promotionID, record.productSell_id)
            }
          >
            View Details
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleMainBoardDelete(record.promotionID)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleMainBoardDelete = async (promotionId) => {
    try {
      const response = await api.delete(`/api/promotion/${promotionId}`);
      message.success("Promotion deleted successfully");
      fetchPromotion(); // Refresh promotions after deletion
    } catch (error) {
      console.error("Failed to delete promotion:", error);
      message.error("Failed to delete promotion");
    }
  };
  const fetchPromotion = async () => {
    try {
      const response = await api.get("/api/promotion/list");
      setDataSource(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await api.get("/api/productSell");
        setProductSell(response.data);
      } catch (error) {
        console.error("Failed to fetch product sell data:", error);
      }
    };

    fetchDataProduct();
  }, []);

  const handleViewDetails = async (promotionId, productSellIds) => {
    try {
      const productsToShow = productSell.filter((product) =>
        productSellIds.includes(product.productID.toString())
      );

      setDetailsData(productsToShow);
      setDetailsModalVisible(true);
      setCurrentPromotionID(promotionId); // Store current promotionID
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const handleDelete = async (promotionId, productSellId) => {
    try {
      const requestBody = {
        promotionId: promotionId,
        productSellIds: [productSellId],
      };

      const response = await api({
        method: "DELETE",
        url: "/api/productSell/promotions",
        data: requestBody,
      });

      // Handle success response if needed
    } catch (error) {
      console.error("Failed to delete product from promotion:", error);
    }
  };

  const handleCancel = () => {
    setCreateFormVisible(false);
    setDetailsModalVisible(false);
    setDetailsData([]);
    setCurrentPromotionID(null); // Reset current promotionID
  };

  useEffect(() => {
    fetchPromotion();
    document.title = "Chính sách ưu đãi";
  }, []);

  const detailsColumns = [
    {
      title: "",
      dataIndex: "productID",
      key: "productID",
      width: 150,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "pname",
      key: "pname",
      width: 150,
    },
    {
      title: "Mô tả",
      dataIndex: "pdescription",
      key: "pdescription",
      ellipsis: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Product"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
      width: 120,
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category_name",
      key: "category_name",
      width: 150,
    },
    {
      title: "Chất liệu",
      dataIndex: "metalType",
      key: "metalType",
      width: 100,
    },
    {
      title: "Nhà sản xuất",
      dataIndex: "manufacturer",
      key: "manufacturer",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "cost",
      key: "cost",
      width: 100,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleDelete(currentPromotionID, record.productID)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="ManagerPromotion">
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setCreateFormVisible(true)}>
          Tạo ưu đãi mới
        </Button>
      </div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={dataSource} columns={columns} rowKey="promotionID" />
      )}
      <Modal
        title="Tạo ưu đãi mới"
        visible={createFormVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width="80vw"
      >
        <PromoCreateForm onSuccess={fetchPromotion} onCancel={handleCancel} />
      </Modal>
      <Modal
        title="Chi tiết sản phẩm"
        visible={detailsModalVisible}
        onCancel={handleCancel}
        footer={<Button onClick={handleCancel}>Đóng</Button>}
        destroyOnClose
        width="80vw"
      >
        <Table
          dataSource={detailsData}
          columns={detailsColumns}
          rowKey="productID"
          scroll={{ x: "max-content" }}
        />
      </Modal>
    </div>
  );
}

export default Promotion;
