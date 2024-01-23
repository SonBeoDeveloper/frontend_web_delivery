import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/`);

  return response.data.data;
};
const deleteEmployee = async (id) => {
  console.log(id);
  const response = await axios.delete(`${base_url}user/${id}`, config);
  return response.data;
};
const customerService = {
  getUsers,
  deleteEmployee,
};

export default customerService;
