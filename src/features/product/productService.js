import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data.data;
};
const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/update/${product.id}`,
    {
      name: product.ProductData.name,
      description: product.ProductData.expiry,
      price: product.ProductData.discount,
      category: product.ProductData.category,
      images: product.ProductData.images,
    },
    config
  );

  return response.data;
};
const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(
    `${base_url}product/create`,
    product,
    config
  );
  return response.data;
};
const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};
const productService = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};

export default productService;
