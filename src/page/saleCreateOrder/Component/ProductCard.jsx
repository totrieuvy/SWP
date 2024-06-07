import React from "react";
import { Button, Card } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const { Meta } = Card;

function ProductCard({
  productID,
  carat,
  chi,
  cost,
  pname,
  productCode,
  image,
  onAddToOrder,
}) {
  return (
    <Card
      hoverable
      style={{
        width: 120,
        height: 250,
        marginBottom: 16,
      }}
      cover={
        <img
          alt={pname}
          src={image}
          style={{
            height: 100,
            objectFit: "cover",
          }}
        />
      }
    >
      <Meta
        style={{
          height: 150,
        }}
        title={pname}
        description={
          <div>
            <p>Cost: ${cost}</p>
            <Button
              type="primary"
              onClick={() =>
                onAddToOrder({
                  productID,
                  carat,
                  chi,
                  cost,
                  pname,
                  productCode,
                  image,
                })
              }
            >
              Thêm
            </Button>
          </div>
        }
      />
    </Card>
  );
}

export default ProductCard;
