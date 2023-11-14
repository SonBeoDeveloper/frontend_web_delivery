import React, { useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Line, Bar, Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { getUsers } from "../features/cutomers/customerSlice";
import {
  AiOutlineCreditCard,
  AiOutlineUsergroupAdd,
  AiOutlineRise,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { getProducts } from "../features/product/productSlice";
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
    title: "Tổng số tiền(VNĐ)",
    dataIndex: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getUsers());
    dispatch(getProducts());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const totalAmount = orderState.reduce(
    (total, order) => total + order.paymentIntent.amount,
    0
  );
  const customerstate = useSelector((state) => state.customer.customers);
  const filteredCustomers = customerstate.filter(
    (customer) => customer.role !== "admin"
  );

  const currentDate = new Date();

  // Lấy tháng và năm của tháng này
  const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần +1 để có tháng thực tế
  const currentYear = currentDate.getFullYear();

  // Lấy tháng và năm của tháng trước
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const ordersThisMonth = orderState.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getMonth() + 1 === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  });

  const ordersLastMonth = orderState.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getMonth() + 1 === lastMonth &&
      orderDate.getFullYear() === lastYear
    );
  });
  // Tính tổng số tiền của tháng này và tháng trước
  const totalAmountThisMonth = ordersThisMonth.reduce(
    (total, order) => total + order.paymentIntent.amount,
    0
  );
  const totalAmountLastMonth = ordersLastMonth.reduce(
    (total, order) => total + order.paymentIntent.amount,
    0
  );

  // Tính chênh lệch và phần trăm chênh lệch
  const difference = totalAmountThisMonth - totalAmountLastMonth;
  const percentageDifference = (difference / totalAmountLastMonth) * 100;

  const totalCustomers = filteredCustomers.length;

  const monthlyCustomerCount = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    July: 0,
    Aug: 0,
    Sept: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  customerstate.forEach((customer) => {
    const createdAt = new Date(customer.createdAt);
    const month = createdAt.toLocaleString("en-us", { month: "short" });
    if (monthlyCustomerCount[month] !== undefined) {
      monthlyCustomerCount[month]++;
    }
  });

  // Chuyển đối tượng monthlyCustomerCount thành mảng data2
  const data2 = Object.keys(monthlyCustomerCount).map((month) => ({
    key: month,
    type: month,
    Number: monthlyCustomerCount[month],
  }));
  const config2 = {
    data: data2,
    xField: "type",
    yField: "Number",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Tháng",
      },
      Number: {
        alias: "Số lượng",
      },
    },
  };
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data2.push({
        key: i + 1,
        name: customerstate[i].fullname,
        email: customerstate[i].email,
        mobile: customerstate[i].phone,
      });
    }
  }
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderBy.fullname,
      amount: orderState[i].paymentIntent.amount,
      status: orderState[i].orderStatus,

      date: new Date(orderState[i].createdAt).toLocaleString(),
    });
  }

  const monthlyTotal = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    July: 0,
    Aug: 0,
    Sept: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  orderState.forEach((order) => {
    const createdAt = new Date(order.createdAt);
    const month = createdAt.toLocaleString("en-us", { month: "short" });
    const amount = order.paymentIntent.amount;
    monthlyTotal[month] += amount;
  });

  // Chuyển đối tượng monthlyTotal thành mảng data
  const data4 = Object.keys(monthlyTotal).map((month) => ({
    type: month,
    amount: monthlyTotal[month],
  }));
  const config = {
    data: data4,
    xField: "type",
    yField: "amount",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      amount: {
        alias: "nghìn VNĐ",
      },
    },
  };

  const productState = useSelector((state) => state.product.products);
  const data3 = [];
  for (let i = 0; i < productState.length; i++) {
    data3.push({
      name: productState[i].name,
      sold: productState[i].sold,
    });
  }
  const config3 = {
    data: data3,
    xField: "sold",
    yField: "name",
    seriesField: "type",
    color: ({ type }) => {
      return type === "美容洗护" ? "#FAAD14" : "#5B8FF9";
    },
    legend: false,
    meta: {
      sold: {
        alias: "Số lượng",
      },
      name: {
        alias: "Tên sản phẩm",
      },
    },
    minBarWidth: 20,
    maxBarWidth: 20,
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng doanh thu bán hàng</p>
            <h4 className="mb-0 sub-title">{totalAmount}.000 vnđ</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <AiOutlineCreditCard size={30} />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng số lượng khách hàng</p>
            <h4 className="mb-0 sub-title">{totalCustomers}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <AiOutlineUsergroupAdd size={30} />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Doanh thu so với tháng trước</p>
            <h4 className="mb-0 sub-title">{difference}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {difference >= 0 ? (
              // Sử dụng icon AiOutlineRise nếu difference lớn hơn hoặc bằng 0
              <h6 className="green">
                <AiOutlineRise />
                {percentageDifference}%
              </h6>
            ) : (
              // Sử dụng icon BsArrowDownRight nếu difference âm
              <h6 className="red">
                <BsArrowDownRight />
                {percentageDifference}%
              </h6>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Doanh thu hằng năm</h3>
        <div>
          <Line {...config} />
        </div>
      </div>
      <div className="d-flex" style={{ width: "100%" }}>
        <div className="mt-4 me-4" style={{ width: "50%" }}>
          <h3 className="mb-5 title">Số lượng khách hàng</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
        <div className="mt-4" style={{ width: "50%" }}>
          <h3 className="mb-5 title">Số sản phẩm đã được bán</h3>
          <div>
            <Bar {...config3} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Đơn đặt hàng gần nhất</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
