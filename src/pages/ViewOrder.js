import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getOrderById } from "../features/auth/authSlice";
import { FileTextOutlined } from "@ant-design/icons";
import { exportOrdersAction } from "../features/product/productSlice";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên món",
    dataIndex: "name",
  },
  {
    title: "Ảnh",
    dataIndex: "images",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
  },
  {
    title: "Giá",
    dataIndex: "amount",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderById(userId));
  }, [dispatch, userId]);
  const handleDownloadClick = () => {
    dispatch(exportOrdersAction(userId));
  };
  const orderState = useSelector((state) => state.auth.orderbyId);

  const data = orderState?.products?.map((productItem, index) => ({
    key: index + 1,
    name: productItem.product.name,
    images: (
      <img
        src={productItem.product.images}
        alt={`Ảnh sản phẩm ${productItem.product.name}`}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
    count: productItem.count,
    amount: `${productItem.product.price}.000 VNĐ`,
  }));

  return (
    <div>
      <div
        class="header-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 className="mb-4 title">Xem chi tiết sản phẩm</h3>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          type="primary"
          icon={<FileTextOutlined />}
          onClick={handleDownloadClick}
        >
          Xuất excel
        </Button>
      </div>

      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;
