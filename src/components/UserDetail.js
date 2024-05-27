import React from 'react';
import { Spin, notification, Button, Descriptions, Avatar } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
import { FiArrowLeft } from 'react-icons/fi';
import useUserDetailViewModel from '../viewModels/userDetailViewModel';
import '../css/styles.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useUserDetailViewModel(id);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    notification.error({
      message: 'Error Fetching User',
      description: error,
    });
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`user-detail-container ${isMobile ? 'mobile' : ''}`}>
      <Helmet>
        <title>{user?.name} - User Details</title>
        <meta name="description" content={`Details of user ${user?.name}`} />
      </Helmet>
      <Button
        icon={<FiArrowLeft />}
        onClick={() => navigate('/')}
        style={{ marginBottom: 16 }}
      >
        Back to User List
      </Button>
      {user ? (
        <div className="user-detail">
          <Avatar size={64} src={user.avatar} />
          <Descriptions title="User Info" bordered>
            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
            <Descriptions.Item label="City">{user.city}</Descriptions.Item>
            <Descriptions.Item label="Country">{user.country}</Descriptions.Item>
            <Descriptions.Item label="Pincode">{user.pincode}</Descriptions.Item>
            <Descriptions.Item label="Street">{user.street}</Descriptions.Item>
            <Descriptions.Item label="State">{user.state}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Created At">
              {moment(user.createdAt).format('MMMM DD, YYYY HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <div>No user found</div>
      )}
    </div>
  );
};

export default UserDetail;
