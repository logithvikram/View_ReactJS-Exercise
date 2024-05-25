import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const EditUser = ({ visible, onEdit, onCancel, user }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        avatar: user.avatar,
        city: user.city,
        country: user.country,
        email: user.email,
        pincode: user.pincode,
        street: user.street,
        state: user.state,
        phone: user.phone,
      });
    }
  }, [user, form]);

  const validateUsername = (rule, value) => {
    const usernameRegex = /^[a-zA-Z]{8,15}$/;
    if (value && !usernameRegex.test(value)) {
      return Promise.reject('Username must be 8-15 characters long and alphanumeric.');
    }
    return Promise.resolve();
  };

  const validateImageUrl = (rule, value) => {
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i;
    if (value && !urlRegex.test(value)) {
      return Promise.reject('Please enter a valid image URL with a proper extension (png, jpg, jpeg, gif, bmp, svg).');
    }
    return Promise.resolve();
  };

  const validatePhoneNumber = (rule, value) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (value && !phoneRegex.test(value)) {
      return Promise.reject('Phone number must be 10-15 digits long.');
    }
    return Promise.resolve();
  };

  return (
    <Modal
      visible={visible}
      title="Edit User"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onEdit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please input the name!' },
            { validator: validateUsername },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Image URL"
          rules={[
            { required: true, message: 'Please input the image URL!' },
            { type: 'url', message: 'Please enter a valid URL!' },
            { validator: validateImageUrl },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input the city!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Please input the country!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pincode"
          label="Pincode"
          rules={[
            { required: true, message: 'Please input the pincode!' },
            { pattern: /^\d+$/, message: 'Pincode must be a number!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="street"
          label="Street"
          rules={[{ required: true, message: 'Please input the street!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: 'Please input the state!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input the phone number!' },
            { validator: validatePhoneNumber },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;
