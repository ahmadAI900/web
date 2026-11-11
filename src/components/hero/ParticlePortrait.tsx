"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ParticlePortraitProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

type Particle = {
  nx: number;
  ny: number;
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  swirl: number;
  amp: number;
  speed: number;
  phase: number;
  progress: number;
  bucket: number;
};

const PALETTE = [
  "rgba(226, 232, 240, 0.92)",
  "rgba(148, 163, 184, 0.78)",
  "rgba(34, 211, 238, 0.82)",
  "rgba(241, 245, 249, 0.62)",
  "rgba(100, 116, 139, 0.55)",
  "rgba(71, 85, 105, 0.58)",
  "rgba(34, 211, 238, 0.42)",
  "rgba(203, 213, 225, 0.58)",
] as const;

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export function ParticlePortrait({
  src,
  alt,
  className,
  priority = false,
}: ParticlePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    if (reduced) {
      return;
    }

    let frame = 0;
    let disposed = false;
    let running = true;
    let start = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let buckets: number[][] = [];
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.max(width / 940, height / 1450);
      const drawW = 940 * scale;
      const drawH = 1450 * scale;
      const offsetX = (width - drawW) / 2;
      const offsetY = (height - drawH) / 2;

      for (const particle of particles) {
        particle.tx = offsetX + particle.nx * drawW;
        particle.ty = offsetY + particle.ny * drawH;
      }
    };

    const build = (image: HTMLImageElement) => {
      const sampleWidth = 190;
      const sampleHeight = Math.round((sampleWidth * image.naturalHeight) / image.naturalWidth);
      const sampler = document.createElement("canvas");
      sampler.width = sampleWidth;
      sampler.height = sampleHeight;
      const sampleCtx = sampler.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;
      sampleCtx.drawImage(image, 0, 0, sampleWidth, sampleHeight);
      let data: Uint8ClampedArray;
      try {
        data = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;
      } catch {
        setLoaded(true);
        return;
      }

      const rect = container.getBoundingClientRect();
      const wide = window.innerWidth;
      let desired = wide < 640 ? 1200 : wide < 1024 ? 2200 : 3200;
      if ((navigator.hardwareConcurrency ?? 8) <= 4) {
        desired = Math.round(desired * 0.7);
      }

      const luminosity = new Float32Array(sampleWidth * sampleHeight);
      for (let i = 0; i < luminosity.length; i += 1) {
        const index = i * 4;
        if (data[index + 3] < 40) {
          luminosity[i] = -1;
          continue;
        }
        luminosity[i] =
          (data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114) / 255;
      }

      const lumAt = (x: number, y: number) =>
        luminosity[y * sampleWidth + x] ?? 0;
      const cornerSamples = [
        lumAt(0, 0),
        lumAt(sampleWidth - 1, 0),
        lumAt(0, sampleHeight - 1),
        lumAt(sampleWidth - 1, sampleHeight - 1),
      ].filter((value) => value >= 0);
      const background =
        cornerSamples.reduce((sum, value) => sum + value, 0) /
        Math.max(1, cornerSamples.length);

      const candidates: { nx: number; ny: number; brightness: number }[] = [];
      const step = 2;

      for (let y = step; y < sampleHeight - step; y += step) {
        for (let x = step; x < sampleWidth - step; x += step) {
          const index = y * sampleWidth + x;
          const brightness = luminosity[index];
          if (brightness < 0 || brightness < 0.06) continue;
          const gx = lumAt(x + step, y) - lumAt(x - step, y);
          const gy = lumAt(x, y + step) - lumAt(x, y - step);
          const edge = Math.sqrt(gx * gx + gy * gy);
          const subject =
            brightness < background - 0.09 ||
            brightness < 0.4 ||
            edge > 0.055;
          if (!subject) continue;
          candidates.push({
            nx: x / sampleWidth,
            ny: y / sampleHeight,
            brightness,
          });
        }
      }

      if (!candidates.length) {
        setLoaded(true);
        return;
      }

      const count = Math.min(desired, candidates.length);
      const stride = candidates.length / count;
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.max(width / 940, height / 1450);
      const drawW = 940 * scale;
      const drawH = 1450 * scale;
      const offsetX = (width - drawW) / 2;
      const offsetY = (height - drawH) / 2;

      particles = [];
      for (let i = 0; i < count; i += 1) {
        const candidate = candidates[Math.min(candidates.length - 1, Math.floor(i * stride))];
        const tx = offsetX + candidate.nx * drawW;
        const ty = offsetY + candidate.ny * drawH;
        const sx = Math.random() * width;
        const sy = Math.random() * height;
        let bucket = 0;
        if (candidate.brightness > 0.72) bucket = Math.random() > 0.7 ? 2 : 0;
        else if (candidate.brightness > 0.5) bucket = Math.random() > 0.6 ? 1 : 3;
        else if (candidate.brightness > 0.28) bucket = Math.random() > 0.85 ? 6 : 7;
        else bucket = Math.random() > 0.7 ? 5 : 4;

        particles.push({
          nx: candidate.nx,
          ny: candidate.ny,
          tx,
          ty,
          sx,
          sy,
          x: sx,
          y: sy,
          size: 0.7 + Math.random() * 1.15,
          delay: Math.random() * 0.9,
          swirl: (Math.random() - 0.5) * 1.6,
          amp: 0.35 + Math.random() * 1.35,
          speed: 0.25 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
          progress: 0,
          bucket,
        });
      }

      buckets = Array.from({ length: PALETTE.length }, () => []);
      for (let i = 0; i < particles.length; i += 1) {
        buckets[particles[i].bucket].push(i);
      }

      setLoaded(true);
      start = 0;
    };

    const render = (now: number) => {
      if (disposed) return;
      frame = window.requestAnimationFrame(render);
      if (!running || document.hidden) return;

      if (!start) start = now;
      const elapsed = (now - start) / 1000;

      pointerX += (targetPointerX - pointerX) * 0.06;
      pointerY += (targetPointerY - pointerY) * 0.06;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(pointerX, pointerY);

      for (let bucket = 0; bucket < buckets.length; bucket += 1) {
        const list = buckets[bucket];
        if (!list.length) continue;
        ctx.fillStyle = PALETTE[bucket];
        ctx.beginPath();
        for (let i = 0; i < list.length; i += 1) {
          const p = particles[list[i]];
          const local = elapsed - p.delay;
          if (local <= 0) {
            ctx.rect(p.sx, p.sy, p.size, p.size);
            continue;
          }
          if (p.progress < 1) {
            p.progress = Math.min(1, local / 2.1);
          }
          const eased = easeOutCubic(p.progress);
          if (eased < 1) {
            const baseX = p.tx + (p.sx - p.tx) * (1 - eased);
            const baseY = p.ty + (p.sy - p.ty) * (1 - eased);
            const angle = (1 - eased) * p.swirl;
            const dx = baseX - p.tx;
            const dy = baseY - p.ty;
            p.x = p.tx + dx * Math.cos(angle) - dy * Math.sin(angle);
            p.y = p.ty + dy * Math.cos(angle) + dx * Math.sin(angle);
          } else {
            p.x = p.tx + Math.sin(elapsed * p.speed + p.phase) * p.amp;
            p.y =
              p.ty +
              Math.cos(elapsed * p.speed * 0.8 + p.phase * 1.7) * p.amp;
          }
          ctx.rect(p.x, p.y, p.size, p.size);
        }
        ctx.fill();
      }

      ctx.restore();
    };

    const image = new window.Image();
    image.decoding = "async";
    image.src = src;
    let loadedOnce = false;

    const onLoad = () => {
      if (disposed || loadedOnce) return;
      loadedOnce = true;
      build(image);
      resize();
      frame = window.requestAnimationFrame(render);
    };

    image.addEventListener("load", onLoad);
    if (image.complete && image.naturalWidth > 0) onLoad();

    const onResize = () => {
      if (!particles.length) return;
      resize();
    };
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      (entries) => {
        running = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetPointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
      targetPointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    };
    if (window.matchMedia("(pointer: fine)").matches) {
      container.addEventListener("pointermove", onPointerMove);
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      image.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
    };
  }, [reduced, src]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate overflow-hidden rounded-[24px] border border-white/10 bg-surface shadow-[0_30px_90px_rgb(0_0_0_/_0.55),inset_0_1px_0_rgb(255_255_255_/_0.12)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-glow"
        aria-hidden="true"
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 80vw, 440px"
        className={cn(
          "object-cover object-[center_28%] grayscale contrast-[1.12] transition-opacity duration-1000",
          reduced || loaded ? "opacity-45" : "opacity-0",
        )}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full",
          reduced && "hidden",
        )}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/5"
        aria-hidden="true"
      />
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <span className="rounded-full border border-border/80 bg-background/70 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted backdrop-blur">
          Particle study · 01
        </span>
        <span className="size-2 rounded-full bg-accent/80" aria-hidden="true" />
      </div>
    </div>
  );
}
