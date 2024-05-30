import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Layout.css";

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentClass, setContentClass] = useState("fade-in");
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [location]);

  useEffect(() => {
    setContentClass("");
    setTimeout(() => {
      setContentClass("fade-in");
    }, 0);
  }, [location.pathname]);

  useDocumentTitle({
    "/": "El Messeg - Work",
    "/about": "El Messeg - About",
    "/contact": "El Messeg - Contact",
    "/admin": "El Messeg - Admin",
    "/login": "El Messeg - Login",
  });

  return (
    <div>
      <header>
        <div className="container">
          <h1>El Messeg</h1>
          <nav>
            <div
              className={`menu-icon ${menuOpen ? "change" : ""}`}
              id="menu-icon"
              onClick={toggleMenu}
            >
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
            </div>
            <ul id="nav-links" className={menuOpen ? "show" : ""}>
              <li>
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                  onClick={closeMenu}
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={location.pathname === "/about" ? "active" : ""}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={location.pathname === "/contact" ? "active" : ""}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/el.messeg?igsh=MWdiZmloZXRhbXhuNQ=="
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div id="content" className={contentClass}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
