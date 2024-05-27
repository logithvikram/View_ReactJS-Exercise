import axios from 'axios';

const API_URL = 'https://623c2a6d2e056d1037fa9e3f.mockapi.io/user/';

const getUsers = () => {
  return axios.get(API_URL);
};

const getUserById = (id) => {
  return axios.get(`${API_URL}${id}`);
};

const createUser = (user) => {
  return axios.post(API_URL, user);
};

const updateUser = (id, user) => {
  return axios.put(`${API_URL}${id}`, user);
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}${id}`);
};

const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
