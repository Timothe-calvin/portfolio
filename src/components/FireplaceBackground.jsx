// FireplaceBackground.jsx
// A React component that renders a soft animated fireplace effect for light mode only.
import { useEffect, useRef, useState } from "react";

function drawLogs(ctx, width, height) {
  const logY = height - 40;
  const logW = 120;
  const logH = 22;
  ctx.save();
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = "#a0522d";
  ctx.strokeStyle = "#7b3f00";
  ctx.lineWidth = 4;
  ctx.save();
  ctx.translate(width/2 - 30, logY);
  ctx.rotate(-0.18);
  ctx.fillRect(-logW/2, -logH/2, logW, logH);
  ctx.strokeRect(-logW/2, -logH/2, logW, logH);
  ctx.restore();
  ctx.save();
  ctx.translate(width/2 + 30, logY);
  ctx.rotate(0.18);
  ctx.fillRect(-logW/2, -logH/2, logW, logH);
  ctx.strokeRect(-logW/2, -logH/2, logW, logH);
  ctx.restore();
  ctx.restore();
}

export default function FireplaceBackground() {
  const canvasRef = useRef(null);
  const [isLight, setIsLight] = useState(() =>
    typeof document !== "undefined" && document.body.classList.contains("light-mode")
  );

  useEffect(() => {
    function checkLightMode() {
      setIsLight(document.body.classList.contains("light-mode"));
    }
    const observer = new MutationObserver(checkLightMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    checkLightMode();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLight) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let flames = [];
    let embers = [];
    const numFlames = 32;
    const numEmbers = 18;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    function createFlames() {
      flames = Array.from({ length: numFlames }, () => ({
        x: width / 2 + (Math.random() - 0.5) * 120,
        y: height - 80 + Math.random() * 20,
        r: Math.random() * 32 + 24,
        speed: Math.random() * 0.7 + 0.3,
        dx: (Math.random() - 0.5) * 0.5,
        color: `rgba(255, ${Math.floor(140 + Math.random() * 60)}, 60, ${0.18 + Math.random() * 0.18})`,
        alpha: 1,
      }));
    }
    function createEmbers() {
      embers = Array.from({ length: numEmbers }, () => ({
        x: width/2 + (Math.random() - 0.5) * 80,
        y: height - 60 + Math.random() * 10,
        r: Math.random() * 2.5 + 1.5,
        speed: Math.random() * 0.7 + 0.2,
        dx: (Math.random() - 0.5) * 0.7,
        color: `rgba(255,${Math.floor(120+Math.random()*80)},40,${0.18+Math.random()*0.18})`,
        alpha: 1,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#f7e1c1");
      bgGrad.addColorStop(0.5, "#e6b07a");
      bgGrad.addColorStop(1, "#a97c50");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
      const grad = ctx.createRadialGradient(width/2, height-60, 60, width/2, height-60, width/2);
      grad.addColorStop(0, "rgba(255, 200, 120, 0.25)");
      grad.addColorStop(1, "rgba(255, 240, 200, 0.05)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      drawLogs(ctx, width, height);
      for (const f of flames) {
        ctx.save();
        ctx.globalAlpha = f.alpha * (0.85 + 0.15 * Math.sin(Date.now()/180 + f.x));
        ctx.beginPath();
        ctx.ellipse(f.x, f.y, f.r * 0.6, f.r, 0, 0, 2 * Math.PI);
        ctx.fillStyle = f.color;
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 32;
        ctx.fill();
        ctx.restore();
        f.y -= f.speed;
        f.x += f.dx;
        f.alpha -= 0.008 + Math.random() * 0.008;
        if (f.alpha <= 0.01 || f.y < height - 320) {
          f.x = width / 2 + (Math.random() - 0.5) * 120;
          f.y = height - 80 + Math.random() * 20;
          f.r = Math.random() * 32 + 24;
          f.speed = Math.random() * 0.7 + 0.3;
          f.dx = (Math.random() - 0.5) * 0.5;
          f.color = `rgba(255, ${Math.floor(140 + Math.random() * 60)}, 60, ${0.18 + Math.random() * 0.18})`;
          f.alpha = 1;
        }
      }
      for (const e of embers) {
        ctx.save();
        ctx.globalAlpha = e.alpha;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, 2 * Math.PI);
        ctx.fillStyle = e.color;
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        e.y -= e.speed;
        e.x += e.dx;
        e.alpha -= 0.012 + Math.random() * 0.01;
        if (e.alpha <= 0.01 || e.y < height - 340) {
          e.x = width/2 + (Math.random() - 0.5) * 80;
          e.y = height - 60 + Math.random() * 10;
          e.r = Math.random() * 2.5 + 1.5;
          e.speed = Math.random() * 0.7 + 0.2;
          e.dx = (Math.random() - 0.5) * 0.7;
          e.color = `rgba(255,${Math.floor(120+Math.random()*80)},40,${0.18+Math.random()*0.18})`;
          e.alpha = 1;
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    function handleResize() {
      resize();
      createFlames();
    }
    resize();
    createFlames();
    createEmbers();
    draw();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isLight]);

  if (!isLight) return null;
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
        background: "#fffbe9"
      }}
      aria-hidden="true"
    />
  );
}
