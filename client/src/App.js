import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import AboutMe from './pages/AboutMe';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Article from './pages/Article';
import Register from './pages/Register';
import Login from './pages/Login';
import './styles.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<AboutMe />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/article" element={<Article />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
