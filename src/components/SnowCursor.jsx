
import { useEffect, useState } from "react";


export default function SnowCursor() {
  const [isLight, setIsLight] = useState(() =>
    typeof document !== "undefined" && document.body.classList.contains("light-mode")
  );

  useEffect(() => {
    function checkMode() {
      setIsLight(document.body.classList.contains("light-mode"));
    }
    const observer = new MutationObserver(checkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    checkMode();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let snowflakes = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let running = true;

    function createSnowflake(x, y) {
      // Colorful in light mode, white in dark
      const colors = isLight
        ? ["#fff", "#b3e0ff", "#ffe0f7", "#ffe6b3", "#c1ffd7", "#ffd6a0", "#ffb97a"]
        : ["#fff"];
      return {
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 8,
        r: Math.random() * 3 + 2,
        speed: Math.random() * 1.5 + 1.2,
        drift: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.5,
        angle: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    }

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Add a new snowflake at the cursor
      snowflakes.push(createSnowflake(mouseX, mouseY));
      if (snowflakes.length > 60) snowflakes.shift();
    }

    function animate() {
      if (!running) return;
      // Remove old flakes
      snowflakes = snowflakes.filter(f => f.y < window.innerHeight + 10 && f.opacity > 0.05);
      // Move flakes
      for (const f of snowflakes) {
        f.y += f.speed;
        f.x += Math.sin(f.angle) * f.drift;
        f.angle += 0.01 + Math.random() * 0.01;
        f.opacity -= 0.002 + Math.random() * 0.002;
      }
      draw();
      requestAnimationFrame(animate);
    }

    // Create a canvas overlay
    let canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 9999;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    let ctx = canvas.getContext("2d");

    // On click, open mail client or Gmail compose
    function handleClick() {
      const to = "yourgmailaddress@gmail.com"; // <-- replace with your Gmail
      const subject = encodeURIComponent("Contact from Portfolio");
      const body = encodeURIComponent("Hi,\n\nI wanted to reach out to you from your portfolio site.\n\n");
      // If user is on Gmail, open Gmail compose. Otherwise, use mailto.
      if (window.location.hostname.includes("mail.google.com")) {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`);
      } else {
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      }
    }
    canvas.addEventListener("click", handleClick);

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const f of snowflakes) {
        ctx.save();
        ctx.globalAlpha = f.opacity;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
        ctx.fillStyle = f.color;
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    animate();

    return () => {
      running = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [isLight]);

  return null;
}
