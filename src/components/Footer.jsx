import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const email = import.meta.env.VITE_EMAIL;
  const github = import.meta.env.VITE_GITHUB;
  const website = import.meta.env.VITE_WEBSITE;

  return (
  <footer className="footer">
      <p>
        © {new Date().getFullYear()} {import.meta.env.VITE_NAME}
      </p>
      <div className="footer-info">
        <p>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          GitHub: {" "}
          <a href={github} target="_blank" rel="noreferrer">
            {github}
          </a>
        </p>
        <p>
          Website: {" "}
          <a href={website} target="_blank" rel="noreferrer">
            {website}
          </a>
        </p>
        <p>
          <Link to="/resume">Resume Page</Link> | {" "}
          <a href="/resume.pdf" download>
            Download Resume
          </a>
        </p>
      </div>
    </footer>
  );
}
