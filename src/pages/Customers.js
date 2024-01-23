import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/cutomers/customerSlice";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
  },
  {
    title: "Số điện thoại",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (
      customerstate[i].role !== "admin" &&
      customerstate[i].role !== "employee"
    ) {
      data1.push({
        key: i + 1,
        name: customerstate[i].fullname,
        email: customerstate[i].email,
        address: customerstate[i].address,
        mobile: customerstate[i].phone,
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Khách hàng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
