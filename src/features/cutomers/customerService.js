import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/`);

  return response.data.data;
};

const customerService = {
  getUsers,
};

export default customerService;
