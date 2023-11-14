import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  console.log(userId);
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);
  const product = useSelector((state) => state.product.products);
  const orderState = useSelector((state) => state.auth.orderbyuser);
  const getProductName = (productId) => {
    const selectedProduct = product.find((p) => p._id === productId);
    return selectedProduct ? selectedProduct.name : "Product not found";
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const data = orderState.map((order, index) => ({
    key: index + 1,
    products: order.products,
    amount: `${order.paymentIntent.amount}.000 VNĐ`,
    date: formatDate(order.createdAt),
  }));
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.products.map((product) => (
            <div key={product.name}>{getProductName(product.name)}</div>
          ))}
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      render: (text, record) => (
        <span>
          {record.products.map((product) => (
            <div key={product.name}>{product.count}.000 VNĐ</div>
          ))}
        </span>
      ),
    },
    {
      title: "Tổng số tiền",
      dataIndex: "amount",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "date",
    },
  ];
  console.log("data", product);

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;
