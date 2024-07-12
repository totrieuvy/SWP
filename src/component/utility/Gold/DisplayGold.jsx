import React, { useEffect, useState } from "react";
import TopBar from "./Component/topBar";
import "./Component/style.css";
import GoldBoard from "./Component/GoldBoard";

function DisplayGold() {
  const [data, setData] = useState(null);
  const goldAPI = "http://174.138.72.129:8080/Info/GoldPrice";

  useEffect(() => {
    // Function to fetch gold price data
    const fetchGoldData = () => {
      fetch(goldAPI)
        .then((response) => response.json())
        .then((data) => {
          setData(data.DataList.Data);
        })
        .catch((error) => {
          console.error("Error occurred during get gold API", error);
        });
    };

    // Initial fetch
    fetchGoldData();

    // Set interval to fetch data every 30 minutes (1800000 milliseconds)
    const intervalId = setInterval(fetchGoldData, 1800000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [goldAPI]);

  return (
    <>
      <TopBar date={new Date()} />
      <GoldBoard data={data} />
    </>
  );
}

export default DisplayGold;
