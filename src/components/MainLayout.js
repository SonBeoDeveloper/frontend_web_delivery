import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import {
  FaClipboardList,
  FaUser,
  FaPenNib,
  FaUserPlus,
  FaUserFriends,
} from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../features/auth/authSlice";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const userState = useSelector((state) => state.auth.admin);

  const handleMenuClick = ({ key }) => {
    if (key === "signout") {
      dispatch(logout());
      navigate("");
    } else {
      navigate(key);
    }
  };

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">TA</span>
            <span className="lg-logo">NH. Thiên Anh</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="" icon={<AiOutlineDashboard className="fs-4" />}>
            Trang chủ
          </Menu.Item>

          <Menu.Item key="customers" icon={<FaUserFriends className="fs-4" />}>
            Khách hàng
          </Menu.Item>
          <Menu.Item key="Employee" icon={<FaUserFriends className="fs-4" />}>
            Nhân viên
          </Menu.Item>
          {(userState.role === "admin" || userState.role === "employee") && (
            <Menu.SubMenu
              key="Catalog"
              icon={<AiOutlineShoppingCart className="fs-4" />}
              title="Danh mục"
            >
              {userState.role === "admin" && (
                <Menu.Item
                  key="product"
                  icon={<AiOutlineShoppingCart className="fs-4" />}
                >
                  Tạo món ăn
                </Menu.Item>
              )}
              {(userState.role === "admin" ||
                userState.role === "employee") && (
                <Menu.Item
                  key="list-product"
                  icon={<AiOutlineShoppingCart className="fs-4" />}
                >
                  Danh sách món ăn
                </Menu.Item>
              )}
              {userState.role === "admin" && (
                <Menu.Item
                  key="category"
                  icon={<BiCategoryAlt className="fs-4" />}
                >
                  Tạo danh mục
                </Menu.Item>
              )}
              {(userState.role === "admin" ||
                userState.role === "employee") && (
                <Menu.Item
                  key="list-category"
                  icon={<BiCategoryAlt className="fs-4" />}
                >
                  Các danh mục
                </Menu.Item>
              )}
            </Menu.SubMenu>
          )}

          <Menu.Item key="order" icon={<FaClipboardList className="fs-4" />}>
            Xem đơn hàng chi tiết
          </Menu.Item>
          <Menu.Item key="orders" icon={<FaClipboardList className="fs-4" />}>
            Đơn hàng
          </Menu.Item>
          {userState.role === "admin" && (
            <Menu.SubMenu
              key="marketing"
              icon={<RiCouponLine className="fs-4" />}
              title="Marketing"
            >
              <Menu.Item key="coupon" icon={<ImBlog className="fs-4" />}>
                Tạo phiếu giảm giá
              </Menu.Item>
              <Menu.Item
                key="coupon-list"
                icon={<RiCouponLine className="fs-4" />}
              >
                Phiếu giảm giá
              </Menu.Item>
            </Menu.SubMenu>
          )}

          {/* <Menu.SubMenu
            key="blogs"
            icon={<FaBloggerB className="fs-4" />}
            title="Blogs"
          >
            <Menu.Item key="blog" icon={<ImBlog className="fs-4" />}>
              Add Blog
            </Menu.Item>
            <Menu.Item key="blog-list" icon={<FaBloggerB className="fs-4" />}>
              Blog List
            </Menu.Item>
            <Menu.Item key="blog-category" icon={<ImBlog className="fs-4" />}>
              Add Blog Category
            </Menu.Item>
            <Menu.Item
              key="blog-category-list"
              icon={<FaBloggerB className="fs-4" />}
            >
              Blog Category List
            </Menu.Item>
          </Menu.SubMenu> */}

          <Menu.Item key="profile" icon={<FaUser className="fs-4" />}>
            Thông tin cá nhân
          </Menu.Item>
          <Menu.Item key="information" icon={<FaPenNib className="fs-4" />}>
            Giới thiệu
          </Menu.Item>

          {userState.role === "admin" && (
            <Menu.Item key="signup" icon={<FaUserPlus className="fs-4" />}>
              Đăng ký
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout" onContextMenu={(e) => e.preventDefault()}>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://th.bing.com/th/id/OIP.5pb9_9G36asxo-lGC1evygHaHa?pid=ImgDet&rs=1"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{userState.fullname}</h5>
                <p className="mb-0">{userState.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/profile"
                  >
                    Xem thông tin
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                    onClick={handleMenuClick}
                  >
                    Thoát
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
