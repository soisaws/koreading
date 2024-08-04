import React from 'react';

const AboutMe = () => {
  return (
    <div className="about-me">
      <h1>About Me</h1>
      <p>
        Welcome to <strong>읽자 (Let's Read)</strong>, your ultimate destination for learning Korean through daily articles and interactive tools. Inspired by a passion for language learning and driven by the need for comprehensive and engaging resources, we aim to make your Korean learning journey both effective and enjoyable.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to provide learners at all levels with high-quality content and tools that facilitate understanding and retention. Whether you are a beginner just starting out or an advanced learner seeking to hone your skills, 읽자 has something for everyone.
      </p>

      <h2>Features</h2>
      <ul>
        <li>
          <strong>Daily Articles:</strong> We provide daily articles sourced from real news and dialogues in various scenarios, simplified and categorized into three levels:
          <ul>
            <li>Beginner (TOPIK I, Level 1-2)</li>
            <li>Intermediate (TOPIK II, Level 3-4)</li>
            <li>Advanced (TOPIK II, Level 5-6)</li>
          </ul>
        </li>
        <li>
          <strong>Mouse-over Dictionary:</strong> Our innovative mouse-over dictionary feature allows you to get instant translations and definitions by simply hovering over words. This feature is inspired by popular translation tools and uses the Kiwipiepy library for breaking down morphemes and the Korean Dictionary API for accurate definitions.
        </li>
        <li>
          <strong>Comprehensive Dictionary Entries:</strong> Each dictionary entry provides the origin (Hanja/English), part of speech, English translation, English definition, and Korean definition. This can be toggled based on your preference.
        </li>
        <li>
          <strong>Interactive Learning Tools:</strong> Test your comprehension with multiple-choice questions, practice your writing with prompts, and enjoy native audio readings to improve your listening skills.
        </li>
        <li>
          <strong>Personalized Experience:</strong> Choose topics you are interested in, view past articles, and sort stories by topics such as Culture, World News, and Korea.
        </li>
        <li>
          <strong>Additional Resources:</strong> Enjoy bonus articles, a streak tracker, night mode, and an optional automated emailing service. Users can also add their own text to study and benefit from popup dictionary links.
        </li>
        <li>
          <strong>Free Version Available:</strong> Access a range of features for free, with additional premium options available for advanced learners.
        </li>
      </ul>

      <h2>Get Started</h2>
      <p>
        Join us at 읽자 and take the first step towards mastering Korean. With our carefully curated content and interactive tools, you will find learning Korean to be a rewarding and fulfilling experience.
      </p>

      <p>Happy learning!</p>
    </div>
  );
};

export default AboutMe;
