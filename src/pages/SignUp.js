import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Select, Typography } from "antd";
import { toast } from "react-toastify";
import { signUp } from "../features/auth/authSlice";

const { Title } = Typography;
const { Option } = Select;

const SignUp = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(signUp(values))
      .then(() => {
        toast.success("Đăng ký thành công!");
      })
      .catch((error) => {
        toast.error("Đăng ký thất bại!");
        console.error("Update error:", error);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      fullname: "",
      email: "",
      phone: "",
      address: "",
      role: "user",
    });
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Đăng ký</Title>
      <Form
        name="signup"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ role: "user" }}
      >
        <Form.Item
          label="Họ và tên"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Hãy nhập thông tin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Hãy nhập email!",
            },
            {
              required: true,
              message: "Hãy nhập thông tin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: "Please select a role!",
            },
          ]}
        >
          <Select>
            <Option value="user">Người dùng</Option>
            <Option value="admin">Admin</Option>
            <Option value="employee">Nhân viên</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: "Nhập số điện thoại!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            {
              required: true,
              message: "Hãy nhập địa chỉ!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
