import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postLogin } from "~/store/actions";

import images from "~/assets/images";

import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    // e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    dispatch(postLogin(user, navigate));
  };
  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("container")}
        style={{ backgroundImage: `url(${images.background})` }}
      >
        <div className={cx("content")}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
          >
            <span className={cx("title")}>Login</span>
            <Form.Item
              height={1000}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Type your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Type your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <div className={cx("container-login")}>
              <div className={cx("wrap-login")}>
                <div className={cx("bg-btn-login")}></div>
                <button className={cx("btn-login")}>Login</button>
              </div>
            </div>
            <div className={cx("sign-up")}>
              <span>Or Sign Up Using</span>
              <Link to="/register">Sign Up</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
