import "./Projects.css";
import safeSpaceLogo from "../assets/SafeSpaceLogo.jpg"; // Import from assets

export default function Projects() {
  return (
    <div className="projects">
      <h2>My Projects</h2>

      <div className="project-cards">

        {/* Project 1 */}
        <div className="card">
          <h3>A Space original design</h3>
          <p>
            The first website I designed and developed from scratch using HTML and vanilla CSS.{" "}
            <a href="https://github.com/Timothe-calvin/A-Space" target="_blank" rel="noreferrer">View on GitHub</a>
          </p>
        </div>

        {/* Project 2 */}
        <div className="card">
          <h3>The Second Site</h3>
          <p>
            The second static website I made for my server and bot.{" "}
            <a href="https://github.com/Timothe-calvin/timothe-calvins.github.io" target="_blank" rel="noreferrer">View on GitHub</a>
          </p>
        </div>

        {/* Project 3 */}
        <div className="card">
          <h3>A Discord Bot</h3>
          <p>
            A Discord bot built with JavaScript and Node.js, featuring commands for various utilities.{" "}
            <a href="https://github.com/Timothe-calvin/bot" target="_blank" rel="noreferrer">View on GitHub</a>
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
        <a href="https://asafespace.neocities.org/" target="_blank" rel="noreferrer">Visit Safe Space</a>
      </div>

    </div>
  );
}
