import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import * as yup from "yup";
import { getUser, updateUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  fullname: yup.string().required("Chưa nhập tên"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Chưa nhập điện thoại"),
  address: yup.string().required("Chưa nhập địa chỉ"),
});

const EditUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.admin);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(updateUser(values))
      .then(() => {
        toast.success("User updated successfully!");
        navigate("/admin");
      })
      .catch((error) => {
        toast.error("Failed to update user!");
        console.error("Update error:", error);
      });
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h3>Chỉnh sửa thông tin</h3>
      <Form
        form={form}
        initialValues={{
          fullname: currentUser.fullname || "",
          email: currentUser.email || "",
          phone: currentUser.phone || "",
          address: currentUser.address || "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Họ và tên"
          name="fullname"
          rules={[{ required: true, message: "Full name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Invalid email" },
            { required: true, message: "Chưa nhập địa chỉ email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Chưa nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Chưa nhập địa chỉ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
