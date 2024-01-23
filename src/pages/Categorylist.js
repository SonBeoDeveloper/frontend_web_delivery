import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };
  const userRole = useSelector((state) => state.auth.admin.role);
  const isEmployee = userRole === "employee";
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const pCatStat = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatStat[i].name,
      image: (
        <img
          src={pCatStat[i].image}
          alt={`Ảnh danh mục ${pCatStat[i].name}`}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ),
      ...(isEmployee
        ? {}
        : {
            action: (
              <>
                <Link
                  to={`/admin/category/${pCatStat[i]._id}`}
                  className=" fs-3 text-danger"
                >
                  <BiEdit />
                </Link>
                <button
                  className="ms-3 fs-3 text-danger bg-transparent border-0"
                  onClick={() => showModal(pCatStat[i]._id)}
                >
                  <AiFillDelete />
                </button>
              </>
            ),
          }),
    });
  }
  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
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
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
    },
    ...(isEmployee ? [] : [{ title: "Action", dataIndex: "action" }]),
  ];
  return (
    <div>
      <h3 className="mb-4 title">Danh mục</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(pCatId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default Categorylist;
