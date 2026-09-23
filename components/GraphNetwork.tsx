"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  phase: number;
  driftX: number;
  driftY: number;
  offsetX: number;
  offsetY: number;
};

type PointerState = {
  clientX: number;
  clientY: number;
  active: boolean;
};

export default function GraphNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let points: Point[] = [];
    let links: Array<[number, number]> = [];
    let width = 0;
    let height = 0;

    const pointer: PointerState = {
      clientX: 0,
      clientY: 0,
      active: false,
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = Math.max(window.innerHeight, document.documentElement.scrollHeight);

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      let seed = 0x6d2b79f5;
      const random = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
      };

      const count = Math.min(
        260,
        Math.max(90, Math.floor((width * height) / 32000)),
      );

      points = [];
      for (let index = 0; index < count; index += 1) {
        points.push({
          x: random() * width,
          y: random() * height,
          phase: random() * Math.PI * 2,
          driftX: 2 + random() * 3,
          driftY: 2 + random() * 3,
          offsetX: 0,
          offsetY: 0,
        });
      }

      const maxLinkDistance = Math.max(150, Math.min(260, width * 0.24));
      const connected = new Set<string>();
      links = [];

      points.forEach((point, index) => {
        points
          .map((candidate, candidateIndex) => ({
            candidateIndex,
            distance: Math.hypot(
              point.x - candidate.x,
              point.y - candidate.y,
            ),
          }))
          .filter(({ candidateIndex }) => candidateIndex !== index)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 3)
          .forEach(({ candidateIndex, distance }) => {
            if (distance > maxLinkDistance) return;

            const key = `${Math.min(index, candidateIndex)}:${Math.max(
              index,
              candidateIndex,
            )}`;

            if (connected.has(key)) return;

            connected.add(key);
            links.push([index, candidateIndex]);
          });
      });
    };

    const getPositions = (time: number) => {
      const pointerX = pointer.clientX;
      const pointerY = pointer.clientY + window.scrollY;
      const magnetRadius = 190;

      return points.map((point) => {
        const baseX =
          point.x + Math.sin(time * 0.00022 + point.phase) * point.driftX;
        const baseY =
          point.y +
          Math.cos(time * 0.00018 + point.phase * 1.13) * point.driftY;

        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (pointer.active) {
          const dx = pointerX - baseX;
          const dy = pointerY - baseY;
          const distance = Math.hypot(dx, dy);

          if (distance < magnetRadius) {
            const strength = 1 - distance / magnetRadius;
            const pull = strength * strength * 0.52;
            targetOffsetX = dx * pull;
            targetOffsetY = dy * pull;
          }
        }

        const easing = prefersReducedMotion.matches ? 1 : 0.09;
        point.offsetX += (targetOffsetX - point.offsetX) * easing;
        point.offsetY += (targetOffsetY - point.offsetY) * easing;

        return {
          x: baseX + point.offsetX,
          y: baseY + point.offsetY,
        };
      });
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const positions = getPositions(time);
      const pointerX = pointer.clientX;
      const pointerY = pointer.clientY + window.scrollY;
      const magnetRadius = 190;

      links.forEach(([from, to]) => {
        const start = positions[from];
        const end = positions[to];

        const startNear =
          pointer.active &&
          Math.hypot(start.x - pointerX, start.y - pointerY) < magnetRadius;
        const endNear =
          pointer.active &&
          Math.hypot(end.x - pointerX, end.y - pointerY) < magnetRadius;

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle =
          startNear && endNear
            ? "rgba(0, 212, 255, 0.18)"
            : "rgba(0, 212, 255, 0.045)";
        context.lineWidth = startNear && endNear ? 1.15 : 1;
        context.stroke();
      });

      if (pointer.active) {
        const nearby = positions
          .map((position, index) => ({
            ...position,
            index,
            pointerDistance: Math.hypot(
              position.x - pointerX,
              position.y - pointerY,
            ),
          }))
          .filter(({ pointerDistance }) => pointerDistance < magnetRadius);

        for (let first = 0; first < nearby.length; first += 1) {
          for (let second = first + 1; second < nearby.length; second += 1) {
            const a = nearby[first];
            const b = nearby[second];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);

            if (distance > 135) continue;

            const strength = 1 - distance / 135;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(0, 212, 255, ${0.06 + strength * 0.22})`;
            context.lineWidth = 0.85;
            context.stroke();
          }
        }
      }

      positions.forEach(({ x, y }, index) => {
        const nearPointer =
          pointer.active &&
          Math.hypot(x - pointerX, y - pointerY) < magnetRadius;

        context.save();
        context.fillStyle = nearPointer
          ? "rgba(0, 212, 255, 0.42)"
          : index % 4 === 0
            ? "rgba(0, 212, 255, 0.18)"
            : "rgba(0, 212, 255, 0.08)";

        if (nearPointer) {
          context.shadowColor = "rgba(0, 212, 255, 0.65)";
          context.shadowBlur = 10;
        }

        context.beginPath();
        context.arc(
          x,
          y,
          nearPointer ? 1.8 : index % 4 === 0 ? 1.4 : 1,
          0,
          Math.PI * 2,
        );
        context.fill();
        context.restore();
      });
    };

    const updatePointer = (event: PointerEvent) => {
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.active = true;

      if (prefersReducedMotion.matches) {
        draw(0);
      }
    };

    const clearPointer = () => {
      pointer.active = false;

      if (prefersReducedMotion.matches) {
        draw(0);
      }
    };

    resize();

    const render = (time: number) => {
      draw(time);
      animationFrame = window.requestAnimationFrame(render);
    };

    if (prefersReducedMotion.matches) {
      draw(0);
    } else {
      animationFrame = window.requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer);
    document.documentElement.addEventListener("pointerleave", clearPointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      document.documentElement.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />;
}
