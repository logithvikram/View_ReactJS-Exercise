import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">User List</Link>
      </nav>
    </header>
  );
};

export default Header;
