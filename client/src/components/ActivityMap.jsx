import React, { useState, useEffect } from 'react';
import HeatMap from '@uiw/react-heat-map';
import ReadButton from '../components/ReadButton';

const ActivityMap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [selected, setSelected] = useState('');
  const [tooltipData, setTooltipData] = useState(null);
  const [articles, setArticles] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const transformUserActivityData = (userActivity) => {
      const transformedData = [];
      for (const [date, counts] of Object.entries(userActivity.articles)) {
        const totalCount = counts.reduce((acc, count) => acc + count, 0);
        const dateObj = new Date(date);
        // Minus one day
        dateObj.setDate(dateObj.getDate() - 1);
        transformedData.push({ date: dateObj, count: totalCount });
      }
      return transformedData;
    };

    const fetchUserActivity = async () => {
      try {
        const response = await fetch('http://localhost:5000/userActivity');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const username = localStorage.getItem('username');
        if (username && data[username] && data[username].articles) {
          const transformedData = transformUserActivityData(data[username]);
          setHeatmapData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching user activity data:', error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchUserActivity();
    fetchArticles();
  }, []);

  const handleRectClick = (event, data) => {

    // Create a new Date object from the data.date string
    const dateObj = new Date(data.date.replace(/\//g, '-'));

    // Add one day
    dateObj.setDate(dateObj.getDate() + 2);

    // Convert back to ISO format (yyyy-mm-dd)
    const date = dateObj.toISOString().slice(0, 10);

    setSelected(date === selected ? '' : date);

    if (date === selected) {
      setTooltipData(null);
      return;
    }

    const username = localStorage.getItem('username');
    fetch('http://localhost:5000/userActivity')
      .then(response => response.json())
      .then(activityData => {
        const userArticles = activityData[username]?.articles?.[date] || [0, 0, 0];
        const articlesForDate = articles.filter(article => article.date === date);
        const tooltipContent = articlesForDate.map((article, index) => ({
          ...article,
          read: userArticles[index] === 1,
        }));

        setTooltipData({
          date,
          articles: tooltipContent,
        });
        setTooltipPosition({ top: event.clientY + 10, left: event.clientX + 10 });
      })
      .catch(error => console.error('Error fetching user activity data:', error));
  };

  return (
    <div>
      <HeatMap
        width='1100'
        height="189"
        style={{ '--rhm-rect-active': '#f0f0f0' }}
        value={heatmapData}
        weekLabels={['月', '火', '水', '木', '金', '土', '日']}
        monthLabels={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
        startDate={new Date('2024-1-1')}
        endDate={new Date('2024-12-31')}
        legendCellSize='0'
        panelColors={{
          0: 'white',
          1: 'white',
          2: '#80ED99',
          3: '#66cc88',
          4: '#4BAF66'
        }}
        rectSize={19}
        rectRender={(props, data) => {
          props.opacity = selected !== '' && data.date !== selected ? 0.45 : 1;
          return (
            <rect
              {...props}
              onClick={(event) => handleRectClick(event, data)}
            />
          );
        }}
      />
      {tooltipData && (
        <div className="custom-tooltip" style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px`, backgroundColor: 'white', borderRadius: "8px", border: "1px, solid #e0e0e0", position: 'fixed', padding: '8px', zIndex: 1000 }}>
          <div>{tooltipData.date}</div>
          {tooltipData.articles.map((article, index) => (
            <div key={index} style={{ color: article.read ? 'gray' : 'black' }}>
              {article.title}
              <ReadButton
                date={tooltipData.date}
                difficulty={article.level}
                label={`Read ${article.level}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityMap;
