import htmlLogo from "../assets/html-logo.svg";
import cssLogo from "../assets/css-logo.svg";
import jsLogo from "../assets/js-logo.svg";
import "./Home.css";

export default function Home() {
  const name = import.meta.env.VITE_NAME;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <img src="/Selfie.jpg" alt="Selfie" className="selfie" />
        <h2>Hello, I’m {name}</h2>
        <p>
          Frontend Developer specializing in clean, modern web applications.
        </p>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <h3>My Skills</h3>
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
      <section className="cta">
        <p>
          I’m always open to new opportunities, collaborations, and creative projects.{" "}
          <br />
          Let’s connect and build something impactful together—whether you have a question, an idea, or just want to say hello!
        </p>
      </section>
    </div>
  );
}
