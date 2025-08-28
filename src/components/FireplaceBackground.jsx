// FireplaceBackground.jsx
// A React component that renders a soft animated fireplace effect for light mode only.
import { useEffect, useRef, useState } from "react";


// Draw a mini fireplace at (x, y), scale s
function drawMiniFireplace(ctx, x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  // Draw logs
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = "#a0522d";
  ctx.strokeStyle = "#7b3f00";
  ctx.lineWidth = 2;
  ctx.save();
  ctx.rotate(-0.18);
  ctx.fillRect(-18, 8, 36, 7);
  ctx.strokeRect(-18, 8, 36, 7);
  ctx.restore();
  ctx.save();
  ctx.rotate(0.18);
  ctx.fillRect(-18, 0, 36, 7);
  ctx.strokeRect(-18, 0, 36, 7);
  ctx.restore();
  // Draw fire (simple flame)
  ctx.globalAlpha = 0.8;
  let grad = ctx.createRadialGradient(0, 0, 2, 0, 0, 16);
  grad.addColorStop(0, "#fffbe9");
  grad.addColorStop(0.3, "#ffe066");
  grad.addColorStop(0.7, "#ffb347");
  grad.addColorStop(1, "#ff5252");
  ctx.beginPath();
  ctx.ellipse(0, 0, 12, 18, 0, 0, 2 * Math.PI);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}

// Draw a mini cat at (x, y), scale s, type t
function drawMiniCat(ctx, x, y, s = 1, t = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  // Cat body
  ctx.globalAlpha = 0.92;
  const colors = ["#f5c16c", "#b0aeb1", "#222", "#fff", "#e07a5f"];
  const earColors = ["#eab676", "#888", "#444", "#eee", "#c94f4f"];
  ctx.fillStyle = colors[t % colors.length];
  ctx.beginPath();
  ctx.ellipse(0, 10, 13, 10, 0, 0, 2 * Math.PI);
  ctx.fill();
  // Head
  ctx.beginPath();
  ctx.ellipse(0, 0, 10, 10, 0, 0, 2 * Math.PI);
  ctx.fill();
  // Ears
  ctx.save();
  ctx.fillStyle = earColors[t % earColors.length];
  ctx.beginPath();
  ctx.moveTo(-7, -7);
  ctx.lineTo(-3, -12);
  ctx.lineTo(-1, -5);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(7, -7);
  ctx.lineTo(3, -12);
  ctx.lineTo(1, -5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  // Eyes
  ctx.save();
  ctx.fillStyle = t === 2 ? "#fff" : "#222";
  ctx.beginPath();
  ctx.arc(-3, -2, 1.2, 0, 2 * Math.PI);
  ctx.arc(3, -2, 1.2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Nose
  ctx.save();
  ctx.fillStyle = "#e07a5f";
  ctx.beginPath();
  ctx.arc(0, 1, 0.8, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  // Tail
  ctx.save();
  ctx.strokeStyle = colors[t % colors.length];
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 12);
  ctx.quadraticCurveTo(18, 18, 12, 2);
  ctx.stroke();
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

  // Mini fireplaces and cats (useRef for mutability across frames)
  const miniFireplacesRef = useRef([
    { x: 80, y: 120, s: 0.7, dx: 0.3, dy: 0.08, baseY: 120, phase: 0 },
    { x: 320, y: 220, s: 0.6, dx: 0.22, dy: 0.09, baseY: 220, phase: 1.2 },
    { x: 600, y: 400, s: 0.8, dx: 0.18, dy: 0.07, baseY: 400, phase: 2.1 },
  ]);
  const miniCatsRef = useRef([
    { x: 200, y: 300, s: 0.7, dx: 0.19, dy: 0.07, baseY: 300, t: 0, phase: 0.5 },
    { x: 500, y: 180, s: 0.6, dx: 0.15, dy: 0.09, baseY: 180, t: 1, phase: 1.7 },
    { x: 900, y: 350, s: 0.8, dx: 0.13, dy: 0.08, baseY: 350, t: 2, phase: 2.7 },
    { x: 1200, y: 250, s: 0.7, dx: 0.17, dy: 0.06, baseY: 250, t: 3, phase: 3.2 },
    { x: 700, y: 500, s: 0.9, dx: 0.21, dy: 0.1, baseY: 500, t: 4, phase: 4.1 },
  ]);

  useEffect(() => {
    if (!isLight) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Soft background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#f7e1c1");
      bgGrad.addColorStop(0.5, "#e6b07a");
      bgGrad.addColorStop(1, "#a97c50");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
      // Animate and draw mini fireplaces
      for (let i = 0; i < miniFireplacesRef.current.length; i++) {
        let f = miniFireplacesRef.current[i];
        f.x += f.dx;
        f.y = f.baseY + Math.sin(Date.now()/900 + f.phase) * 12;
        if (f.x > width + 40) {
          f.x = -40;
        }
        drawMiniFireplace(ctx, f.x, f.y, f.s);
      }
      // Animate and draw mini cats
      for (let i = 0; i < miniCatsRef.current.length; i++) {
        let c = miniCatsRef.current[i];
        c.x += c.dx;
        c.y = c.baseY + Math.sin(Date.now()/1100 + c.phase) * 16;
        if (c.x > width + 40) {
          c.x = -40;
        }
        drawMiniCat(ctx, c.x, c.y, c.s, c.t);
      }
      animationId = requestAnimationFrame(draw);
    }
    function handleResize() {
      resize();
    }
    resize();
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
