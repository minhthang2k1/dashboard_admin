import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";

import styles from "./Table.module.scss";
import { getUsers, deleteUser } from "~/store/actions";
import { BASE_URL_AUTH } from "~/util/api";
import { postLogin } from "../../store/actions";
import Delete from "../DeleteBtn";

const cx = classNames.bind(styles);

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = axios.create();

  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [userList, setUserList] = useState(null);

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post(`${BASE_URL_AUTH}/refresh`, {
  //       withCredentials: true,
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setUserList(users);
  }, [users]);
  console.log(userList);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    dispatch(getUsers(dispatch));
  }, [dispatch, user?.accessToken]);

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let date = new Date();
  //     const decodedToken = jwt_decode(user?.accessToken);
  //     if (decodedToken.exp < date.getTime() / 1000) {
  //       const data = await refreshToken();
  //       const refreshUser = {
  //         ...user,
  //         accessToken: data.accessToken,
  //       };
  //       dispatch(postLogin(refreshUser, navigate));
  //       config.headers["token"] = "Bearer " + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    const updatedUsers = users.filter((user) => user.id !== id);
    setUserList(updatedUsers);
    dispatch(getUsers(dispatch));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={cx("table-data")}>
      <div className={cx("order")}>
        <div className={cx("head")}>
          <h3>User List</h3>
          <FontAwesomeIcon icon={faSearch} className={cx("bx", "bx-search")} />
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList?.slice(startIndex, endIndex).map((user, index) => (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>
                  <p>{user.username}</p>
                </td>
                <td>{user.email}</td>
                <td>{user.isAdmin === false ? "user" : "admin"}</td>
                <td>{`${new Date(user.createdAt).toLocaleDateString()}`}</td>
                {localStorage.getItem("isAdmin") === "true" ? (
                  <td onClick={() => handleDelete(user._id)}>
                    <Delete />
                  </td>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          total={userList?.length}
          current={currentPage}
          pageSize={usersPerPage}
          onChange={handlePageChange}
          showSizeChanger
          onShowSizeChange={(current, size) => setUsersPerPage(size)}
        />
      </div>
    </div>
  );
};

export default Table;
