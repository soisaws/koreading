import React, { useState, useEffect } from 'react';
import ScrollButton from "../components/ScrollButton.jsx"

const Article = () => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch('/articles.json')
      .then(response => response.json())
      .then(data => {
        const today = new Date().toISOString().split('T')[0];
        const level = localStorage.getItem('difficulty') || 'beginner';
        const article = data.articles.find(article => article.date === today && article.level === level);
        setArticle(article);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

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
    const userResponse = document.getElementById('user-response').value;
    if (userResponse) {
      const responsesList = document.getElementById('community-responses');
      const li = document.createElement('li');
      li.innerText = `You: ${userResponse}`;
      responsesList.appendChild(li);
      document.getElementById('user-response').value = ''; // Clear the textarea
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
            <textarea id="user-response" placeholder="Write your response here..."></textarea>
            <button onClick={submitResponse}>Submit</button>
          </div>
          <div className="right-half">
            <h3>Community Responses</h3>
            <ul id="community-responses">
              {article.communityResponses.map((response, index) => (
                <li key={index}>{response.name}: {response.response}</li>
              ))}
            </ul>
          </div>
            <button  onClick={() => window.location.href = '/'}>Finish</button>
          </div>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </main>
  );
};

export default Article;
