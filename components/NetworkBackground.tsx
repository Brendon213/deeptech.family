"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
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

    const pointer: PointerState = {
      x: 0,
      y: 0,
      active: false,
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const createPoints = () => {
      const area = width * height;
      const count = Math.max(18, Math.min(40, Math.round(area / 36000)));

      points = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;

        return {
          x,
          y,
          homeX: x,
          homeY: y,
          vx: 0,
          vy: 0,
          radius: 0.9 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const updatePoint = (point: Point, timestamp: number) => {
      const driftX = Math.sin(timestamp / 3600 + point.phase) * 0.04;
      const driftY = Math.cos(timestamp / 4200 + point.phase) * 0.04;

      point.homeX += driftX;
      point.homeY += driftY;

      if (point.homeX < -20) point.homeX = width + 20;
      if (point.homeX > width + 20) point.homeX = -20;
      if (point.homeY < -20) point.homeY = height + 20;
      if (point.homeY > height + 20) point.homeY = -20;

      let targetX = point.homeX;
      let targetY = point.homeY;

      if (pointer.active) {
        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const distance = Math.hypot(dx, dy);
        const magnetRadius = 190;

        if (distance < magnetRadius) {
          const strength = 1 - distance / magnetRadius;
          const pull = strength * strength;

          targetX = point.homeX + (pointer.x - point.homeX) * pull * 0.62;
          targetY = point.homeY + (pointer.y - point.homeY) * pull * 0.62;
        }
      }

      point.vx += (targetX - point.x) * 0.018;
      point.vy += (targetY - point.y) * 0.018;

      point.vx *= 0.9;
      point.vy *= 0.9;

      point.x += point.vx;
      point.y += point.vy;
    };

    const draw = (timestamp: number, advance = true) => {
      context.clearRect(0, 0, width, height);

      if (advance) {
        points.forEach((point) => updatePoint(point, timestamp));
      }

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];

        for (
          let secondIndex = index + 1;
          secondIndex < points.length;
          secondIndex += 1
        ) {
          const other = points[secondIndex];
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distance = Math.hypot(dx, dy);

          const pointNearPointer =
            pointer.active &&
            Math.hypot(point.x - pointer.x, point.y - pointer.y) < 190;
          const otherNearPointer =
            pointer.active &&
            Math.hypot(other.x - pointer.x, other.y - pointer.y) < 190;

          const connectionDistance =
            pointNearPointer && otherNearPointer ? 190 : 112;

          if (distance > connectionDistance) {
            continue;
          }

          const strength = 1 - distance / connectionDistance;
          const alpha =
            pointNearPointer && otherNearPointer
              ? 0.08 + strength * 0.42
              : 0.025 + strength * 0.14;

          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(${CYAN}, ${alpha})`;
          context.lineWidth =
            pointNearPointer && otherNearPointer ? 0.95 : 0.65;
          context.stroke();
        }
      }

      points.forEach((point) => {
        const pulse = 0.75 + Math.sin(timestamp / 900 + point.phase) * 0.25;
        const nearPointer =
          pointer.active &&
          Math.hypot(point.x - pointer.x, point.y - pointer.y) < 190;

        context.save();
        context.shadowColor = `rgba(${CYAN}, ${nearPointer ? 1 : 0.8})`;
        context.shadowBlur = (nearPointer ? 15 : 9) * pulse;
        context.beginPath();
        context.arc(
          point.x,
          point.y,
          point.radius * pulse * (nearPointer ? 1.18 : 1),
          0,
          Math.PI * 2,
        );
        context.fillStyle = `rgba(${CYAN}, ${nearPointer ? 0.95 : 0.7})`;
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

    const updatePointer = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;

      if (reducedMotion) {
        draw(performance.now(), true);
      }
    };

    const clearPointer = () => {
      pointer.active = false;

      if (reducedMotion) {
        draw(performance.now(), true);
      }
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

    parent.addEventListener("pointermove", updatePointer);
    parent.addEventListener("pointerleave", clearPointer);

    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(animate);
    }

    return () => {
      resizeObserver.disconnect();
      parent.removeEventListener("pointermove", updatePointer);
      parent.removeEventListener("pointerleave", clearPointer);
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
