"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

const CYAN = "0, 229, 255";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let points: Point[] = [];
    let lastTimestamp = 0;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const createPoints = () => {
      const area = width * height;
      const count = Math.max(14, Math.min(34, Math.round(area / 42000)));

      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        radius: 0.9 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (timestamp: number, advance = true) => {
      context.clearRect(0, 0, width, height);

      const connectionDistance = Math.min(175, Math.max(125, width * 0.15));

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];

        if (advance) {
          point.x += point.vx;
          point.y += point.vy;

          if (point.x < -20) point.x = width + 20;
          if (point.x > width + 20) point.x = -20;
          if (point.y < -20) point.y = height + 20;
          if (point.y > height + 20) point.y = -20;
        }

        for (
          let secondIndex = index + 1;
          secondIndex < points.length;
          secondIndex += 1
        ) {
          const other = points[secondIndex];
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance > connectionDistance) {
            continue;
          }

          const strength = 1 - distance / connectionDistance;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(${CYAN}, ${0.04 + strength * 0.24})`;
          context.lineWidth = 0.7;
          context.stroke();
        }
      }

      points.forEach((point) => {
        const pulse = 0.75 + Math.sin(timestamp / 900 + point.phase) * 0.25;

        context.save();
        context.shadowColor = `rgba(${CYAN}, 0.9)`;
        context.shadowBlur = 10 * pulse;
        context.beginPath();
        context.arc(point.x, point.y, point.radius * pulse, 0, Math.PI * 2);
        context.fillStyle = `rgba(${CYAN}, ${0.5 + pulse * 0.35})`;
        context.fill();
        context.restore();
      });
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createPoints();
      draw(performance.now(), false);
    };

    const animate = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;

      if (delta >= 16) {
        draw(timestamp);
        lastTimestamp = timestamp;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resize();
    resizeObserver.observe(parent);

    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(animate);
    }

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="network-background"
      aria-hidden="true"
    />
  );
}
