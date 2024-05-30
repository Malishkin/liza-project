import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ setToken }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="filter">
      <h2>Login</h2>
      <div className="filter-row">
        <form onSubmit={handleSubmit}>
          <div className="filter-group">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="filter-group">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
