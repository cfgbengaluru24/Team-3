import React, { useState } from 'react';
import './Resources.css';
import Navbar from './Navbar';

const resourcesData = [
  { 
    title: 'Critical Thinking', 
    content: 'Enhance your critical thinking skills with these resources.',
    links: [
      { type: 'pdf', url: 'http://example.com/critical-thinking.pdf', text: 'Critical Thinking PDF' },
      { type: 'video', url: 'http://example.com/critical-thinking-video', text: 'Critical Thinking Video' }
    ]
  },
  { 
    title: 'Gender Sensitivity', 
    content: 'Learn about gender sensitivity with these resources.',
    links: [
      { type: 'pdf', url: 'http://example.com/gender-sensitivity.pdf', text: 'Gender Sensitivity PDF' },
      { type: 'video', url: 'http://example.com/gender-sensitivity-video', text: 'Gender Sensitivity Video' }
    ]
  },
  { 
    title: 'Ethics', 
    content: 'Explore ethical principles with these resources.',
    links: [
      { type: 'pdf', url: 'http://example.com/ethics.pdf', text: 'Ethics PDF' },
      { type: 'video', url: 'http://example.com/ethics-video', text: 'Ethics Video' }
    ]
  },
  { 
    title: 'Communication', 
    content: 'Improve your communication skills with these resources.',
    links: [
      { type: 'pdf', url: 'http://example.com/communication.pdf', text: 'Communication PDF' },
      { type: 'video', url: 'http://example.com/communication-video', text: 'Communication Video' }
    ]
  },
];

const Resources = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  return (
    <div>
      <Navbar/>
      <div className="resources" style={{ marginTop: '50px' }}>
        <div className="cards">
          {resourcesData.map((resource, index) => (
            <div
              key={index}
              className={`card ${expandedCard === index ? 'expanded' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <h2>{resource.title}</h2>
              {expandedCard === index && (
                <div className="content">
                  <p>{resource.content}</p>
                  <ul>
                    {resource.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.text}</a>
                      </li>
                    ))}
                  </ul>
                  {/* <button className="close-btn" onClick={() => setExpandedCard(null)}>&times;</button> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
