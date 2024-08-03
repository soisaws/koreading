import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">읽자</Link>
      <div className="navigation-bar">
        <Link className="navigation-link">About</Link>
        <Link className="navigation-link">Account</Link>
        <button className="logout-button">
          <img src="logout.svg" alt="Log Out" width="20px" height="20px"/>
        </button>      
      </div>
    </header>
  );
};

export default Header;
