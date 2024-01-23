import React, { useEffect, useState } from "react";
import { Table, DatePicker, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/cutomers/customerSlice";
import { getOrders } from "../features/auth/authSlice";
import moment from "moment";
import { AiFillFileText } from "react-icons/ai";
import { exportOrdersAction } from "../features/product/productSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Id Order",
    dataIndex: "id",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
  },
  {
    title: "Trạng thái đơn hàng",
    dataIndex: "status",
  },
  {
    title: "Hóa đơn",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
    render: (text, record) => `${record.amount.toFixed(1)}00 VNĐ`,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
  },
  {
    title: "Số điện thoại",
    dataIndex: "mobile",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    sorter: (a, b) =>
      moment(a.createdAt, "DD-MM-YYYY").unix() -
      moment(b.createdAt, "DD-MM-YYYY").unix(),
    defaultSortOrder: "descend",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getOrders());
  }, [dispatch]);
  const orderstate = useSelector((state) => state.auth.orders);
  const handleDownloadClick = (orderId) => {
    dispatch(exportOrdersAction(orderId));
  };
  const data1 = [];
  for (let i = 0; i < orderstate.length; i++) {
    const order = orderstate[i]; // Lưu trữ thông tin đơn hàng tại vị trí i
    const createdAt = moment(order.createdAt).format("DD-MM-YYYY");
    if (
      order.orderBy &&
      order.orderBy.role !== "admin" &&
      order.orderBy.role !== "employee"
    ) {
      data1.push({
        key: i + 1,
        id: order._id,
        name: order.orderBy.fullname,
        status: order.orderStatus,
        amount: order.paymentIntent.amount,
        address: order.orderBy.address,
        mobile: order.orderBy.phone,
        createdAt: createdAt,
        action: (
          <>
            <button
              className="ms-3 fs-3 bg-transparent border-0"
              onClick={() => handleDownloadClick(order._id)}
            >
              <AiFillFileText />
            </button>
          </>
        ),
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Đơn hàng</h3>

      <Table columns={columns} dataSource={data1} />
    </div>
  );
};

export default Orders;
