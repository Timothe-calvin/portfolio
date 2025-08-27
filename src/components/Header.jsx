import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

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
