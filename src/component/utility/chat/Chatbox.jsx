import React, { useEffect, useState, useRef } from "react";
import { Input, Button, List, Layout, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";
import WebSocketService from "../../../config/WebSocket";
import api from "../../../config/axios";

const { Content, Footer } = Layout;
const { Text } = Typography;

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userMap, setUserMap] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("api/profile/all");
        const users = response.data;
        const newUserMap = {};
        users.forEach((user) => {
          newUserMap[user.id] = {
            role: user.role,
            accountName: user.accountName,
          };
        });
        setUserMap(newUserMap);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    const userID = localStorage.getItem("userId");
    if (!userID) {
      console.log("User ID not found. WebSocket connection not initiated.");
      return;
    }

    WebSocketService.connect(null, null, (chatMessage) => {
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
    });

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  useEffect(scrollToBottom, [messages]);
  const getRoleColor = (role) => {
    switch (role) {
      case "ROLE_STAFF":
        return "#1890ff"; // Blue
      case "ROLE_MANAGER":
        return "#fa8c16"; // Orange
      case "ROLE_ADMIN":
        return "#52c41a"; // Green
      default:
        return "#f0f0f0"; // Default light gray
    }
  };
  const sendMessage = () => {
    if (message.trim()) {
      WebSocketService.sendMessage(message);
      setMessage("");
    }
  };

  useEffect(() => {
    console.log("Messages: ", messages);
    console.log("User Map: ", userMap);
  }, [messages, userMap]);

  return (
    <Layout style={{ height: "100%", background: "#fff" }}>
      <Content
        style={{
          padding: "20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List
          dataSource={messages}
          renderItem={(msg, index) => {
            const userInfo = userMap[msg.sender] || {
              role: "Unknown",
              accountName: "Unknown User",
            };
            const isCurrentUser = msg.sender === localStorage.getItem("userId");
            const backgroundColor = isCurrentUser
              ? "#f0f0f0"
              : getRoleColor(userInfo.role);

            return (
              <List.Item
                key={index}
                style={{
                  justifyContent:
                    msg.senderId === localStorage.getItem("userId")
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <div
                  style={{
                    background: backgroundColor,
                    color: isCurrentUser ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "18px",
                    maxWidth: "70%",
                  }}
                >
                  <Text strong>
                    {isCurrentUser
                      ? `Tôi :`
                      : `${userMap[msg.sender].accountName} (ID: ${
                          msg.sender
                        },${" "}
                    ${msg.role})`}
                  </Text>
                  : <Text>{msg.content}</Text>
                </div>
              </List.Item>
            );
          }}
        />
        <div ref={messagesEndRef} />
      </Content>
      <Footer style={{ padding: "10px", background: "#fff" }}>
        <div style={{ display: "flex" }}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={sendMessage}
            placeholder="Type a message..."
            style={{ flexGrow: 1 }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={sendMessage}
            style={{ marginLeft: 8 }}
          >
            Send
          </Button>
        </div>
      </Footer>
    </Layout>
  );
};

export default ChatBox;
