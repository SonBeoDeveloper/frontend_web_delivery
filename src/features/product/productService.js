import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data.data;
};
const exportProducts = async () => {
  const response = await axios.get(`${base_url}product/export`);

  return response.data;
};
const exportOrder = async (id) => {
  const response = await axios.get(`${base_url}user/exportOrder/${id}`, config);

  return response.data;
};
const getTopProducts = async () => {
  const response = await axios.get(`${base_url}product/top-products`, config);

  return response.data;
};
const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/update/${product._id}`,
    {
      name: product.productData.name,
      description: product.productData.description,
      price: product.productData.price,
      category: product.productData.category,
      images: product.productData.images,
    },
    config
  );
  return response.data;
};
const getProduct = async (_id) => {
  const response = await axios.get(`${base_url}product/${_id}`, config);
  return response.data.data;
};
const createProduct = async (product) => {
  const response = await axios.post(
    `${base_url}product/create`,
    product,
    config
  );
  return response.data;
};
const deleteProduct = async (_id) => {
  const response = await axios.delete(`${base_url}product/${_id}`, config);
  return response.data;
};
const productService = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  getTopProducts,
  exportProducts,
  deleteProduct,
  exportOrder,
};

export default productService;
