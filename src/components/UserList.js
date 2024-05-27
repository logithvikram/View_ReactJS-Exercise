import React, { useState, useEffect, useCallback } from 'react';
import { Table, Spin, notification, Button, Space, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import AddUserButton from './AddUser';
import EditUser from './EditUser';
import '../css/styles.css';
import { FieldNumberOutlined, FilterOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';
import userService from '../services/userService'; 

const { confirm } = Modal;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState({
    name: '',
    city: '',
    country: '',
    email: '',
  });
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const fetchUsers = useCallback(() => {
    setLoading(true);
    userService.getUsers()  
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        notification.error({
          message: 'Error Fetching Users',
          description: error.message,
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        userService.deleteUser(id)  
          .then(() => {
            notification.success({
              message: 'User Deleted',
              description: 'The user has been successfully deleted.',
            });
            fetchUsers();
          })
          .catch(error => {
            notification.error({
              message: 'Error Deleting User',
              description: error.message,
            });
          });
      },
      onCancel() {
        console.log('Delete action cancelled');
      },
    });
  };

  const handleEdit = (user, e) => {
    e.stopPropagation();
    setSelectedUser(user);
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = (values) => {
    userService.updateUser(selectedUser.id, values)  
      .then(() => {
        notification.success({
          message: 'User Updated',
          description: 'The user has been successfully updated.',
        });
        fetchUsers();
        setIsEditModalVisible(false);
        setSelectedUser(null);
      })
      .catch(error => {
        notification.error({
          message: 'Error Updating User',
          description: error.message,
        });
      });
  };

  const handleTableChange = (pagination) => {
    setPageSize(pagination.pageSize);
    setCurrentPage(pagination.current);
  };

  const handleFilterChange = (e, key) => {
    setFilterValues({
      ...filterValues,
      [key]: e.target.value,
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filterValues.name.toLowerCase()) &&
    user.city.toLowerCase().includes(filterValues.city.toLowerCase()) &&
    user.country.toLowerCase().includes(filterValues.country.toLowerCase()) &&
    user.email.toLowerCase().includes(filterValues.email.toLowerCase())
  );

  const columns = [
    {
      title: <FieldNumberOutlined />,
      key: 'serialNumber',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: () => (
        <Input
          placeholder="Filter by Name"
          value={filterValues.name}
          onChange={e => handleFilterChange(e, 'name')}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      filterIcon: filtered => <FilterOutlined />,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      filterDropdown: () => (
        <Input
          placeholder="Filter by City"
          value={filterValues.city}
          onChange={e => handleFilterChange(e, 'city')}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      filterIcon: filtered => <FilterOutlined />,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      filterDropdown: () => (
        <Input
          placeholder="Filter by Country"
          value={filterValues.country}
          onChange={e => handleFilterChange(e, 'country')}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      filterIcon: filtered => <FilterOutlined />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filterDropdown: () => (
        <Input
          placeholder="Filter by Email"
          value={filterValues.email}
          onChange={e => handleFilterChange(e, 'email')}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      filterIcon: filtered => <FilterOutlined />,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ['ascend', 'descend'],
      render: createdAt => moment(createdAt).format('MMMM DD, YYYY HH:mm:ss')
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<FiEdit />} onClick={(e) => handleEdit(record, e)}>Edit</Button>
          <Button danger icon={<FiTrash2 />} onClick={(e) => handleDelete(record.id, e)}>Delete</Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div className="user-list-container">
      <Helmet>
        <title>User List</title>
        <meta name="description" content="This is the user list page" />
      </Helmet>
      <h1>User List</h1>
      <div className="user-list-header" style={{ marginBottom: 16 }}>
        <AddUserButton fetchUsers={fetchUsers} />
      </div>
      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize, total: filteredUsers.length, showSizeChanger: true }}
        onChange={handleTableChange}
        onRow={(record) => {
          return {
            onClick: () => navigate(`/user/${record.id}`),
          };
        }}
        scroll={isMobile ? { x: 'max-content' } : {}}
      />
      <EditUser
        visible={isEditModalVisible}
        onEdit={handleEditSubmit}
        onCancel={() => setIsEditModalVisible(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserList;
