import { useEffect, useRef } from "react";
import "./AnimatedBackground.css";

function useAnimatedBubbles(enabled) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let bubbles = [];
    const numBubbles = 32;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    function createBubbles() {
      bubbles = Array.from({ length: numBubbles }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 32 + 18,
        speed: Math.random() * 0.3 + 0.1,
        dx: (Math.random() - 0.5) * 0.3,
        color: `hsla(${Math.random() * 60 + 180}, 80%, 85%, 0.35)`,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const b of bubbles) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        b.y -= b.speed;
        b.x += b.dx;
        if (b.y + b.r < 0) {
          b.y = height + b.r;
          b.x = Math.random() * width;
        }
        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
      }
      animationId = requestAnimationFrame(draw);
    }
    function handleResize() {
      resize();
      createBubbles();
    }
    resize();
    createBubbles();
    draw();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [enabled]);
  return canvasRef;
}

export default function AnimatedBackground() {
  const isDark = typeof document !== "undefined" && document.body.classList.contains("dark");
  const isLight = !isDark;
  const starCanvasRef = useRef(null);
  const bubbleCanvasRef = useAnimatedBubbles(isLight);
  const mouseCanvasRef = useRef(null);

  // Mouse particles effect
  useEffect(() => {
    const canvas = mouseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    function addParticle(x, y) {
      particles.push({
        x,
        y,
        r: Math.random() * 7 + 4,
        alpha: 1,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        color: isDark
          ? `rgba(79,140,255,0.85)` // blue for dark mode
          : `rgba(79,140,255,0.7)`  // blue for light mode
      });
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.018;
        p.r *= 0.98;
        if (p.alpha <= 0.01 || p.r < 1) {
          particles.splice(i, 1);
        }
      }
      requestAnimationFrame(draw);
    }
    function handleResize() {
      resize();
    }
    function handleMouseMove(e) {
      addParticle(e.clientX, e.clientY);
    }
    resize();
    draw();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDark, isLight]);

  // Starry night for dark mode
  useEffect(() => {
    if (!isDark) return;
    const canvas = starCanvasRef.current;
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

  return (
    <>
      {/* Animated gradient fallback for light mode */}
      <div className="animated-bg" aria-hidden="true" style={{ display: isLight ? "block" : "none" }} />
      {/* Animated bubbles for light mode */}
      <canvas
        ref={bubbleCanvasRef}
        className="bubble-canvas"
        style={{ display: isLight ? "block" : "none" }}
      />
      {/* Starry night for dark mode */}
      <canvas
        ref={starCanvasRef}
        className="star-canvas"
        style={{ display: isDark ? "block" : "none" }}
      />
      {/* Mouse particles for both modes */}
      <canvas
        ref={mouseCanvasRef}
        className="mouse-particles-canvas"
        style={{ pointerEvents: "none", zIndex: 1, position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
      />
    </>
  );
}
