import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getUserById, postLogin, updateUser } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { headers } from "~/util/headers";
import { BASE_URL_USER } from "~/util/api";

const { Meta } = Card;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = window.localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleDelete = () => {
    // TODO: handle delete user
    message.success("User deleted");
  };

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleUpdate = (values) => {
    dispatch(updateUser(currentUser?._id, values));
    message.success("User updated");
    const usr = { ...currentUser, ...values };
    setCurrentUser(usr);
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
          title={currentUser?.username?.toUpperCase()}
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
          onFinish={handleUpdate}
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
