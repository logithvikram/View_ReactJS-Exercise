import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">User Management System
</Link>
      </nav>
    </header>
  );
};

export default Header;
