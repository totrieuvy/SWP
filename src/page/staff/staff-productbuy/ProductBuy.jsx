import React from "react";
import ViewProductBuyOrder from "./Component/ViewProductBuyOrder";
import CreateProductBuyToAdd from "./Component/CreateProductBuyToAdd";
import "./style.css";

const sampleData = [
  {
    id: 1,
    category: "Ring",
    name: "Diamond Ring",
    metalType: "Gold",
    gemstoneType: "Diamond",
    calculatedPrice: 1500.0,
  },
  {
    id: 2,
    category: "Necklace",
    name: "Ruby Necklace",
    metalType: "Silver",
    gemstoneType: "Ruby",
    calculatedPrice: 1200.0,
  },
  {
    id: 3,
    category: "Bracelet",
    name: "Emerald Bracelet",
    metalType: "Platinum",
    gemstoneType: "Emerald",
    calculatedPrice: 2500.0,
  },
  {
    id: 4,
    category: "Earrings",
    name: "Sapphire Earrings",
    metalType: "Gold",
    gemstoneType: "Sapphire",
    calculatedPrice: 1800.0,
  },
  {
    id: 5,
    category: "Ring",
    name: "Amethyst Ring",
    metalType: "Silver",
    gemstoneType: "Amethyst",
    calculatedPrice: 750.0,
  },
  {
    id: 6,
    category: "Necklace",
    name: "Pearl Necklace",
    metalType: "Gold",
    gemstoneType: "Pearl",
    calculatedPrice: 1300.0,
  },
  {
    id: 7,
    category: "Bracelet",
    name: "Topaz Bracelet",
    metalType: "Rose Gold",
    gemstoneType: "Topaz",
    calculatedPrice: 1600.0,
  },
  {
    id: 8,
    category: "Earrings",
    name: "Opal Earrings",
    metalType: "Silver",
    gemstoneType: "Opal",
    calculatedPrice: 1100.0,
  },
  {
    id: 9,
    category: "Ring",
    name: "Garnet Ring",
    metalType: "Platinum",
    gemstoneType: "Garnet",
    calculatedPrice: 2000.0,
  },
  {
    id: 10,
    category: "Necklace",
    name: "Aquamarine Necklace",
    metalType: "White Gold",
    gemstoneType: "Aquamarine",
    calculatedPrice: 2200.0,
  },
];

function ProductBuy() {
  return (
    <div className="saleProductBuy">
      <ViewProductBuyOrder data={sampleData} />
      <CreateProductBuyToAdd />
    </div>
  );
}

export default ProductBuy;
