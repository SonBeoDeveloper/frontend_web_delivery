import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/login-admin`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorder`, config);

  return response.data;
};
const getRevenue = async () => {
  const response = await axios.get(
    `${base_url}user/getRevenueLast7Days`,
    config
  );
  return response.data;
};
const getOrdersWait = async () => {
  const response = await axios.get(`${base_url}user/getorderwait`, config);

  return response.data;
};
const getUser = async () => {
  const response = await axios.get(`${base_url}user/get-user`, config);

  return response.data.data;
};
const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/get-order-by-user/${id}`,
    config
  );

  return response.data;
};
const getIdOrder = async (id) => {
  const response = await axios.get(`${base_url}user/idOrder/${id}`, config);

  return response.data;
};
const cancelOrder = async (id) => {
  const response = await axios.patch(
    `${base_url}user/cancelOrder/${id}`,
    config
  );

  return response.data;
};
const confirmOrder = async (id) => {
  const response = await axios.patch(`${base_url}user/orders/${id}`, config);

  return response.data;
};
const logout = async () => {
  const response = await axios.get(`${base_url}user/logout`);
  return response.data;
};
const updateUser = async (user) => {
  const response = await axios.put(
    `${base_url}user/edit`,
    {
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
    config
  );
  return response.data.data;
};
const signUp = async (user) => {
  console.log(user);
  const response = await axios.post(`${base_url}user/register`, {
    fullname: user.fullname,
    email: user.email,
    password: user.password,
    phone: user.phone,
    address: user.address,
    role: user.role,
  });
  console.log("signUp response", response.data);
  return response.data;
};
const authService = {
  login,
  getOrders,
  getOrder,
  getRevenue,
  getUser,
  logout,
  signUp,
  confirmOrder,
  cancelOrder,
  getIdOrder,
  updateUser,
  getOrdersWait,
};

export default authService;
