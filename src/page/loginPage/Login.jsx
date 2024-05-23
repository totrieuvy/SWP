import { Button, Form, Input } from "antd";
import "./Login.scss";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function Login() {
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
            <Form className="login__form__left__form">
              <Form.Item name="username">
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item name="password">
                <Input prefix={<LockOutlined />} placeholder="Password" type="password" />
              </Form.Item>

              <Link className="login__form__left__forgotpass">Forgot password?</Link>

              <Form.Item>
                <Button type="primary" className="login__form__left__buttonLogin">
                  Login
                </Button>
              </Form.Item>
            </Form>
            <p className="login__form__left__email">Or login with Google</p>
            <button className="login__form__left__google">
              <img src="./images/google.png" alt="Google" />
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
