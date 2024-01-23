import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/cutomers/customerSlice";
import { getOrderByUser, getUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
const { Search } = Input;
const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Id order",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
];

const OrdersUser = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUsers());
  }, []);

  const [userOrders, setUserOrders] = useState({});

  const customerstate = useSelector((state) => state.customer.customers);

  const fetchUserOrders = async () => {
    try {
      for (const user of customerstate) {
        if (user._id) {
          const response = await dispatch(getOrderByUser(user._id));
          const orderData = response.payload;

          setUserOrders((prev) => ({
            ...prev,
            [user._id]: orderData,
          }));
        } else {
          setUserOrders((prev) => ({
            ...prev,
            [user._id]: null,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching user orders", error);
    }
  };

  useEffect(() => {
    if (customerstate.length > 0) {
      fetchUserOrders();
    }
  }, [customerstate, dispatch]);

  const data = customerstate.map((customer) => ({
    key: customer._id,
    idCustomer: customer._id,
    name: customer.fullname,
    address: customer.address,
    phone: customer.phone,
  }));
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredData = data.filter((customer) =>
    customer.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const expandedRowRender = (record) => {
    const formattedDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };
    const orders = userOrders[record.idCustomer] || [];
    const nestedTableColumns = [
      {
        title: "Id order",
        dataIndex: "id",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => text || "N/A",
      },
      {
        title: "Món ăn",
        dataIndex: "product",
        key: "product",
        render: (text) => text || "N/A",
      },
      { title: "Trạng thái", dataIndex: "orderStatus" },
      {
        title: "Tổng tiền",
        dataIndex: "amount",
        key: "amount",
        render: (text) => text || "N/A",
      },
    ];
    const orderData = orders.map((order) => ({
      id: order.orderId || "N/A",
      createdAt: formattedDate(order.createdAt) || "N/A",
      product: <Link to={`/admin/order/${order.orderId}`}>Xem chi tiết</Link>,
      orderStatus: order.orderStatus,
      amount: `${order.paymentIntent?.amount.toFixed(1)}00 VNĐ` || "N/A",
    }));

    return (
      <Table
        columns={nestedTableColumns}
        dataSource={orderData}
        pagination={false}
      />
    );
  };

  return (
    <div>
      <h3 className="mb-4 title">Đơn hàng chi tiết</h3>
      <div style={{ marginBottom: "16px", textAlign: "right" }}>
        <Search
          placeholder="Tìm kiếm theo tên"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={filteredData}
      />
    </div>
  );
};

export default OrdersUser;
