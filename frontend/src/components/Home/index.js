import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, DatePicker, Select } from "antd";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const { Option } = Select;

const Home = () => {
  const [selectedRange, setSelectedRange] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const userList = useSelector((state) => state.user.users);
  console.log(userList);

  // Lọc user theo khoảng thời gian và người dùng
  const filteredUserList = userList.filter((user) => {
    const createdAt = moment(user.createdAt);
    return (
      (!selectedRange.length ||
        (createdAt.isSameOrAfter(selectedRange[0], "day") &&
          createdAt.isSameOrBefore(selectedRange[1], "day"))) &&
      (!selectedUser || user.id === selectedUser)
    );
  });

  // Đếm số user theo ngày để vẽ biểu đồ
  const countUserByDay = () => {
    const result = {};
    filteredUserList.forEach((user) => {
      const date = moment(user.createdAt).startOf("day").format("yyyy-MM-DD");
      result[date] = result[date] ? result[date] + 1 : 1;
    });
    return Object.keys(result).map((date) => ({
      date,
      count: result[date],
    }));
  };

  // Đếm số user theo tuần để vẽ biểu đồ
  const countUserByWeek = () => {
    const result = {};
    filteredUserList.forEach((user) => {
      const week = moment(user.createdAt).startOf("week").format("yyyy-ww");
      result[week] = result[week] ? result[week] + 1 : 1;
    });
    return Object.keys(result).map((week) => ({
      week,
      count: result[week],
    }));
  };

  // Đếm số user theo tháng để vẽ biểu đồ
  const countUserByMonth = () => {
    const result = {};
    filteredUserList.forEach((user) => {
      const month = moment(user.createdAt).startOf("month").format("yyyy-MM");
      result[month] = result[month] ? result[month] + 1 : 1;
    });
    return Object.keys(result).map((month) => ({
      month,
      count: result[month],
    }));
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <Card title="Thống kê theo ngày">
            <DatePicker.RangePicker
              allowClear={false}
              value={selectedRange}
              onChange={(value) => setSelectedRange(value)}
            />
            <Select
              style={{ width: "100%" }}
              placeholder="Chọn người dùng"
              allowClear
              value={selectedUser}
              onChange={(value) => setSelectedUser(value)}
            >
              {userList.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username}
                </Option>
              ))}
            </Select>
            <LineChart
              width={300}
              height={200}
              data={countUserByDay()}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card title="Thống kê theo tuần">
            <DatePicker.RangePicker
              allowClear={false}
              value={selectedRange}
              onChange={(value) => setSelectedRange(value)}
            />
            <Select
              style={{ width: "100%" }}
              placeholder="Chọn người dùng"
              allowClear
              value={selectedUser}
              onChange={(value) => setSelectedUser(value)}
            >
              {userList.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username}
                </Option>
              ))}
            </Select>
            <BarChart
              width={300}
              height={200}
              data={countUserByWeek()}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis dataKey="week" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card title="Thống kê theo tháng">
            <DatePicker.MonthPicker
              allowClear={false}
              value={moment(selectedRange[0])}
              onChange={(value) =>
                setSelectedRange([value.startOf("month"), value.endOf("month")])
              }
            />
            <Select
              style={{ width: "100%" }}
              placeholder="Chọn người dùng"
              allowClear
              value={selectedUser}
              onChange={(value) => setSelectedUser(value)}
            >
              {userList.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username}
                </Option>
              ))}
            </Select>
            <BarChart
              width={300}
              height={200}
              data={countUserByMonth()}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
