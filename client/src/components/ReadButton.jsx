import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReadButton = ({ date, difficulty, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem('date', date);
    localStorage.setItem('difficulty', difficulty);
    navigate(`/article?date=${date}&difficulty=${difficulty}`);
  };

  return (
    <button onClick={handleClick}>
      {label}
    </button>
  );
};

export default ReadButton;
