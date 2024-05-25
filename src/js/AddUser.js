import React, { useState } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const AddUser = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const validateUsername = ( value) => {
    const usernameRegex = /^[a-zA-Z]{8,15}$/;
    if (value && !usernameRegex.test(value)) {
      return Promise.reject('Username must be 8-15 characters long and alphanumeric.');
    }
    return Promise.resolve();
  };

  const validateImageUrl = ( value) => {
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i;
    if (value && !urlRegex.test(value)) {
      return Promise.reject('Please enter a valid image URL with a proper extension (png, jpg, jpeg, gif, bmp, svg).');
    }
    return Promise.resolve();
  };

  const validatePhoneNumber = ( value) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    if (value && !phoneRegex.test(value)) {
      return Promise.reject('Phone number must be 10-15 digits long.');
    }
    return Promise.resolve();
  };

  return (
    <Modal
      visible={visible}
      title="Add a New User"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
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
          name="Street"
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

const AddUserButton = ({ fetchUsers }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    axios.post('https://623c2a6d2e056d1037fa9e3f.mockapi.io/user/', values)
      .then(() => {
        setVisible(false);
        notification.success({
          message: 'User Added',
          description: 'The user has been successfully added.',
        });
        fetchUsers();
      })
      .catch(error => {
        notification.error({
          message: 'Error Adding User',
          description: error.message,
        });
      });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add User
      </Button>
      <AddUser
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default AddUserButton;
