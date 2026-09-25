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
const MAGNET_RADIUS = 295;
const BASE_LINK_DISTANCE = 205;
const CLUSTER_LINK_DISTANCE = 168;
const MAX_POINT_LINKS = 2;
const LINK_REFRESH_INTERVAL = 190;
const SMALL_SCREEN_FRAME_INTERVAL = 1000 / 30;
const DESKTOP_FRAME_INTERVAL = 1000 / 45;

export default function GraphNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let animationFrame = 0;
    let points: Point[] = [];
    let positions: Array<{ x: number; y: number }> = [];
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

    const pointCount = () => {
      const isSmallScreen = width <= 700;
      const divisor = isSmallScreen ? 25000 : 24000;
      const minimum = isSmallScreen ? 120 : 190;
      const maximum = isSmallScreen ? 260 : 600;

      return Math.min(
        maximum,
        Math.max(minimum, Math.floor((width * documentHeight) / divisor)),
      );
    };

    const createPoint = (): Point => ({
      x: random() * width,
      y: random() * documentHeight,
      phase: random() * Math.PI * 2,
      velocityX: (random() - 0.5) * 1.05,
      velocityY: (random() - 0.5) * 1.05,
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
      pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        width <= 700 ? 1.1 : 1.4,
      );

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

      if (positions.length > points.length) positions.length = points.length;
      while (positions.length < points.length) positions.push({ x: 0, y: 0 });

      links = [];
      lastLinkUpdate = 0;

      if (prefersReducedMotion.matches) draw(performance.now(), false);
    };

    const getPositions = (time: number, frameScale: number, animate: boolean) => {
      const pointerX = pointer.clientX;
      const pointerY = pointer.clientY + window.scrollY;

      points.forEach((point, index) => {
        if (animate) {
          point.velocityX += Math.sin(time * 0.000075 + point.phase) * 0.0017 * frameScale;
          point.velocityY += Math.cos(time * 0.000068 + point.phase * 1.17) * 0.0017 * frameScale;
          point.velocityX = Math.max(-0.82, Math.min(0.82, point.velocityX));
          point.velocityY = Math.max(-0.82, Math.min(0.82, point.velocityY));
          point.x += point.velocityX * frameScale;
          point.y += point.velocityY * frameScale;

          if (point.x > width) point.x -= width;
          else if (point.x < 0) point.x += width;

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
            const pull = Math.pow(strength, 1.35) * 0.82;
            targetOffsetX = dx * pull;
            targetOffsetY = dy * pull;
          }
        }

        const easing = prefersReducedMotion.matches ? 1 : 0.15 * frameScale;
        point.offsetX += (targetOffsetX - point.offsetX) * easing;
        point.offsetY += (targetOffsetY - point.offsetY) * easing;

        positions[index].x = point.x + point.offsetX;
        positions[index].y = point.y + point.offsetY;
      });

      return positions;
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
      const cells = new Map<string, number[]>();
      links = [];

      positions.forEach((position, index) => {
        const cellX = Math.floor(position.x / BASE_LINK_DISTANCE);
        const cellY = Math.floor(position.y / BASE_LINK_DISTANCE);
        const key = `${cellX}:${cellY}`;
        const members = cells.get(key);

        if (members) members.push(index);
        else cells.set(key, [index]);
      });

      for (let first = 0; first < positions.length; first += 1) {
        if (counts[first] >= MAX_POINT_LINKS) continue;

        const firstPosition = positions[first];
        const cellX = Math.floor(firstPosition.x / BASE_LINK_DISTANCE);
        const cellY = Math.floor(firstPosition.y / BASE_LINK_DISTANCE);

        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
            const nearby = cells.get(`${cellX + offsetX}:${cellY + offsetY}`);
            if (!nearby) continue;

            for (const second of nearby) {
              if (second <= first || counts[second] >= MAX_POINT_LINKS) continue;

              const distance = Math.hypot(
                firstPosition.x - positions[second].x,
                firstPosition.y - positions[second].y,
              );

              if (distance > BASE_LINK_DISTANCE) continue;
              links.push([first, second]);
              counts[first] += 1;
              counts[second] += 1;
              if (counts[first] >= MAX_POINT_LINKS) break;
            }

            if (counts[first] >= MAX_POINT_LINKS) break;
          }

          if (counts[first] >= MAX_POINT_LINKS) break;
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

      if (time - lastLinkUpdate > LINK_REFRESH_INTERVAL || links.length === 0) {
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
          activeLink ? 0.38 : 0.11,
          activeLink ? 1.15 : 0.8,
        );
      });

      const nearby: Array<{
        x: number;
        y: number;
        index: number;
        pointerDistance: number;
      }> = [];

      if (pointer.active) {
        positions.forEach((position, index) => {
          const pointerDistance = Math.hypot(
            position.x - pointerX,
            position.y - pointerY,
          );

          if (pointerDistance < MAGNET_RADIUS) {
            nearby.push({ ...position, index, pointerDistance });
          }
        });
        nearby.sort((a, b) => a.pointerDistance - b.pointerDistance);
      }

      const cluster = nearby.slice(0, 11);
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
            0.14 + strength * 0.34,
            0.85 + strength * 0.5,
          );
        }
      }

      nearby.slice(0, 6).forEach((point) => {
        const strength = 1 - point.pointerDistance / MAGNET_RADIUS;
        drawLine(
          pointerX,
          pointerY,
          point.x,
          point.y,
          0.12 + strength * 0.4,
          0.85 + strength * 0.5,
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
          context.shadowColor = `rgba(${CYAN}, ${nearPointer ? 0.98 : 0.8})`;
          context.shadowBlur = nearPointer ? 17 + pointerStrength * 18 : 15;
        }
        context.fillStyle = nearPointer
          ? `rgba(${CYAN}, ${0.5 + pointerStrength * 0.45})`
          : major
            ? `rgba(${CYAN}, 0.72)`
            : `rgba(${CYAN}, 0.27)`;
        context.beginPath();
        context.arc(
          x,
          y,
          nearPointer
            ? 1.7 + pointerStrength * 1.8
            : major
              ? 2.5
              : 1.1,
          0,
          Math.PI * 2,
        );
        context.fill();
        context.restore();
      });

      if (pointer.active && nearby.length > 0) {
        context.save();
        context.shadowColor = `rgba(${CYAN}, 0.9)`;
        context.shadowBlur = 14;
        context.fillStyle = `rgba(${CYAN}, 0.5)`;
        context.beginPath();
        context.arc(pointerX, pointerY, 1.7, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      context.restore();
    };

    const render = (time: number) => {
      const frameInterval =
        width <= 700 ? SMALL_SCREEN_FRAME_INTERVAL : DESKTOP_FRAME_INTERVAL;

      if (lastFrame !== 0 && time - lastFrame < frameInterval) {
        animationFrame = window.requestAnimationFrame(render);
        return;
      }

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
      } else if (document.visibilityState !== "hidden") {
        lastFrame = 0;
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    };

    const onVisibilityChange = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;

      if (document.visibilityState === "hidden") return;
      if (prefersReducedMotion.matches) {
        draw(performance.now(), false);
        return;
      }

      lastFrame = 0;
      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    if (prefersReducedMotion.matches) {
      draw(performance.now(), false);
    } else if (document.visibilityState !== "hidden") {
      animationFrame = window.requestAnimationFrame(render);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", clearPointer);
    document.addEventListener("visibilitychange", onVisibilityChange);
    prefersReducedMotion.addEventListener("change", onMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", updatePointer);
      document.documentElement.removeEventListener("pointerleave", clearPointer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      prefersReducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />;
}
