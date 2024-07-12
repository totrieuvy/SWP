import React, { Children, useEffect, useState } from "react";
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

const ATTEMPT_LIMIT = 10;
const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
function Login() {
  const [formVariable] = useForm();
  const [attempts, setAttempts] = useState(0);
  const [lockoutEndTime, setLockoutEndTime] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFinish = async (values) => {
    try {
      const response = await api.post("/api/account/login", values);
      let token = response.data.token;
      let role = response.data.role;
      let id = response.data.id;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
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
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          localStorage.setItem("loginAttempts", newAttempts);

          if (newAttempts >= ATTEMPT_LIMIT) {
            const lockoutEnd = Date.now() + LOCKOUT_TIME;
            setLockoutEndTime(lockoutEnd);
            localStorage.setItem("lockoutEndTime", lockoutEnd);
            notification.error({
              message: "Đã bị khóa",
              description: "Quá nhiều lần thử. Hãy thử lại sau.",
            });
          } else {
            notification.error({
              message: "Đăng nhập thất bại",
              description: "Sai tên đăng nhập hoặc mật khẩu. Hãy thử lại!",
            });
          }
        }
      }
    }
  };
  useEffect(() => {
    document.title = "Đăng nhập";
    const storedAttempts = parseInt(localStorage.getItem("loginAttempts")) || 0;
    const storedLockoutEnd =
      parseInt(localStorage.getItem("lockoutEndTime")) || null;

    setAttempts(storedAttempts);
    setLockoutEndTime(storedLockoutEnd);

    if (storedLockoutEnd && storedLockoutEnd > Date.now()) {
      const remainingTime = storedLockoutEnd - Date.now();
      setTimeout(() => {
        setAttempts(0);
        setLockoutEndTime(null);
        localStorage.removeItem("loginAttempts");
        localStorage.removeItem("lockoutEndTime");
      }, remainingTime);
    }
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
        let id = response.data.role;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", id);

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
  const isLockedOut = lockoutEndTime && lockoutEndTime > Date.now();

  return (
    <div className="Login">
      <div className="LoginPage">
        <div className="login__header">
          <img src="./images/Logo.png" alt="Logo" />
          <h2>JEWELRYMS</h2>
        </div>

        <div className="login__form">
          <div className="login__form__left">
            <h3 className="login__form__left__welcome__1">
              Chào mừng đã trở lại{" "}
            </h3>
            <h5 className="login__form__left__welcome__2">
              Chọn cách thức đăng nhập
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
                    message: "Bắt buộc nhập tên đăng nhập",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "PBắt buộc nhập mật khẩu",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  type="password"
                />
              </Form.Item>

              <Link
                className="login__form__left__forgotpass"
                to="/resetPassword"
              >
                Quên mật khẩu?
              </Link>

              <Form.Item>
                <Button
                  type="primary"
                  disabled={isLockedOut}
                  className="login__form__left__buttonLogin"
                  htmlType="submit"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <p className="login__form__left__email">
              Hoặc đăng nhập bằng tài khoản Google
            </p>
            <button
              disabled={isLockedOut}
              className="login__form__left__google"
              onClick={handleLoginGoogle}
            >
              <img src="/images/google.png" alt="Google" />
              <p>Google</p>
            </button>
          </div>
          <div className="login__form__right">
            {/* <img src="/images/login.jpg" alt="Login" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
