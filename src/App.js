import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Article from './pages/Article';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </div>
    </Router>
  );
}; //

export default App;