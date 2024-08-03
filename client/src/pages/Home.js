import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ActivityMap from '../components/ActivityMap.jsx'

const Home = () => {
  const defaultDifficulty = 'beginner';
  const [difficulty, setDifficulty] = useState(() => {
    // Load difficulty from localStorage or use default
    return localStorage.getItem('difficulty') || defaultDifficulty;
  });
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch('/articles.json')
      .then(response => response.json())
      .then(data => {
        const today = new Date().toISOString().split('T')[0];
        const article = data.articles.find(article => article.date === today && article.level === difficulty);
        setArticle(article);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, [difficulty]);

  useEffect(() => {
    // Save difficulty to localStorage whenever it changes
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);

  return (
    <main className="main-content">
      <div className="top-row">
        <div className={`article-preview ${difficulty}`}>
          <div className="image-container">
            <img src="/greenshroom.jpg" alt="Mascot Name" height="100%" />
          </div>
          <div className="text-container">
            {article ? (
              <>
                <h2>{article.title}</h2>
                <p >{article.introduction}</p>
                <div className="button-container">
                  <Link to="/article" className='button'>Let's Read!</Link>
                </div>
              </>
            ) : (
              <>
                <h2>Loading...</h2>
                <p>Please wait while we load the article.</p>
              </>
            )}
          </div>
        </div>
        <div className="tab-selector">
          <button className="beginner" onClick={() => setDifficulty('beginner')}>초급</button>
          <button className="intermediate" onClick={() => setDifficulty('intermediate')}>중급</button>
          <button className="advanced" onClick={() => setDifficulty('advanced')}>고급</button>
        </div>
      </div>
      <div className="bottom-row">
        <div className="activity">
          <h2>Activity</h2>
          <div id="heatmap-container">
            <ActivityMap/>
          </div>
        </div>
        <div className="stats">
          <h2>Statistics</h2>
          <p>Streak: 0 days</p>
          <p>Days Studied: 0 </p>
          <p>Articles Read: 0 </p>
          <p>Begin | Int | Adv</p>
        </div>
      </div>
    </main>
  );
};

export default Home;
