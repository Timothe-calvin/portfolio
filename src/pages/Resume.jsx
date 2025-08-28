import "./Resume.css";

const Resume = () => {
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
    <div className="resume-page">
      <div className="resume-card">
        <h1 className="resume-title">Professional Resume</h1>
        <p className="resume-desc">
          Download my latest resume or view it online. I am committed to
          excellence and continuous growth in my career.
        </p>
        <iframe
          src="/resume-harvard.pdf"
          title="Resume Preview"
          className="resume-preview"
        ></iframe>
      </div>
    </div>
  );
};

export default Resume;
