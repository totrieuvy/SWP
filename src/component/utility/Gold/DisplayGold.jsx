import React, { useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import TopBar from "./Component/topBar";
import GoldBoard from "./Component/GoldBoard";
import api from "../../../config/axios";

const { Content } = Layout;

function DisplayGold() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoldData = async () => {
      try {
        setLoading(true);
        const response = await api.get("Info/GoldPrice");
        setData(response.data.DataList.Data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldData();
    const intervalId = setInterval(fetchGoldData, 1800000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <TopBar />
      <Content style={{ padding: "0 50px", minHeight: "calc(100vh - 64px)" }}>
        {loading ? <Spin size="large" /> : <GoldBoard data={data} />}
      </Content>
    </Layout>
  );
}

export default DisplayGold;
