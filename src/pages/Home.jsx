
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const name = import.meta.env.VITE_NAME;
  return (
    <div className="home">
      <section className="hero hero-card">
        <img src="/Selfie.jpg" alt="Selfie" className="selfie" />
        <h1 className="hero-title">{name}</h1>
        <h2 className="hero-role">Front End Developer | Technical Skills & Experience</h2>
        <p className="hero-tagline" style={{marginBottom: '1.5rem'}}>
          Versatile and reliable professional with 3+ years of experience in customer support, food service, and sales. Certified in IT Fundamentals, with hands-on experience in modern web technologies and frameworks. Strong problem-solving skills, adaptability, and a commitment to learning and growth in technical roles.
        </p>
      </section>

      <section className="skills skills-card">
        <h3>Technical Skills</h3>
        <ul style={{lineHeight: '1.7', fontSize: '1.08rem', marginBottom: '1.5rem'}}>
          <li>HTML5, CSS3, JavaScript (ES6+), TypeScript</li>
          <li>React, Vite, Bootstrap, Tailwind CSS</li>
          <li>Git, GitHub, VS Code</li>
          <li>RESTful APIs, DOM Manipulation</li>
        </ul>
        <h4 style={{marginTop: '1.5rem'}}>Certifications</h4>
        <ul style={{lineHeight: '1.7', fontSize: '1.08rem'}}>
          <li>IT Fundamentals Certificate (Goodwill Vocational School, 2020)</li>
          <li>Git and GitHub (IBM Coursera)</li>
          <li>HTML, CSS, JavaScript - Intro to Software (IBM Coursera)</li>
          <li>Persevere Front End Web Development</li>
        </ul>
      </section>

      <section className="skills skills-card">
        <h3>Technical Experience</h3>
        <ul style={{lineHeight: '1.7', fontSize: '1.08rem'}}>
          <li><b>Front End Development (Persevere, April 2025)</b></li>
          <li><b>Back End Development (Persevere, Current)</b></li>
        </ul>
      </section>

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
