import React, { useState } from "react";
import "./Contact.css";
import { FaInstagram } from "react-icons/fa";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:malishkin2002@gmail.com?subject=Contact Form Submission&body=Name: ${encodeURIComponent(
      name
    )}%0D%0AEmail: ${encodeURIComponent(
      email
    )}%0D%0AMessage: ${encodeURIComponent(message)}`;

    // Simulate clicking the mailto link
    const a = document.createElement("a");
    a.href = mailtoLink;
    a.click();

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
    }, 3000);
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
