// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to={isAuthenticated ? "/dashboard" : "/"} className="logo">읽자</Link>
      <div className="navigation-bar">
        {isAuthenticated ? (
          <>
            <Link to="/account" className="navigation-link">Account</Link>
            <button className="logout-button" onClick={handleLogout}>
              <img src="logout.svg" alt="Log Out" width="20px" height="20px"/>
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="navigation-link">Register</Link>
            <Link to="/login" className="navigation-link">Login</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
