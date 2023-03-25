import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { updateUser } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as types from "~/store/constants";
import { BASE_URL_USER } from "~/util/api";
import { headers } from "~/util/headers";

const { Meta } = Card;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setCurrentUser(user);
  }, [currentUser]);

  const handleDelete = () => {
    // TODO: handle delete user
    message.success("User deleted");
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const onFinish = (values) => {
    // TODO: handle edit user
    dispatch(updateUser(currentUser?._id, values)).then(() => {
      message.success("User updated");
      setEditing(false);
      axios
        .get(`${BASE_URL_USER}/${currentUser?._id}`, { headers })
        .then((res) => {
          dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data });
        })
        .catch((error) => {
          message.error(error.message);
        });
    });

    setCurrentUser(values);
  };

  return (
    <div style={{ width: "100%", margin: "24px auto", borderRadius: "20px" }}>
      <Card
        style={{ marginBottom: "24px" }}
        actions={[
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            key="delete"
          >
            Delete
          </Button>,
          <Button
            icon={<EditOutlined />}
            onClick={handleEdit}
            key="edit"
            disabled={editing}
          >
            Edit
          </Button>,
        ]}
      >
        <Meta
          title={currentUser?.username.toUpperCase()}
          description={`Joined: ${new Date(
            currentUser?.createdAt
          ).toLocaleDateString()}`}
        />
      </Card>
      <Card title="User Information">
        <Form
          initialValues={{
            username: currentUser?.username,
            email: currentUser?.email,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            {editing ? (
              <Input onChange={(e) => setUsername(e.target.value)} />
            ) : (
              <span style={{ fontWeight: "bold" }}>
                {currentUser?.username}
              </span>
            )}
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            {editing ? (
              <Input onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <span>{currentUser?.email}</span>
            )}
          </Form.Item>

          {editing && (
            <>
              <Divider />
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button
                  style={{ marginLeft: "8px" }}
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
