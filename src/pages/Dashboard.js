import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { BsArrowDownRight } from "react-icons/bs";
import { Line, Bar, Column } from "@ant-design/plots";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  confirmOrder,
  cancelOrder,
  getOrdersWait,
  getrevenueLast7Days,
} from "../features/auth/authSlice";
import moment from "moment";
import { getUsers } from "../features/cutomers/customerSlice";
import {
  AiOutlineCreditCard,
  AiOutlineUsergroupAdd,
  AiOutlineRise,
} from "react-icons/ai";
import { getTopProducts } from "../features/product/productSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getUsers());
    dispatch(getrevenueLast7Days());
    dispatch(getTopProducts());
    dispatch(getOrdersWait());
  }, [dispatch]);
  const orderState = useSelector((state) => state.auth.orders);
  const orderWaitState = useSelector((state) => state.auth.orderwait);
  const revenueLast7Days = useSelector(
    (state) => state.auth.RevenueLast7Days.revenueByDay
  );
  console.log("revanue", revenueLast7Days);
  const currentYear = new Date().getFullYear();
  const ordersReceived = orderState.filter(
    (order) => order.orderStatus === "Đã nhận hàng"
  );

  const handleConfirm = async (orderId) => {
    try {
      await dispatch(confirmOrder(orderId));
      dispatch(getOrdersWait());
      toast.success("Xác nhận đơn hàng thành công!");
    } catch (error) {
      toast.error("Lỗi gì đó!");
    }
  };

  // Xử lý hủy đơn đặt hàng
  const handleCancel = async (orderId) => {
    try {
      await dispatch(cancelOrder(orderId));
      dispatch(getOrdersWait());
      toast.success("Hủy đơn hàng thành công!");
    } catch (error) {
      toast.error("Lỗi gì đó!");
    }
  };

  const customerstate = useSelector((state) => state.customer.customers);
  const filteredCustomers = customerstate.filter(
    (customer) => customer.role !== "admin" && customer.role !== "employee"
  );

  const currentDate = new Date();

  // Lấy tháng và năm của tháng này
  const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần +1 để có tháng thực tế
  // Lấy tháng và năm của tháng trước
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const ordersThisMonth = ordersReceived.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getMonth() + 1 === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  });

  const ordersLastMonth = ordersReceived.filter((order) => {
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
  const percentageDifference = (
    (difference / totalAmountLastMonth) *
    100
  ).toFixed(2);

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
  for (let i = 0; i < orderWaitState.length; i++) {
    data1.push({
      key: i + 1,
      orderId: orderWaitState[i]._id,
      name: orderWaitState[i].orderBy.fullname,
      amount: orderWaitState[i].paymentIntent.amount,
      status: orderWaitState[i].orderStatus,
      createAt: new Date(orderWaitState[i].createdAt).toLocaleString(),
      address: orderWaitState[i].orderBy.address,
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
  ordersReceived.forEach((order) => {
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

  const productState = useSelector((state) => state.product.topProduct);
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
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Tổng số tiền",
      dataIndex: "amount",
      sorter: (a, b) => b.amount - a.amount,
      render: (text, record) => `${record.amount.toFixed(1)}00 VNĐ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      sorter: (a, b) => {
        const dateA = moment(a.createAt);
        const dateB = moment(b.createAt);
        return dateA.isAfter(dateB) ? 1 : -1;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Hành động",
      dataIndex: "key",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleConfirm(record.orderId)}>
            Xác nhận
          </Button>
          <Button
            type="text"
            danger
            onClick={() => handleCancel(record.orderId)}
          >
            Hủy
          </Button>
        </div>
      ),
    },
  ];
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1); // Ngày hôm qua

  // Lọc ra các đơn hàng trong ngày hôm nay và ngày hôm qua
  const ordersToday = ordersReceived.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getDate() === currentDate.getDate() &&
      orderDate.getMonth() === currentDate.getMonth() &&
      orderDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const ordersYesterday = ordersReceived.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getDate() === yesterday.getDate() &&
      orderDate.getMonth() === yesterday.getMonth() &&
      orderDate.getFullYear() === yesterday.getFullYear()
    );
  });

  // Tính tổng doanh thu trong ngày hôm nay và ngày hôm qua
  const totalAmountToday = ordersToday.reduce(
    (total, order) => total + order.paymentIntent.amount,
    0
  );

  const totalAmountYesterday = ordersYesterday.reduce(
    (total, order) => total + order.paymentIntent.amount,
    0
  );

  // Tính chênh lệch và phần trăm chênh lệch
  const differenceToday = totalAmountToday - totalAmountYesterday;
  const percentageDifferenceToday = (
    (differenceToday / totalAmountYesterday) *
    100
  ).toFixed(2);
  const textColor = percentageDifferenceToday >= 0 ? "green" : "red";
  const Color = difference >= 0 ? "green" : "red";

  return (
    <div>
      <h3 className="mb-4 title">Trang chủ</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng doanh thu trong ngày</p>
            <h4 className="mb-0 sub-title">
              {totalAmountToday.toFixed(1)}00 vnđ
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {percentageDifferenceToday >= 0 ? (
              <h6 style={{ color: textColor }}>
                <AiOutlineRise />
                {percentageDifferenceToday}%
              </h6>
            ) : (
              <h6 style={{ color: textColor }}>
                <BsArrowDownRight />
                {percentageDifferenceToday}%
              </h6>
            )}
          </div>
          <div className="d-flex flex-column align-items-end">
            <AiOutlineCreditCard size={30} />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Số lượng khách hàng</p>
            <h4 className="mb-0 sub-title">{totalCustomers}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <AiOutlineUsergroupAdd size={30} />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Doanh thu so với tháng trước</p>
            <h4 className="mb-0 sub-title">{`${difference.toFixed(
              1
            )}00 vnđ`}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {difference >= 0 ? (
              <h6 style={{ color: Color }}>
                <AiOutlineRise />
                {percentageDifference}%
              </h6>
            ) : (
              <h6 style={{ color: Color }}>
                <BsArrowDownRight />
                {percentageDifference}%
              </h6>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Doanh thu hàng tháng</h3>
        <div>
          <Line {...config} />
        </div>
      </div>

      <div className="d-flex" style={{ width: "100%" }}>
        <div className="mt-4 me-4" style={{ width: "50%" }}>
          <h3 className="mb-5 title">Số lượng người đăng ký</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
        <div className="mt-4" style={{ width: "50%" }}>
          <h3 className="mb-5 title">Top 10 món bán chạy trong năm</h3>
          <div>
            <Bar {...config3} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Đơn đặt hàng gần đây</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
