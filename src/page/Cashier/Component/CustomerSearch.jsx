import React, { useEffect, useRef, useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import CreateCustomerForm from "../../../component/Form/CreateCustomerForm";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#a7bfad",
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info?.source, value);

function CustomerSearch({ childToParent }) {
  const [scanResult, setScanResult] = useState(null);
  const [manualSerialNumber, setManualSerialNumber] = useState("");
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [visible, setVisible] = useState(false);
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
  const formRef = useRef(null);

  const handleCloseForm = () => {
    setVisible(false);
  };

  return (
    <div className="search">
      <Search
        placeholder="Nhập tên khách hàng"
        allowClear
        size="large"
        onSearch={onSearch}
        style={{ borderWidth: "2px" }}
      />
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
