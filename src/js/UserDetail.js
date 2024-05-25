import React from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions } from 'antd';
import '../css/UserDetailPage.css';

const UserDetailPage = ({ users }) => {
  const { id } = useParams();
  const user = users.find(user => user.id.toString() === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="user-detail-container">
      <h1>User Details</h1>
      <Descriptions bordered className="descriptions-container">
        <Descriptions.Item label="Name" className="descriptions-item">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Avatar" className="descriptions-item">
          <img src={user.avatar} alt="Avatar" className="modal-avatar" />
        </Descriptions.Item>
        <Descriptions.Item label="City" className="descriptions-item">{user.city}</Descriptions.Item>
        <Descriptions.Item label="Country" className="descriptions-item">{user.country}</Descriptions.Item>
        <Descriptions.Item label="Pincode" className="descriptions-item">{user.pincode}</Descriptions.Item>
        <Descriptions.Item label="Street" className="descriptions-item">{user.Street}</Descriptions.Item>
        <Descriptions.Item label="State" className="descriptions-item">{user.state}</Descriptions.Item>
        <Descriptions.Item label="Phone" className="descriptions-item">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="Email" className="descriptions-item">{user.email}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default UserDetailPage;
