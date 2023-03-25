import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrin,
  faHouse,
  faAddressCard,
  faTable,
  faGear,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Layout, Menu } from "antd";
import classNames from "classnames/bind";

import styles from "./Sidebar.module.scss";
import Content from "../Content";
import { useDispatch, useSelector } from "react-redux";
import { postLogout } from "../../store/actions";

const { Sider } = Layout;
const { Item } = Menu;

const cx = classNames.bind(styles);

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = useLocation();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const user = useSelector((state) => state.auth.user);

  const handleLogout = (id) => {
    dispatch(postLogout(id));
    navigate("/login");
  };

  return (
    <>
      <Sider
        collapsible
        onCollapse={onCollapse}
        collapsed={collapsed}
        width={280}
        className={cx("sidebar")}
      >
        <Link to="/" className={cx("brand")}>
          <FontAwesomeIcon icon={faFaceGrin} className={cx("bx")} />
          {!collapsed && <span className={cx("text")}>AdminHub</span>}
        </Link>

        <Menu mode="inline" defaultSelectedKeys={[pathname.replace("/", "")]}>
          <Item
            key="dashboard"
            icon={<FontAwesomeIcon icon={faHouse} className={cx("bx")} />}
          >
            <Link to="/">Dashboard</Link>
          </Item>
          <Item
            key="profile"
            icon={<FontAwesomeIcon icon={faAddressCard} className={cx("bx")} />}
          >
            <Link to="/profile">Profile</Link>
          </Item>
          <Item
            key="table"
            icon={<FontAwesomeIcon icon={faTable} className={cx("bx")} />}
          >
            <Link to="/table">Table</Link>
          </Item>
        </Menu>

        <Menu mode="inline" style={{ marginTop: "32px" }}>
          <Item
            key="logout"
            icon={
              <FontAwesomeIcon icon={faRightToBracket} className={cx("bx")} />
            }
            className={cx("logout")}
          >
            <Link to="/login" onClick={() => handleLogout(user?._id)}>
              Logout
            </Link>
          </Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Sidebar;
