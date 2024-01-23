import React, { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteAProduct,
  exportProductsAction,
} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { SearchOutlined, FileTextOutlined } from "@ant-design/icons";
import CustomModal from "../components/CustomModal";
const { Search } = Input;

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const [productName, setProductName] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const userRole = useSelector((state) => state.auth.admin.role);
  const isEmployee = userRole === "employee";
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchedColumn(dataIndex);
    setSearchText(selectedKeys[0]);
  };
  const handleDownloadClick = () => {
    dispatch(exportProductsAction());
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
    const selectedProduct = productState.find((product) => product._id === e);
    if (selectedProduct) {
      setProductName(selectedProduct.name); // Cập nhật tên sản phẩm
    }
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      name: productState[i].name,
      images: (
        <img
          src={productState[i].images}
          alt={`Ảnh sản phẩm ${productState[i].name}`}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ),
      description: productState[i].description,
      category: productState[i].category.name,
      price: productState[i].price,
      ...(isEmployee
        ? {}
        : {
            action: (
              <>
                <Link
                  to={`/admin/product/${productState[i]._id}`}
                  className=" fs-3 text-danger"
                >
                  <BiEdit />
                </Link>
                <button
                  className="ms-3 fs-3 text-danger bg-transparent border-0"
                  onClick={() => showModal(productState[i]._id)}
                >
                  <AiFillDelete />
                </button>
              </>
            ),
          }),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
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
      width: 150,
      sorter: (a, b) => a.name.length - b.name.length,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Search
            placeholder="Tìm kiếm theo tên"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
        </div>
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      render: (text) => text,
    },
    {
      title: "Ảnh",
      dataIndex: "images",
    },
    {
      title: "Tiêu đề",
      dataIndex: "description",
      width: 250,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },

    {
      title: "Giá (VNĐ)",
      dataIndex: "price",
      sorter: (a, b) => b.price - a.price,
      render: (text, record) => `${record.price.toFixed(1)}00 VNĐ`,
    },
    ...(isEmployee
      ? []
      : [{ title: "Action", dataIndex: "action", width: 120 }]),
  ];

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
        <h3 className="mb-4 title">Món ăn</h3>
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
        <Table
          columns={columns.map((col) => {
            if (col.dataIndex === "name") {
              return {
                ...col,
                onFilter: (value, record) =>
                  record[col.dataIndex]
                    ? record[col.dataIndex]
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    : "",
                filterDropdown: ({
                  setSelectedKeys,
                  selectedKeys,
                  confirm,
                  clearFilters,
                }) => (
                  <div style={{ padding: 8 }}>
                    <Input
                      placeholder="Tìm kiếm theo tên"
                      value={selectedKeys[0]}
                      onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                      }
                      onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, col.dataIndex)
                      }
                      style={{ width: 188, marginBottom: 8, display: "block" }}
                    />
                    <Button
                      type="primary"
                      onClick={() =>
                        handleSearch(selectedKeys, confirm, col.dataIndex)
                      }
                      icon={<SearchOutlined />}
                      size="small"
                      style={{ width: 90, marginRight: 8 }}
                    >
                      Tìm
                    </Button>
                    <Button
                      onClick={() => handleReset(clearFilters)}
                      size="small"
                      style={{ width: 90 }}
                    >
                      Reset
                    </Button>
                  </div>
                ),
                filterIcon: (filtered) => (
                  <SearchOutlined
                    style={{ color: filtered ? "#1890ff" : undefined }}
                  />
                ),
                onFilterDropdownVisibleChange: (visible) => {
                  if (visible) {
                    setTimeout(() => this.searchInput.select(), 100);
                  }
                },
              };
            }
            return col;
          })}
          dataSource={data1}
        />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title={`Bạn có chắc muốn xóa sản phẩm "${productName}" không?`}
      />
    </div>
  );
};

export default Productlist;
