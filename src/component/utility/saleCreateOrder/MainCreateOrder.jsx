import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import SaleViewOrderMenu from "./Component/SaleViewOrderMenu";
import SaleProductMenu from "./Component/SaleProductMenu";
import "./style.css";
import ChooseCategory from "./Component/ChooseCategory";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../../config/axios";

function MainCreateOrder() {
  const [category, setCategory] = useState("");
  const [currOrder, setOrder] = useState([]);
  const [scanResult, setScanResult] = useState(null);
  const [manualSerialNumber, setManualSerialNumber] = useState("");
  const [scannerInstance, setScannerInstance] = useState(null);

  useEffect(() => {
    document.title = "Tạo đơn hàng";
  }, []);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    const success = (result) => {
      scanner.clear();
      setScanResult(result);
    };

    const error = (err) => {
      console.warn(err);
    };

    scanner.render(success, error);
    setScannerInstance(scanner);

    // Cleanup on component unmount
    return () => {
      scanner.clear();
    };
  }, []);

  useEffect(() => {
    if (scanResult) {
      fetchProductByCode(scanResult);
    }
  }, [scanResult]);

  const getCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const fetchProductByCode = async (code) => {
    try {
      const response = await api.get(
        `/api/productSell/get-by-code?productCode=${code}`
      );
      const product = response.data;
      if (product.status === false) {
        message.error("Sản phẩm hết hàng");
      } else {
        addProductToOrder(product);
      }
    } catch (error) {
      console.error("Error fetching product by code:", error);
      message.error("Lỗi khi lấy thông tin sản phẩm");
    }
  };

  const addProductToOrder = (product) => {
    setOrder((prevOrder) => {
      const existingProduct = prevOrder.find(
        (item) => item.productID === product.productID
      );
      if (existingProduct) {
        return prevOrder.map((item) =>
          item.productID === product.productID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevOrder, { ...product, quantity: 1 }];
      }
    });
  };

  const handleManualSerialNumberChange = (event) => {
    setManualSerialNumber(event.target.value);
  };

  const handleRescan = () => {
    setScanResult(null);
    scannerInstance.render(
      (result) => {
        scannerInstance.clear();
        setScanResult(result);
      },
      (err) => {
        console.warn(err);
      }
    );
  };

  const handleSerialNumberSubmit = () => {
    if (manualSerialNumber) {
      fetchProductByCode(manualSerialNumber);
      setManualSerialNumber("");
    } else {
      message.error("Please enter a serial number");
    }
  };

  return (
    <div className="saleCreateOrderContainer">
      <SaleViewOrderMenu closeOrder={setOrder} currentOrder={currOrder} />
      <div id="saleProductDivider">
        <ChooseCategory setCategory={getCategory} />
        <SaleProductMenu setOrder={addProductToOrder} category={category} />
      </div>
      <div className="qrScanner">
        <div id="reader"></div>
        <Button
          type="primary"
          onClick={handleRescan}
          style={{ marginTop: "10px" }}
        >
          Rescan
        </Button>
        <p className="center-text">Or enter the serial number manually:</p>
        <div className="center-input">
          <input
            type="text"
            value={manualSerialNumber}
            onChange={handleManualSerialNumberChange}
          />
          {manualSerialNumber && (
            <p>Serial Number: {manualSerialNumber.slice(-16)}</p>
          )}
        </div>
        <Button
          type="primary"
          onClick={handleSerialNumberSubmit}
          style={{ marginTop: "10px" }}
        >
          Submit Serial Number
        </Button>
      </div>
    </div>
  );
}

export default MainCreateOrder;
