import htmlLogo from "../assets/html-logo.svg";
import cssLogo from "../assets/css-logo.svg";
import jsLogo from "../assets/js-logo.svg";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const name = import.meta.env.VITE_NAME;
  const isDark = typeof document !== "undefined" && document.body.classList.contains("dark");
  const cardStyle = isDark
    ? { background: "#16213a", color: "#fff", border: "1.5px solid #223" }
    : { background: "linear-gradient(120deg,#f7e1c1 0%,#e6b07a 60%,#a97c50 100%)", color: "#5a3a1b", border: "1.5px solid #a97c50" };
  const pageBg = isDark
    ? { background: "#0a1026", color: "#fff" }
    : { background: "linear-gradient(120deg,#f7e1c1 0%,#e6b07a 60%,#a97c50 100%)" };

  return (
  <div className="home">
      {/* Hero Section */}
  <section className="hero hero-card">
        <img src="/Selfie.jpg" alt="Selfie" className="selfie" />
        <h1 className="hero-title">{name}</h1>
        <h2 className="hero-role">Frontend Developer</h2>
        <p className="hero-tagline">
          Building clean, modern, and impactful web experiences.
        </p>
      </section>

      {/* Skills Section */}
  <section className="skills skills-card">
        <h3>Core Skills</h3>
        <div className="skills-logos">
          <div className="skill-card">
            <img src={htmlLogo} alt="HTML" />
            <span>HTML</span>
          </div>
          <div className="skill-card">
            <img src={cssLogo} alt="CSS" />
            <span>CSS</span>
          </div>
          <div className="skill-card">
            <img src={jsLogo} alt="JavaScript" />
            <span>JavaScript</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
  <section className="cta cta-card">
        <p className="cta-text">
          Open to new opportunities, collaborations, and creative projects.<br />
          Let’s connect and build something impactful together!
        </p>
        <Link to="/contact" className="cta-btn">Contact Me</Link>
      </section>
    </div>
  );
}
