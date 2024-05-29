import React, { useEffect, useState } from "react";
import TopBar from "./Component/topBar";
import "./Component/style.css";
import GoldBoard from "./Component/GoldBoard";
function DisplayGold() {
  const [data, setData] = useState(null);
  const goldAPI = "http://128.199.78.89:8080/Info/GoldPrice";
  useEffect(() => {
    fetch(goldAPI)
      .then((response) => response.json())
      .then((data) => {
        setData(data.DataList.Data);
      })
      .catch((error) => {
        console.error("Error occured during get gold api", error);
      });
  });

  return (
    <>
      <TopBar date={new Date()} />
      <GoldBoard data={data} />
    </>
  );
}

export default DisplayGold;
