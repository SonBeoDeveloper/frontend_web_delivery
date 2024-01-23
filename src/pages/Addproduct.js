import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate, useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/auth/authSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import {
  createProducts,
  getAProduct,
  updateAProduct,
  resetState,
} from "../features/product/productSlice";

let schema = yup.object().shape({
  name: yup.string().required("Chưa nhập tên"),
  description: yup.string().required("Nhập tiêu đề"),
  price: yup.number().required("Giá sản phẩm chưa nhập"),
  category: yup.string().required("Danh mục chưa điền"),
  images: yup.string().required("Ảnh chưa nhập"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUser());
  }, []);
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const catState = useSelector((state) => state.pCategory.pCategories);
  const newProduct = useSelector((state) => state.product);
  console.log("new:", newProduct);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedAProduct,
    productName,
    productDescription,
    productPrice,
    productImages,
    productCategory,
  } = newProduct;
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Món ăn đã được thêm thành công!");
    }
    if (isSuccess && updatedAProduct) {
      toast.success("Món ăn đã được sửa thành công!");
      navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productName || "",
      description: productDescription || "",
      price: productPrice || "",
      category: productCategory || "",
      images: productImages || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { _id: getProductId, productData: values };
        console.log("update", values);
        dispatch(updateAProduct(data));
        dispatch(resetState());
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Sửa" : "Thêm"} đồ ăn
      </h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Tên đồ ăn"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            type="text"
            label="Tiêu đề"
            name="description"
            onChng={formik.handleChange("description")}
            onBlr={formik.handleBlur("description")}
            val={formik.values.description}
            id="description"
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Giá"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
            id="price"
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id="category"
          >
            <option value="">Chọn danh mục</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i._id}>
                  {i.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <CustomInput
            type="text"
            label="Nhập ảnh url"
            name="images"
            onChng={formik.handleChange("images")}
            onBlr={formik.handleBlur("images")}
            val={formik.values.images}
            id="images"
          />
          <div className="error">
            {formik.touched.images && formik.errors.images}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProductId !== undefined ? "Sửa" : "Thêm"} đồ ăn
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
