import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import UserList from './js/UserList';
import UserDetailPage from './js/UserDetail';
import Header from './js/Header';
import './css/App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://623c2a6d2e056d1037fa9e3f.mockapi.io/user/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetailPage users={users} />} />
          </Routes>
        </main>
      
      </div>
    </Router>
  );
};

export default App;
