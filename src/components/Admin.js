import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = ({ token }) => {
  const [content, setContent] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/content", {
        headers: { "x-auth-token": token },
      })
      .then((res) => setContent(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setForm({
      ...form,
      images: e.target.files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    Array.from(form.images).forEach((file) => {
      formData.append("images", file);
    });

    axios
      .post("http://localhost:5000/api/content", formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setContent([...content, res.data]);
        setForm({
          title: "",
          description: "",
          images: [],
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        ></textarea>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
        />
        <button type="submit">Save</button>
      </form>
      <div>
        <h2>Content</h2>
        {content.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.images.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:5000/${img}`}
                alt={item.title}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
