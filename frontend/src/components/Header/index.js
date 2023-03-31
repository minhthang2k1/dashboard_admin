import React from "react";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faCalendarDay,
  faLifeRing,
  faArrowRightFromBracket,
  faSearch,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

import images from "~/assets/images";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { postLogout } from "../../store/actions";

const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user);

  function handleOptions() {
    const showOptions = document.querySelector(".Header_dropdown-menu__7Ug8Y");
    showOptions.style.display === "block"
      ? (showOptions.style.display = "none")
      : (showOptions.style.display = "block");
  }

  const handleLogout = (id) => {
    dispatch(postLogout(id));
    navigate("/login");
  };

  return (
    <nav>
      <form
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className={cx("form-input")}>
          <input type="search" placeholder="Search..." />
          <button type="submit" className={cx("search-btn")}>
            <FontAwesomeIcon
              icon={faSearch}
              className={cx("bx", "bx-search")}
            />
          </button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode" className={cx("switch-mode")}></label>
      <Link to="" className={cx("notification")}>
        <FontAwesomeIcon icon={faBell} className={cx("bx", "bxs-bell")} />
        <span className={cx("num")}>8</span>
      </Link>
      <ul className={cx("actions")} onClick={handleOptions}>
        <li className={cx("nav-item", "dropdown")}>
          <Link className={cx("nav-link")}>
            <div className={cx("media")}>
              <span className={cx("avatar")}>
                <img src={images.avatar} alt="avatar" />
              </span>
              <div className={cx("username")}>
                <span> Hi, {user?.username}</span>
              </div>
            </div>
          </Link>
          <div
            tabIndex={-1}
            className={cx("dropdown-menu")}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={cx("dropdown-header")} tabIndex={-1}>
              <h6>WELCOME!</h6>
            </div>
            <Link tabIndex={0} className={cx("dropdown-item")}>
              <FontAwesomeIcon icon={faUser} className={cx("dropdown-icon")} />
              <span>My profile</span>
            </Link>
            <Link tabIndex={0} className={cx("dropdown-item")}>
              <FontAwesomeIcon icon={faGear} className={cx("dropdown-icon")} />
              <span>Settings</span>
            </Link>
            <Link tabIndex={0} className={cx("dropdown-item")}>
              <FontAwesomeIcon
                icon={faCalendarDay}
                className={cx("dropdown-icon")}
              />
              <span>Activity</span>
            </Link>
            <Link tabIndex={0} className={cx("dropdown-item")}>
              <FontAwesomeIcon
                icon={faLifeRing}
                className={cx("dropdown-icon")}
              />
              <span>Support</span>
            </Link>
            <div tabIndex={-1} className={cx("dropdown-driver")}></div>
            <Link
              tabIndex={0}
              to="/login"
              className={cx("dropdown-item")}
              onClick={() => handleLogout(user?._id)}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={cx("dropdown-icon")}
              />
              <span>Logout</span>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
