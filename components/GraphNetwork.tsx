"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  phase: number;
  velocityX: number;
  velocityY: number;
  offsetX: number;
  offsetY: number;
};

type PointerState = {
  clientX: number;
  clientY: number;
  active: boolean;
};

const CYAN = "0, 212, 255";
const MAGNET_RADIUS = 230;
const BASE_LINK_DISTANCE = 175;
const CLUSTER_LINK_DISTANCE = 128;

export default function GraphNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let animationFrame = 0;
    let points: Point[] = [];
    let links: Array<[number, number]> = [];
    let width = 0;
    let height = 0;
    let documentHeight = 0;
    let pixelRatio = 1;
    let lastFrame = 0;
    let lastLinkUpdate = 0;
    let seed = 0x6d2b79f5;

    const pointer: PointerState = {
      clientX: 0,
      clientY: 0,
      active: false,
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const pointCount = () =>
      Math.min(
        520,
        Math.max(140, Math.floor((width * documentHeight) / 28000)),
      );

    const createPoint = (): Point => ({
      x: random() * width,
      y: random() * documentHeight,
      phase: random() * Math.PI * 2,
      velocityX: (random() - 0.5) * 0.34,
      velocityY: (random() - 0.5) * 0.34,
      offsetX: 0,
      offsetY: 0,
    });

    const resize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const nextDocumentHeight = Math.max(
        nextHeight,
        document.documentElement.scrollHeight,
      );
      const widthChanged = width !== nextWidth;

      width = nextWidth;
      height = nextHeight;
      documentHeight = nextDocumentHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (widthChanged || points.length === 0) {
        seed = (0x6d2b79f5 ^ Math.round(width * 13 + documentHeight)) >>> 0;
        points = Array.from({ length: pointCount() }, createPoint);
      } else {
        const count = pointCount();
        if (points.length > count) points.length = count;
        while (points.length < count) points.push(createPoint());
        points.forEach((point) => {
          point.y = Math.min(point.y, documentHeight);
        });
      }

      links = [];
      lastLinkUpdate = 0;

      if (prefersReducedMotion.matches) draw(performance.now(), false);
    };

    const getPositions = (time: number, frameScale: number, animate: boolean) => {
      const pointerX = pointer.clientX;
      const pointerY = pointer.clientY + window.scrollY;

      return points.map((point) => {
        if (animate) {
          point.velocityX += Math.sin(time * 0.000075 + point.phase) * 0.0012 * frameScale;
          point.velocityY += Math.cos(time * 0.000068 + point.phase * 1.17) * 0.0012 * frameScale;
          point.velocityX = Math.max(-0.34, Math.min(0.34, point.velocityX));
          point.velocityY = Math.max(-0.34, Math.min(0.34, point.velocityY));
          point.x += point.velocityX * frameScale;
          point.y += point.velocityY * frameScale;

          if (point.x < 0 || point.x > width) {
            point.velocityX *= -1;
            point.x = Math.max(0, Math.min(width, point.x));
          }
          if (point.y < 0 || point.y > documentHeight) {
            point.velocityY *= -1;
            point.y = Math.max(0, Math.min(documentHeight, point.y));
          }
        }

        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (pointer.active) {
          const dx = pointerX - point.x;
          const dy = pointerY - point.y;
          const distance = Math.hypot(dx, dy);

          if (distance < MAGNET_RADIUS) {
            const strength = 1 - distance / MAGNET_RADIUS;
            const pull = Math.pow(strength, 1.65) * 0.66;
            targetOffsetX = dx * pull;
            targetOffsetY = dy * pull;
          }
        }

        const easing = prefersReducedMotion.matches ? 1 : 0.095 * frameScale;
        point.offsetX += (targetOffsetX - point.offsetX) * easing;
        point.offsetY += (targetOffsetY - point.offsetY) * easing;

        return {
          x: point.x + point.offsetX,
          y: point.y + point.offsetY,
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

    const refreshLinks = (positions: Array<{ x: number; y: number }>) => {
      const counts = new Uint8Array(positions.length);
      links = [];

      for (let first = 0; first < positions.length; first += 1) {
        if (counts[first] >= 1) continue;

        for (let second = first + 1; second < positions.length; second += 1) {
          if (counts[second] >= 1) continue;

          const distance = Math.hypot(
            positions[first].x - positions[second].x,
            positions[first].y - positions[second].y,
          );

          if (distance > BASE_LINK_DISTANCE) continue;
          links.push([first, second]);
          counts[first] += 1;
          counts[second] += 1;
          if (counts[first] >= 1) break;
        }
      }
    };

    const draw = (time: number, animate = !prefersReducedMotion.matches) => {
      const frameScale = lastFrame
        ? Math.min(2.5, Math.max(0.4, (time - lastFrame) / (1000 / 60)))
        : 1;
      lastFrame = time;

      context.clearRect(0, 0, width, height);
      const positions = getPositions(time, frameScale, animate);
      const pointerX = pointer.clientX;
      const pointerY = pointer.clientY + window.scrollY;

      if (time - lastLinkUpdate > 460 || links.length === 0) {
        refreshLinks(positions);
        lastLinkUpdate = time;
      }

      context.save();
      context.translate(0, -window.scrollY);

      links.forEach(([from, to]) => {
        const start = positions[from];
        const end = positions[to];
        const visible =
          (start.y > window.scrollY - BASE_LINK_DISTANCE &&
            start.y < window.scrollY + height + BASE_LINK_DISTANCE) ||
          (end.y > window.scrollY - BASE_LINK_DISTANCE &&
            end.y < window.scrollY + height + BASE_LINK_DISTANCE);
        if (!visible) return;

        const activeLink =
          pointer.active &&
          Math.hypot(start.x - pointerX, start.y - pointerY) < MAGNET_RADIUS &&
          Math.hypot(end.x - pointerX, end.y - pointerY) < MAGNET_RADIUS;

        drawLine(
          start.x,
          start.y,
          end.x,
          end.y,
          activeLink ? 0.2 : 0.035,
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

      const cluster = nearby.slice(0, 9);
      for (let first = 0; first < cluster.length; first += 1) {
        for (let second = first + 1; second < cluster.length; second += 1) {
          const a = cluster[first];
          const b = cluster[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > CLUSTER_LINK_DISTANCE) continue;

          const strength = 1 - distance / CLUSTER_LINK_DISTANCE;
          drawLine(
            a.x,
            a.y,
            b.x,
            b.y,
            0.08 + strength * 0.25,
            0.75 + strength * 0.45,
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
          0.05 + strength * 0.3,
          0.7 + strength * 0.4,
        );
      });

      positions.forEach(({ x, y }, index) => {
        if (y < window.scrollY - 10 || y > window.scrollY + height + 10) return;

        const distanceToPointer = pointer.active
          ? Math.hypot(x - pointerX, y - pointerY)
          : Infinity;
        const nearPointer = distanceToPointer < MAGNET_RADIUS;
        const major = index % 13 === 0;
        const pointerStrength = nearPointer
          ? 1 - distanceToPointer / MAGNET_RADIUS
          : 0;

        context.save();
        if (major || nearPointer) {
          context.shadowColor = `rgba(${CYAN}, ${nearPointer ? 0.9 : 0.58})`;
          context.shadowBlur = nearPointer ? 11 + pointerStrength * 13 : 10;
        }
        context.fillStyle = nearPointer
          ? `rgba(${CYAN}, ${0.26 + pointerStrength * 0.58})`
          : major
            ? `rgba(${CYAN}, 0.42)`
            : `rgba(${CYAN}, 0.12)`;
        context.beginPath();
        context.arc(
          x,
          y,
          nearPointer
            ? 1.4 + pointerStrength * 1.5
            : major
              ? 2.15
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

      context.restore();
    };

    const render = (time: number) => {
      draw(time);
      animationFrame = window.requestAnimationFrame(render);
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.active = true;
      if (prefersReducedMotion.matches) draw(performance.now(), false);
    };

    const clearPointer = () => {
      pointer.active = false;
      if (prefersReducedMotion.matches) draw(performance.now(), false);
    };

    const onScroll = () => {
      if (prefersReducedMotion.matches) draw(performance.now(), false);
    };

    const onMotionChange = () => {
      window.cancelAnimationFrame(animationFrame);
      if (prefersReducedMotion.matches) {
        animationFrame = 0;
        draw(performance.now(), false);
      } else {
        lastFrame = 0;
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    resize();
    if (prefersReducedMotion.matches) {
      draw(performance.now(), false);
    } else {
      animationFrame = window.requestAnimationFrame(render);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", clearPointer);
    prefersReducedMotion.addEventListener("change", onMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", updatePointer);
      document.documentElement.removeEventListener("pointerleave", clearPointer);
      prefersReducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />;
}
