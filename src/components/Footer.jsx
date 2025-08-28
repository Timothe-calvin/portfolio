
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const email = import.meta.env.VITE_EMAIL;
  const github = import.meta.env.VITE_GITHUB;
  const website = import.meta.env.VITE_WEBSITE;
  const linkedin = import.meta.env.VITE_LINKEDIN;

  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {import.meta.env.VITE_NAME}
      </p>
      <div className="footer-info">
        <p>
          <span className="footer-label">Email:</span>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        {github && (
          <p>
            <span className="footer-label">GitHub:</span>
            <a href={github} target="_blank" rel="noreferrer">
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
              GitHub
            </a>
          </p>
        )}
        {linkedin && (
          <p>
            <span className="footer-label">LinkedIn:</span>
            <a href={linkedin} target="_blank" rel="noreferrer">
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              LinkedIn
            </a>
          </p>
        )}
        {website && (
          <p>
            <span className="footer-label">Website:</span>
            <a href={website} target="_blank" rel="noreferrer">
              {website}
            </a>
          </p>
        )}
        <p>
          <span className="footer-label">Resume:</span>
          <Link to="/resume">Resume Page</Link> | {" "}
          <a href="/resume.pdf" download>
            Download Resume
          </a>
        </p>
      </div>
    </footer>
  );
}
