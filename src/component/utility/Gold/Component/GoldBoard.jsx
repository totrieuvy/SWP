import React from "react";
import BoardTitle from "./BoardTitle";
import ItemName from "./ItemName.jsx";
import ItemPrice from "./ItemPrice.jsx";

function GoldBoard({ data }) {
  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <h2 id="mainTitle">Giá vàng hôm nay</h2>
      <BoardTitle />
      <section id="boardGrid">
        <div id="nameBox">
          {data.map((item, index) => (
            <ItemName
              key={index} // Place key attribute here
              type={item["Tên giá vàng"]}
              time={item["Thời gian nhập giá vàng"]}
              amount={item["Hàm lượng vàng"]}
              kara={item["Hàm lượng kara"]}
            />
          ))}
        </div>
        <div id="priceBox">
          {data.map((item, index) => (
            <ItemPrice
              key={index} // Place key attribute here
              buy={item["Giá mua vào"]}
              sell={item["Giá mua ra"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GoldBoard;
