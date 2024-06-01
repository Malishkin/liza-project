import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Work.css";

const Work = () => {
  const [workData, setWorkData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/content", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => setWorkData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="work-container">
      <div className="work-section">
        {workData.map((categoryData, index) => (
          <div className="work-category" key={index}>
            <div className="work-gallery">
              {categoryData.images.map((image, idx) => (
                <div className="work-item" key={idx}>
                  <img src={image} alt={`Work ${idx + 1}`} />
                  {image === categoryData.shortImage && (
                    <h2 className="category-title">{categoryData.category}</h2>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
