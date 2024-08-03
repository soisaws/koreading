import React from 'react';

const ScrollButton = ({ targetId }) => {
    const handleScroll = () => {
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    };
  
    return (
      <button className="down-button" onClick={handleScroll}>
        <img src="arrow.svg" alt="Next" />
      </button>
    );
  };
  
  export default ScrollButton;