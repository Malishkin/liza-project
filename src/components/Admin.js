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
      images: [...e.target.files].map((file) => URL.createObjectURL(file)),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/content", form, {
        headers: { "x-auth-token": token },
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
              <img key={idx} src={img} alt={item.title} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
