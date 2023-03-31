import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination, Modal } from "antd";
import axios from "axios";

import styles from "./Table.module.scss";
import { getUsers, deleteUser } from "~/store/actions";

import Delete from "../DeleteBtn";

const cx = classNames.bind(styles);

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = axios.create();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    users && setUserList(users);
    if (userList) {
      console.log(userList);
      const slicedUserList = userList?.slice(startIndex, endIndex);
      setSliceUserList(slicedUserList);
    } else {
      setSliceUserList([]);
    }
  }, [users]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    dispatch(getUsers(dispatch));
  }, [dispatch, user?.accessToken]);

  const handleDelete = (id) => {
    setIsModalVisible(true);
    setUserId(id);
  };

  const handleOk = () => {
    dispatch(deleteUser(userId));
    const updatedUsers = sliceUserList?.filter((user) => user._id !== userId);
    setUserList(updatedUsers);
    dispatch(getUsers());
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [sliceUserList, setSliceUserList] = useState([]);

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
            {sliceUserList?.map((user, index) => (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>
                  <p>{user.username}</p>
                </td>
                <td>{user.email}</td>
                <td>{user.isAdmin === false ? "user" : "admin"}</td>
                <td>{`${new Date(user.createdAt).toLocaleDateString()}`}</td>
                {localStorage.getItem("isAdmin") === "true" ? (
                  <td>
                    <Delete handleDelete={() => handleDelete(user._id)} />
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
        <Modal
          title="Delete User"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>
      </div>
    </div>
  );
};

export default Table;
