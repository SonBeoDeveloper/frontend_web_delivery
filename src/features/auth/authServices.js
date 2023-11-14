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

const authService = {
  login,
  getOrders,
  getOrder,
  getUser,
};

export default authService;
