import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch } from "react-redux";

import images from "~/assets/images";

import styles from "./Register.module.scss";
import { postRegister } from "~/store/actions";

const cx = classNames.bind(styles);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    const newUser = {
      password: password,
      username: username,
      email: email,
    };

    dispatch(postRegister(newUser, navigate));
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
            onFinish={handleRegister}
          >
            <span className={cx("title")}>Register</span>
            <Form.Item
              height={1000}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Type your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
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
                <button className={cx("btn-login")} type="submit">
                  register
                </button>
              </div>
            </div>
            <div className={cx("sign-in")}>
              <Link to="/login">Sign in</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
