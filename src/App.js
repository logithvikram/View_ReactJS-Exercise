import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import Header from './components/Header';
const App = () => {
  return (
    <Router>
      <Header/>
      <Helmet>
        <title>My App - User Management</title>
        <meta name="description" content="User management application with user list and detailed view." />
      </Helmet>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
