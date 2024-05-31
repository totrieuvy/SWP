import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";

function Login() {
  const [formVariable] = useForm();
  const navigate = useNavigate();
  const [account, setAccount] = useState();
  const dispatch = useDispatch();
  const handleFinish = async (values) => {
    try {
      const response = await api.post("/account/login", values);
      let token = response.data.token;
      let role = response.data.role;
      localStorage.setItem("token", token);
      console.log(response.data);
      dispatch(login(response.data));
      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else if (role === "ROLE_MANAGER") {
        navigate("/manager");
      } else if (role === "ROLE_STAFF") {
        navigate("/staff");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Login failed",
            description: "Incorrect username or password. Please try again",
          });
        }
      }
    }
  };

  useEffect(() => {
    document.title = "Login";
  });

  return (
    <div className="Login">
      <div className="LoginPage">
        <div className="login__header">
          <img src="./images/Logo.png" alt="Logo" />
          <h2>JEWELRYMS</h2>
        </div>

        <div className="login__form">
          <div className="login__form__left">
            <h3 className="login__form__left__welcome__1">WELCOME BACK </h3>
            <h5 className="login__form__left__welcome__2">Select method to log in</h5>
            <Form className="login__form__left__form" form={formVariable} onFinish={handleFinish}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input username",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input password",
                  },
                ]}
              >
                <Input prefix={<LockOutlined />} placeholder="Password" type="password" />
              </Form.Item>

              <Link className="login__form__left__forgotpass" to="/resetPassword">
                Forgot password?
              </Link>

              <Form.Item>
                <Button type="primary" className="login__form__left__buttonLogin" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
            <p className="login__form__left__email">Or login with Google</p>
            <button className="login__form__left__google">
              <img src="../public/images/google.png" alt="Google" />
              <p>Google</p>
            </button>
          </div>
          <div className="login__form__right">
            <img src="./images/Login.jpg" alt="Login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
