import React, { useEffect, useState } from "react";
import { List, Input, Button, message, Select } from "antd";
import WebSocketService from "../../../config/WebSocket";

const { Option } = Select;

function AppraisalPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleNewProduct = (newProductMessage) => {
      try {
        console.log("Parsed productData:", newProductMessage); // Log the parsed data

        const productData = newProductMessage;
        const formattedProduct = {
          id: productData.pk_ProductBuyID,
          name: productData.pbName || "Không có",
          category: `${productData.metalType || "Không có kim loại"} / ${
            productData.gemstoneType || "Không có đá quý"
          }`,
          image: productData.image || "Không có",
          metalWeight: productData.chi || "Không có",
          gemstoneWeight: productData.carat || "Không có",
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
      !metalWeight ||
      isNaN(metalWeight) ||
      metalWeight <= 0 ||
      !gemstoneWeight ||
      isNaN(gemstoneWeight) ||
      gemstoneWeight <= 0 ||
      !cost ||
      isNaN(cost) ||
      cost <= 0
    ) {
      message.error(
        "Please enter valid metal weight, gemstone weight, and cost"
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
    message.success("Appraisal submitted successfully");
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
      <h1>Product Appraisal</h1>
      {products.length === 0 ? (
        <p>No products awaiting appraisal.</p>
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
                description={`Category: ${item.category}`}
              />
              <Select
                placeholder="Select Metal Type"
                value={item.metalType || "Không"}
                onChange={(value) =>
                  handleInputChange(item.id, "metalType", value)
                }
                style={{ width: 150, marginRight: 16 }}
              >
                <Option value="Vàng">Vàng</Option>
                <Option value="Không">Không có kim loại</Option>
              </Select>
              <Select
                placeholder="Select Gemstone Type"
                value={item.gemstoneType || "Không"}
                onChange={(value) =>
                  handleInputChange(item.id, "gemstoneType", value)
                }
                style={{ width: 150, marginRight: 16 }}
              >
                <Option value="Kim cương">Kim cương</Option>
                <Option value="Không">Không có đá quý</Option>
              </Select>
              <Input
                type="number"
                placeholder="Metal Weight (Chi)"
                value={item.metalWeight}
                onChange={(e) =>
                  handleInputChange(item.id, "metalWeight", e.target.value)
                }
                style={{ width: 150, marginRight: 16 }}
              />
              <Input
                type="number"
                placeholder="Gemstone Weight (Carat)"
                value={item.gemstoneWeight}
                onChange={(e) =>
                  handleInputChange(item.id, "gemstoneWeight", e.target.value)
                }
                style={{ width: 150, marginRight: 16 }}
              />

              <Input
                type="number"
                placeholder="Cost"
                value={item.cost}
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
                Submit Appraisal
              </Button>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default AppraisalPage;
