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

const CYAN = "0, 212, 255";
const MAGNET_RADIUS = 215;
const CLUSTER_LINK_DISTANCE = 155;

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
        240,
        Math.max(84, Math.floor((width * height) / 34000)),
      );

      points = Array.from({ length: count }, () => ({
        x: random() * width,
        y: random() * height,
        phase: random() * Math.PI * 2,
        driftX: 2 + random() * 3.5,
        driftY: 2 + random() * 3.5,
        offsetX: 0,
        offsetY: 0,
      }));

      const maxLinkDistance = Math.max(145, Math.min(245, width * 0.23));
      const connected = new Set<string>();
      links = [];

      points.forEach((point, index) => {
        points
          .map((candidate, candidateIndex) => ({
            candidateIndex,
            distance: Math.hypot(point.x - candidate.x, point.y - candidate.y),
          }))
          .filter(({ candidateIndex }) => candidateIndex !== index)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 2)
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

          if (distance < MAGNET_RADIUS) {
            const strength = 1 - distance / MAGNET_RADIUS;
            const pull = Math.pow(strength, 1.7) * 0.72;
            targetOffsetX = dx * pull;
            targetOffsetY = dy * pull;
          }
        }

        const easing = prefersReducedMotion.matches ? 1 : 0.105;
        point.offsetX += (targetOffsetX - point.offsetX) * easing;
        point.offsetY += (targetOffsetY - point.offsetY) * easing;

        return {
          x: baseX + point.offsetX,
          y: baseY + point.offsetY,
        };
      });
    };

    const drawLine = (
      ax: number,
      ay: number,
      bx: number,
      by: number,
      alpha: number,
      lineWidth = 1,
    ) => {
      context.beginPath();
      context.moveTo(ax, ay);
      context.lineTo(bx, by);
      context.strokeStyle = `rgba(${CYAN}, ${alpha})`;
      context.lineWidth = lineWidth;
      context.stroke();
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const positions = getPositions(time);
      const pointerX = pointer.clientX;
      const pointerY = pointer.clientY + window.scrollY;

      links.forEach(([from, to]) => {
        const start = positions[from];
        const end = positions[to];

        const startDistance = Math.hypot(start.x - pointerX, start.y - pointerY);
        const endDistance = Math.hypot(end.x - pointerX, end.y - pointerY);
        const activeLink =
          pointer.active &&
          startDistance < MAGNET_RADIUS &&
          endDistance < MAGNET_RADIUS;

        drawLine(
          start.x,
          start.y,
          end.x,
          end.y,
          activeLink ? 0.2 : 0.036,
          activeLink ? 1.05 : 0.7,
        );
      });

      const nearby = pointer.active
        ? positions
            .map((position, index) => ({
              ...position,
              index,
              pointerDistance: Math.hypot(
                position.x - pointerX,
                position.y - pointerY,
              ),
            }))
            .filter(({ pointerDistance }) => pointerDistance < MAGNET_RADIUS)
            .sort((a, b) => a.pointerDistance - b.pointerDistance)
        : [];

      for (let first = 0; first < nearby.length; first += 1) {
        for (let second = first + 1; second < nearby.length; second += 1) {
          const a = nearby[first];
          const b = nearby[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance > CLUSTER_LINK_DISTANCE) continue;

          const strength = 1 - distance / CLUSTER_LINK_DISTANCE;
          const pointerStrength =
            1 -
            Math.min(
              MAGNET_RADIUS,
              (a.pointerDistance + b.pointerDistance) / 2,
            ) /
              MAGNET_RADIUS;

          drawLine(
            a.x,
            a.y,
            b.x,
            b.y,
            0.08 + strength * 0.26 + pointerStrength * 0.16,
            0.75 + pointerStrength * 0.45,
          );
        }
      }

      nearby.slice(0, 5).forEach((point) => {
        const strength = 1 - point.pointerDistance / MAGNET_RADIUS;
        drawLine(
          pointerX,
          pointerY,
          point.x,
          point.y,
          0.05 + strength * 0.34,
          0.7 + strength * 0.45,
        );
      });

      positions.forEach(({ x, y }, index) => {
        const distanceToPointer = pointer.active
          ? Math.hypot(x - pointerX, y - pointerY)
          : Infinity;
        const nearPointer = distanceToPointer < MAGNET_RADIUS;
        const major = index % 9 === 0;
        const pointerStrength = nearPointer
          ? 1 - distanceToPointer / MAGNET_RADIUS
          : 0;

        context.save();

        if (major || nearPointer) {
          context.shadowColor = `rgba(${CYAN}, ${nearPointer ? 0.9 : 0.5})`;
          context.shadowBlur = nearPointer
            ? 10 + pointerStrength * 12
            : 9;
        }

        context.fillStyle = nearPointer
          ? `rgba(${CYAN}, ${0.24 + pointerStrength * 0.58})`
          : major
            ? `rgba(${CYAN}, 0.34)`
            : `rgba(${CYAN}, 0.1)`;

        context.beginPath();
        context.arc(
          x,
          y,
          nearPointer
            ? 1.35 + pointerStrength * 1.55
            : major
              ? 2.05
              : 0.95,
          0,
          Math.PI * 2,
        );
        context.fill();
        context.restore();
      });

      if (pointer.active && nearby.length > 0) {
        context.save();
        context.shadowColor = `rgba(${CYAN}, 0.75)`;
        context.shadowBlur = 10;
        context.fillStyle = `rgba(${CYAN}, 0.32)`;
        context.beginPath();
        context.arc(pointerX, pointerY, 1.4, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
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
