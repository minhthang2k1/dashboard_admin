import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Content.module.scss";
import Table from "../Table";
import Profile from "../Profile";
import Home from "../Home";

const cx = classNames.bind(styles);

const Content = () => {
  const options = {
    "": Home,
    profile: Profile,
    table: Table,
  };

  const textOptions = {
    "": "Home",
    profile: "Profile",
    table: "Table",
  };

  let option = window.location.href.slice(22);
  let Page = options[option];

  return (
    <main>
      <div className={cx("head-title")}>
        <div className={cx("left")}>
          <h1>Dashboard</h1>
          <ul className={cx("breadcrumb")}>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={cx("bx", "bx-chevron-right")}
              />
            </li>
            <li>
              <Link className={cx("active")} to="/">
                {textOptions[option] || "Home"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Page />
    </main>
  );
};

export default Content;
