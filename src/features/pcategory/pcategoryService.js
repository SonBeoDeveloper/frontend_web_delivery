import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category`);
  console.log(response.data);

  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(
    `${base_url}category/create`,
    category,
    config
  );

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);

  return response.data;
};
const updateProductCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { name: category.pCatData.name, image: category.pCatData.image },
    config
  );

  return response.data;
};
const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default pCategoryService;
