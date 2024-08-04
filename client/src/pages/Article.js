import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ScrollButton from "../components/ScrollButton.jsx";

const Article = () => {
  const [article, setArticle] = useState(null);
  const [username, setUsername] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [responses, setResponses] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || ''); 

    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const level = searchParams.get('difficulty') || 'beginner';

    fetch('http://localhost:5000/articles')
      .then(response => response.json())
      .then(data => {
        const article = data.articles.find(article => article.date === date && article.level === level);
        setArticle(article);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, [searchParams]);

  const toggleTranslation = () => {
    const translation = document.getElementById('english-translation');
    const button = document.getElementById('toggle-translation');
    if (translation.style.display === 'none') {
      translation.style.display = 'block';
      button.innerText = 'Hide English Translation';
    } else {
      translation.style.display = 'none';
      button.innerText = 'Show English Translation';
    }
  };

  const submitResponse = () => {
    if (userResponse) {
      setResponses([...responses, `You: ${userResponse}`]);
      setUserResponse(''); // Clear the textarea
    }
  };

  const finishArticle = async () => {
    try {
      const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
      const level = searchParams.get('difficulty') || 'beginner';
      const response = await fetch('http://localhost:5000/update-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          date,
          level
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      window.location.href = '/dashboard'; // Redirect after update
    } catch (error) {
      console.error('Error updating user activity:', error);
    }
  };

  return (
    <main className="main-content-article">
      {article ? (
        <>
          <div className="screen" id="screen-1">
            <div className="article-content">
              <div className="left-half">
                <h2 id="article-title">{article.title}</h2>
                <p id="article-text">{article.text}</p>
              </div>
              <div className="right-half">
                <button id="toggle-translation" onClick={toggleTranslation}>Show English Translation</button>
                <p id="english-translation" style={{ display: 'none' }}>{article.englishTranslation}</p>
              </div>
            </div>
            <ScrollButton targetId="screen-2" />
          </div>
          <div className="screen" id="screen-2">
            <h3>Questions</h3>
            <ul id="article-questions">
              {article.questions.map((q, index) => (
                <li key={index}>
                  {q.question}
                  <br />
                  {q.options.map((option, i) => (
                    <React.Fragment key={i}>
                      <input type="radio" name={`question-${index}`} value={option} /> {option}
                      <br />
                    </React.Fragment>
                  ))}
                </li>
              ))}
            </ul>
            <ScrollButton targetId="screen-3" />
          </div>
          <div className="screen" id="screen-3">
            <div className="left-half">
              <h3>Writing Prompt</h3>
              <p id="writing-prompt">{article.writingPrompt}</p>
              <textarea
                id="user-response"
                placeholder="Write your response here..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              ></textarea>
              <button onClick={submitResponse}>Submit</button>
            </div>
            <div className="right-half">
              <h3>Community Responses</h3>
              <ul id="community-responses">
                {responses.map((response, index) => (
                  <li key={index}>{response}</li>
                ))}
              </ul>
            </div>
            <button onClick={finishArticle}>Finish</button>
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </main>
  );
};

export default Article;
