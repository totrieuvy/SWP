import React, { Children, useEffect } from "react";
import { Button, Form, Input, notification } from "antd";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";

function Login() {
  const [formVariable] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFinish = async (values) => {
    try {
      const response = await api.post("/api/account/login", values);
      let token = response.data.token;
      let role = response.data.role;
      localStorage.setItem("token", token);
      console.log(response);
      console.log(response.data);
      dispatch(login(response.data));
      if (role === "ROLE_ADMIN") {
        notification.success({
          message: "Thành công",
          description: "Đăng nhập thành công",
        });
        navigate("/admin");
      } else if (role === "ROLE_MANAGER") {
        notification.success({
          message: "Thành công",
          description: "Đăng nhập thành công",
        });
        navigate("/manager");
      } else if (role === "ROLE_STAFF") {
        notification.success({
          message: "Thành công",
          description: "Đăng nhập thành công",
        });
        navigate("/staff");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Đăng nhập thất bại",
            description: "Sai tên đăng nhập hoặc mật khẩu. Hãy thử lại!",
          });
        }
      }
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLoginGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);

        const response = await api.post("/api/account/loginGG", {
          token: result.user.accessToken,
        });
        console.log(response);
        let token = response.data.token;
        let role = response.data.role;
        localStorage.setItem("token", token);
        console.log(response);
        console.log(response.data);
        dispatch(login(response.data));
        if (role === "ROLE_ADMIN") {
          notification.success({
            message: "Thành công",
            description: "Đăng nhập thành công",
          });
          navigate("/admin");
        } else if (role === "ROLE_MANAGER") {
          notification.success({
            message: "Thành công",
            description: "Đăng nhập thành công",
          });
          navigate("/manager");
        } else if (role === "ROLE_STAFF") {
          notification.success({
            message: "Thành công",
            description: "Đăng nhập thành công",
          });
          navigate("/staff");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <h5 className="login__form__left__welcome__2">
              Select method to log in
            </h5>
            <Form
              className="login__form__left__form"
              form={formVariable}
              onFinish={handleFinish}
            >
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
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  type="password"
                />
              </Form.Item>

              <Link
                className="login__form__left__forgotpass"
                to="/resetPassword"
              >
                Forgot password?
              </Link>

              <Form.Item>
                <Button
                  type="primary"
                  className="login__form__left__buttonLogin"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <p className="login__form__left__email">Or login with Google</p>
            <button
              className="login__form__left__google"
              onClick={handleLoginGoogle}
            >
              <img src="/images/google.png" alt="Google" />
              <p>Google</p>
            </button>
          </div>
          <div className="login__form__right">{/* <img src="/images/login.jpg" alt="Login" /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
