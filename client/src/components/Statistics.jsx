import React, { useState, useEffect } from 'react';

const Statistics = () => {
  const [streak, setStreak] = useState(0);
  const [daysStudied, setDaysStudied] = useState(0);
  const [articlesRead, setArticlesRead] = useState(0);
  const [articlesByLevel, setArticlesByLevel] = useState([0, 0, 0]); // [Beginner, Intermediate, Advanced]

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const response = await fetch('http://localhost:5000/userActivity');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const username = localStorage.getItem('username');
        if (username && data[username] && data[username].articles) {
          const activity = data[username].articles;
          let daysCount = 0;
          let articlesCount = 0;
          const levelCounts = [0, 0, 0];
          const dates = [];

          for (const date in activity) {
            daysCount++;
            const counts = activity[date];
            articlesCount += counts.reduce((a, b) => a + b, 0);
            counts.forEach((count, index) => {
              if (count > 0) {
                levelCounts[index]++;
              }
            });
            dates.push(new Date(date));
          }

          // Sort dates in ascending order
          dates.sort((a, b) => a - b);

          // Calculate streak
          let streakCount = 0;
          let maxStreak = 0;
          for (let i = 0; i < dates.length; i++) {
            if (i === 0 || dates[i] - dates[i - 1] === 86400000) {
              streakCount++;
            } else {
              streakCount = 1;
            }
            if (streakCount > maxStreak) {
              maxStreak = streakCount;
            }
          }

          setStreak(maxStreak);
          setDaysStudied(daysCount);
          setArticlesRead(articlesCount);
          setArticlesByLevel(levelCounts);
        }
      } catch (error) {
        console.error('Error fetching user activity data:', error);
      }
    };

    fetchUserActivity();
  }, []);

  return (
    <div className='statistics'>
      <h2>Statistics</h2>
      <p>{streak} day streak</p>
      <p>{daysStudied} day(s) studied</p>
      <p>{articlesRead} articles read</p>
      <div className="difficulty-stats">
        <div className="difficulty-stat beginner">
          <p>初</p>
          <p>{articlesByLevel[0]}</p>
        </div>
        <div className="difficulty-stat intermediate">
          <p>中</p>
          <p>{articlesByLevel[1]}</p>
        </div>
        <div className="difficulty-stat advanced">
          <p>高</p>
          <p>{articlesByLevel[2]}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
