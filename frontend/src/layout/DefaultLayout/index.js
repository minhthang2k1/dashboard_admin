import React from "react";
import classNames from "classnames/bind";

import styles from "./DefaultLayout.module.scss";
import Sidebar from "~/components/Sidebar";
import Main from "../../components/Main";

const cx = classNames.bind(styles);

const DefaultLayout = () => {
  return (
    <div className={cx("wrapper")}>
      <Sidebar className={cx("sidebar")} />
      <div className={cx("content")}>
        <Main />
      </div>
    </div>
  );
};

export default DefaultLayout;
