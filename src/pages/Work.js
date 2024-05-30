import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Work = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="work-container">
      {content.map(item => (
        <div key={item._id} className="work-category">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <div className="work-gallery">
            {item.images.map((img, idx) => (
              <div key={idx} className="work-item">
                <img src={`http://localhost:5000/${img}`} alt={item.title} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Work;
