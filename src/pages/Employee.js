import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteEmployee } from "../features/cutomers/customerSlice";

const Employee = () => {
  const [open, setOpen] = useState(false);
  const [employee, setemployeeId] = useState("");
  const userRole = useSelector((state) => state.auth.admin.role);
  const isEmployee = userRole === "employee";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const showModal = (e) => {
    setOpen(true);
    setemployeeId(e);
  };
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin" && customerstate[i].role !== "user") {
      data1.push({
        key: i + 1,
        name: customerstate[i].fullname,
        email: customerstate[i].email,
        address: customerstate[i].address,
        mobile: customerstate[i].phone,
        ...(isEmployee
          ? {}
          : {
              action: (
                <>
                  <button
                    className="ms-3 fs-3 text-danger bg-transparent border-0 "
                    onClick={() => showModal(customerstate[i]._id)}
                  >
                    <AiFillDelete />
                  </button>
                </>
              ),
            }),
      });
    }
  }
  const hideModal = () => {
    setOpen(false);
  };
  const Delete = (e) => {
    dispatch(deleteEmployee(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
    }, 100);
  };
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
    ...(isEmployee
      ? []
      : [{ title: "Action", dataIndex: "action", width: 120 }]),
  ];
  return (
    <div>
      <h3 className="mb-4 title">Nhân viên</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          Delete(employee);
        }}
        title="Bạn có chắc muốn xóa nhân viên này?"
      />
    </div>
  );
};

export default Employee;
