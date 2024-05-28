import React, { useState } from "react";
import "./Work.css";
import axios from "axios";

const Work = () => {
  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div className="work-container">
      <h2>Upload Your Work</h2>
      {uploadSuccess && (
        <div className="confirmation-message">Image uploaded successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Upload an Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Work;
