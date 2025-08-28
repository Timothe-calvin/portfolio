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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button
          style={{
            padding: '8px 16px',
            background: '#0078d4',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 16
          }}
          aria-label="Open resume fullscreen"
          onClick={() => {
            const iframe = document.getElementById('resume-iframe');
            if (iframe.requestFullscreen) {
              iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) {
              iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) {
              iframe.msRequestFullscreen();
            } else {
              window.open('/resume-harvard.pdf', '_blank');
            }
          }}
        >
          Full Screen
        </button>
      </div>
      <div className="resume-card" style={{ position: 'relative' }}>
        <h1 className="resume-title">Professional Resume</h1>
        <p className="resume-desc">
          Download my latest resume or view it online. I am committed to
          excellence and continuous growth in my career.
          <br />
          To exit fullscreen put ur mouse to the top right then click the X
        </p>
        <div style={{ position: 'relative', width: '100%' }}>
          <iframe
            id="resume-iframe"
            src="/resume-harvard.pdf"
            title="Resume Preview"
            className="resume-preview"
            style={{ width: '100%', minHeight: 500, borderRadius: 8, border: '1px solid #ccc' }}
          ></iframe>
          <button
            id="exit-fullscreen-btn"
            style={{
              display: 'none',
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 3,
              padding: '4px 12px',
              background: '#d32f2f',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              cursor: 'pointer',
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 1
            }}
            aria-label="Exit fullscreen"
            onClick={() => {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
              }
            }}
          >
            ×
          </button>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{__html:`
        (function() {
          var iframe = document.getElementById('resume-iframe');
          var exitBtn = document.getElementById('exit-fullscreen-btn');
          if (!iframe || !exitBtn) return;
          function onFullScreenChange() {
            if (document.fullscreenElement === iframe) {
              exitBtn.style.display = 'block';
            } else {
              exitBtn.style.display = 'none';
            }
          }
          document.addEventListener('fullscreenchange', onFullScreenChange);
        })();
      `}} />
    </div>
  );
};

export default Resume;
