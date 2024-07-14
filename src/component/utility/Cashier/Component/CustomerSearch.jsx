import React, { useEffect, useRef, useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Button, Input, List, message as antdMessage } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import CreateCustomerForm from "../../../Form/CreateCustomerForm";
import api from "../../../../config/axios";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#a7bfad",
    }}
  />
);

function CustomerSearch({ childToParent }) {
  const [scanResult, setScanResult] = useState(null);
  const [manualSerialNumber, setManualSerialNumber] = useState("");
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const formRef = useRef(null);

  const startScan = () => {
    if (isScanning) return; // Prevent multiple simultaneous scans

    const newScanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    const success = (result) => {
      newScanner.clear();
      setScanResult(result);
      childToParent(result);
      setIsScanning(false); // Allow new scans
    };

    const error = (err) => {
      console.warn(err);
    };

    newScanner.render(success, error);
    setScanner(newScanner);
    setIsScanning(true);
  };

  const handleManualSerialNumberChange = (event) => {
    setManualSerialNumber(event.target.value);
  };

  const setVisibleFormCustomer = () => {
    setVisible(true);
  };

  const handleCloseForm = () => {
    setVisible(false);
  };

  const onSearch = async (value) => {
    try {
      const response = await api.get("/api/customer/search", {
        params: {
          keyword: value,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    antdMessage.success(
      `Khách hàng: ${customer.email} - Lượng điểm: ${customer.pointAmount}`,
      60
    );
    childToParent(null, customer.id);
  };

  return (
    <div className="search">
      <div
        style={{ marginBottom: 10, display: "flex", flexDirection: "column" }}
      >
        <Search
          placeholder="Nhập tên khách hàng"
          allowClear
          size="large"
          onSearch={onSearch}
          style={{ borderWidth: "2px" }}
        />
        {searchResults.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <List
              itemLayout="horizontal"
              style={{ overflowY: "scroll", height: "100px" }}
              dataSource={searchResults}
              renderItem={(customer) => (
                <List.Item
                  onClick={() => handleSelectCustomer(customer)}
                  style={{ cursor: "pointer" }}
                >
                  <List.Item.Meta
                    title={customer.email}
                    description={`Points: ${customer.pointAmount}`}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
      <section id="getOrderField">
        <Button type="primary" onClick={startScan}>
          Quét QR
        </Button>
        <Button type="primary" onClick={setVisibleFormCustomer}>
          Tạo tài khoản
        </Button>
      </section>
      <div id="reader" style={{ width: "250px", height: "250px" }}></div>
      {visible && (
        <div ref={formRef}>
          <CreateCustomerForm onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
}

export default CustomerSearch;
