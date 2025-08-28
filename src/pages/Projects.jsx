import "./Projects.css";
import safeSpaceLogo from "../assets/SafeSpaceLogo.jpg";
export default function Projects() {
  const isDark =
    typeof document !== "undefined" && document.body.classList.contains("dark");
  const cardStyle = isDark
    ? { background: "#16213a", color: "#fff", border: "1.5px solid #223" }
    : {
        background:
          "linear-gradient(120deg,#f7e1c1 0%,#e6b07a 60%,#a97c50 100%)",
        color: "#5a3a1b",
        border: "1.5px solid #a97c50",
      };
  const pageBg = isDark ? { background: "#0a1026", color: "#fff" } : {};
  return (
    <div className="projects">
      <h2>My Projects</h2>

      <div className="project-cards">
        {/* Project 1 */}
        <div className="card">
          <h3>A Space original design</h3>
          <p>
            The first website I designed and developed from scratch using HTML
            and vanilla CSS.{" "}
            <a
              href="https://github.com/Timothe-calvin/A-Space"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>

        {/* Project 2 */}
        <div className="card">
          <h3>The Second Site</h3>
          <p>
            The second static website I made for my server and bot.{" "}
            <a
              href="https://github.com/Timothe-calvin/timothe-calvins.github.io"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>

        {/* Project 3 */}
        <div className="card">
          <h3>A Discord Bot</h3>
          <p>
            A Discord bot built with JavaScript and Node.js, featuring commands
            for various utilities.{" "}
            <a
              href="https://github.com/Timothe-calvin/bot"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </a>
          </p>

          {/* Card image (imported from assets) */}
          <div className="card-image">
            <img src={safeSpaceLogo} alt="SafeSpace Logo" />
          </div>
        </div>
      </div>

      {/* Full-width image under cards */}
      <div className="projects-banner">
        <img src="/safe space.jpg" alt="Safe Space" />
        <br />
        <a
          href="https://asafespace.neocities.org/"
          target="_blank"
          rel="noreferrer"
        >
          Visit Safe Space
        </a>
      </div>
      {/* Page navigation */}
      <nav className="page-nav">
        <a href="/">Home</a> | <a href="/projects">Projects</a> | <a href="/contact">Contact</a> | <a href="/resume">Resume</a>
      </nav>
    </div>
  );
}
