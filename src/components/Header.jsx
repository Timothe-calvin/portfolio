import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });



  useEffect(() => {
    // Always ensure only one of 'light-mode' or 'dark-mode' is present
    if (mode !== "light" && mode !== "dark") {
      setMode("light");
      return;
    }
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(mode === "dark" ? "dark-mode" : "light-mode");
    localStorage.setItem("theme", mode);

    // Dynamically load the correct CSS file
    let darkLink = document.getElementById("dark-mode-css");
    let lightLink = document.getElementById("light-mode-css");
    if (mode === "dark") {
      if (!darkLink) {
        darkLink = document.createElement("link");
        darkLink.rel = "stylesheet";
        darkLink.id = "dark-mode-css";
  darkLink.href = "/dark-mode.css";
        document.head.appendChild(darkLink);
      }
      if (lightLink) {
        lightLink.parentNode.removeChild(lightLink);
      }
    } else {
      if (!lightLink) {
        lightLink = document.createElement("link");
        lightLink.rel = "stylesheet";
        lightLink.id = "light-mode-css";
  lightLink.href = "/light-mode.css";
        document.head.appendChild(lightLink);
      }
      if (darkLink) {
        darkLink.parentNode.removeChild(darkLink);
      }
    }
  }, [mode]);

  // On mount, ensure body has a mode class
  useEffect(() => {
    if (!document.body.classList.contains("light-mode") && !document.body.classList.contains("dark-mode")) {
      document.body.classList.add("light-mode");
      setMode("light");
    }
  }, []);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };


  return (
  <header className="header">
      <div className="header-inner">
        <span className="header-name">
          <img src="/Selfie.jpg" alt="Selfie" className="header-selfie" />
          {import.meta.env.VITE_NAME}
        </span>
        <h1 className="header-title">Portfolio</h1>
        <div className="header-right">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/resume">Resume</Link>
            </li>
            <li>
              <a
                href="/resume-harvard.pdf"
                download
                className="resume-download resume-download-icon"
                target="_blank"
                rel="noopener noreferrer"
                title="Download Resume"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16.5a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v10.5a1 1 0 0 1-1 1Z"/><path fill="currentColor" d="M7.21 13.79a1 1 0 0 1 1.42-1.42l2.29 2.3 2.29-2.3a1 1 0 1 1 1.42 1.42l-3 3a1 1 0 0 1-1.42 0l-3-3Z"/><path fill="currentColor" d="M5 20a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2H5Z"/></svg>
              </a>
            </li>
          </ul>
          <button
            onClick={toggleMode}
            className="mode-toggle"
            aria-label="Toggle dark/light mode"
          >
            {mode === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </header>
  );
}
