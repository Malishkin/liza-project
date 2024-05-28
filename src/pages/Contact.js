import React, { useState } from "react";
import "./Contact.css";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
      }, 3000);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      {messageSent && (
        <div className="confirmation-message">Message sent successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      <div className="social-follow">
        <a
          href="https://www.instagram.com/el.messeg?igsh=MWdiZmloZXRhbXhuNQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-follow"
        >
          <FaInstagram /> Follow on Instagram
        </a>
      </div>
    </div>
  );
};

export default Contact;
