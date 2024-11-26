import { useRef, useEffect } from "react";
import "./RainCanvas.scss";

const RainCanvas = function () {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const lastLightningTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Функция для установки размеров canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize(); // Устанавливаем начальный размер

    // Обработчик изменения размера окна
    window.addEventListener("resize", setCanvasSize);

    const raindrops = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 15 + 10,
      speed: Math.random() * 100 + 5,
    }));

    function drawRain() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(173, 216, 230, 0.8)";
      ctx.lineWidth = 2;

      raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) drop.y = -drop.length;
      });

      const now = Date.now();
      if (now - lastLightningTimeRef.current > 4000 && Math.random() < 0.01) {
        createLightningFlash(ctx, canvas.width, canvas.height);
        lastLightningTimeRef.current = now;
      }

      animationIdRef.current = requestAnimationFrame(drawRain);
    }

    function createLightningFlash(ctx, width, height) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fillRect(0, 0, width, height);

      const flashEnd = () => {
        ctx.clearRect(0, 0, width, height);
      };

      requestAnimationFrame(flashEnd);
    }

    drawRain();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", setCanvasSize); // Очищаем обработчик
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="rainCanvas"
      style={{ display: "block", position: "absolute", top: 0, left: 0 }}
    />
  );
};

export default RainCanvas;
