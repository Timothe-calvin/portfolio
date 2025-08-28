// NightSkyBackground.jsx
// A React component that renders a night sky with moving stars for dark mode only.

import { useEffect, useRef, useState } from "react";

export default function NightSkyBackground() {
  const canvasRef = useRef(null);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" && document.body.classList.contains("dark-mode")
  );

  useEffect(() => {
    function checkDarkMode() {
      setIsDark(document.body.classList.contains("dark-mode"));
    }
    // Listen for class changes on body
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    // Initial check
    checkDarkMode();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDark) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];
    const numStars = 120;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    function createStars() {
      stars = Array.from({ length: numStars }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.15 + 0.05,
        alpha: Math.random() * 0.5 + 0.5,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0a1026";
      ctx.fillRect(0, 0, width, height);
      for (const star of stars) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        star.x += star.speed;
        if (star.x > width) {
          star.x = 0;
          star.y = Math.random() * height;
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    function handleResize() {
      resize();
      createStars();
    }
    resize();
    createStars();
    draw();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  if (!isDark) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "#0a1026"
      }}
      aria-hidden="true"
    />
  );
}
