import React, { useEffect, useState } from "react";
import { List, Input, Button, message, Select } from "antd";
import WebSocketService from "../../../config/WebSocket";

const { Option } = Select;

function AppraisalPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleNewProduct = (newProductMessage) => {
      try {
        console.log("Parsed productData:", newProductMessage);

        const productData = newProductMessage;
        const formattedProduct = {
          id: productData.pk_ProductBuyID,
          name: productData.pbName || "Không có",
          category: `${productData.metalType || "Không có kim loại"} / ${
            productData.gemstoneType || "Không có đá quý"
          }`,
          image: productData.image || "Không có",
          metalWeight: productData.chi || 0,
          gemstoneWeight: productData.carat || 0,
          metalType: productData.metalType || "Không",
          gemstoneType: productData.gemstoneType || "Không",
          price: "",
          status: productData.pbStatus || "Không có",
          cost: null, // Initialize cost as null
        };

        setProducts((prevProducts) => {
          if (!prevProducts.find((p) => p.id === formattedProduct.id)) {
            return [...prevProducts, formattedProduct];
          }
          return prevProducts;
        });
      } catch (error) {
        console.error("Error processing new product message:", error);
      }
    };

    const handleAppraisedProduct = (appraisedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== appraisedProduct.id)
      );
    };

    WebSocketService.connect(
      null,
      null,
      null,
      handleNewProduct,
      handleAppraisedProduct
    );

    WebSocketService.subscribeToUnappraisedProducts(handleNewProduct);

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  const handleAppraisal = (
    productId,
    metalWeight,
    gemstoneWeight,
    gemstoneType,
    metalType,
    cost
  ) => {
    if (
      (!metalWeight && metalWeight !== 0) ||
      isNaN(metalWeight) ||
      metalWeight < 0 ||
      metalWeight > 20 ||
      (!gemstoneWeight && gemstoneWeight !== 0) ||
      isNaN(gemstoneWeight) ||
      gemstoneWeight < 0 ||
      gemstoneWeight > 20 ||
      !cost ||
      isNaN(cost) ||
      cost <= 0
    ) {
      message.error(
        "Vui lòng nhập trọng lượng kim loại, trọng lượng đá quý (0-20) và chi phí hợp lệ"
      );
      return;
    }

    const appraisalData = {
      metalType: metalType || "Không",
      gemstoneType: gemstoneType || "Không",
      metalWeight: parseFloat(metalWeight),
      gemstoneWeight: parseFloat(gemstoneWeight),
      id: productId,
      cost: parseFloat(cost),
    };

    WebSocketService.submitAppraisal(appraisalData);
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
    message.success("Định giá đã được gửi thành công");
  };

  const handleInputChange = (productId, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, [field]: value } : p
      )
    );
  };

  return (
    <div className="AppraisalPage">
      <h1>Định Giá Sản Phẩm</h1>
      {products.length === 0 ? (
        <p>Không có sản phẩm chờ định giá.</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <img src={item.image} alt={item.name} style={{ width: 50 }} />
                }
                title={item.name}
                description={`Danh mục: ${item.category}`}
              />
              <Select
                placeholder="Chọn Loại Kim Loại"
                value={item.metalType}
                onChange={(value) => {
                  handleInputChange(item.id, "metalType", value);
                  handleInputChange(
                    item.id,
                    "metalWeight",
                    value === "Không" ? 0 : item.metalWeight
                  );
                }}
                style={{ width: 150, marginRight: 16 }}
              >
                <Option value="Vàng">Vàng</Option>
                <Option value="Không">Không có kim loại</Option>
              </Select>
              <Select
                placeholder="Chọn Loại Đá Quý"
                value={item.gemstoneType}
                onChange={(value) => {
                  handleInputChange(item.id, "gemstoneType", value);
                  handleInputChange(
                    item.id,
                    "gemstoneWeight",
                    value === "Không" ? 0 : item.gemstoneWeight
                  );
                }}
                style={{ width: 150, marginRight: 16 }}
              >
                <Option value="Kim cương">Kim cương</Option>
                <Option value="Không">Không có đá quý</Option>
              </Select>
              <Input
                type="number"
                placeholder="Trọng lượng Kim Loại (Chỉ)"
                value={item.metalWeight}
                min={0}
                max={20}
                disabled={item.metalType === "Không"}
                onChange={(e) =>
                  handleInputChange(item.id, "metalWeight", e.target.value)
                }
                style={{ width: 150, marginRight: 16 }}
              />
              <Input
                type="number"
                placeholder="Trọng lượng Đá Quý (Carat)"
                value={item.gemstoneWeight}
                min={0}
                max={20}
                disabled={item.gemstoneType === "Không"}
                onChange={(e) =>
                  handleInputChange(item.id, "gemstoneWeight", e.target.value)
                }
                style={{ width: 150, marginRight: 16 }}
              />

              <Input
                type="number"
                placeholder="Chi phí"
                value={item.cost}
                min={0}
                onChange={(e) =>
                  handleInputChange(item.id, "cost", e.target.value)
                }
                style={{ width: 150, marginRight: 16 }}
              />
              <Button
                type="primary"
                onClick={() =>
                  handleAppraisal(
                    item.id,
                    item.metalWeight,
                    item.gemstoneWeight,
                    item.gemstoneType,
                    item.metalType,
                    item.cost
                  )
                }
              >
                Gửi Định Giá
              </Button>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default AppraisalPage;
