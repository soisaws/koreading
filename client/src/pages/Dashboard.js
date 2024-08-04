import React, { useState, useEffect } from 'react';
import ActivityMap from '../components/ActivityMap';
import ReadButton from '../components/ReadButton';
import Statistics from '../components/Statistics'; // Import the Statistics component

const Dashboard = () => {
  const defaultDifficulty = 'beginner';
  const [difficulty, setDifficulty] = useState(() => {
    return localStorage.getItem('difficulty') || defaultDifficulty;
  });
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetch('http://localhost:5000/articles')
      .then(response => response.json())
      .then(data => {
        const article = data.articles.find(article => article.date === today && article.level === difficulty);
        setArticle(article);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, [difficulty]);

  useEffect(() => {
    localStorage.setItem('difficulty', difficulty);
  }, [difficulty]);

  const today = new Date().toISOString().split('T')[0];

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
                <p>{article.introduction}</p>
                <div className="button-container">
                  <ReadButton date={today} difficulty={difficulty} label="Let's Read!" />
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
            <ActivityMap />
          </div>
        </div>
        <div className="stats">
          <Statistics /> {/* Use the Statistics component */}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
