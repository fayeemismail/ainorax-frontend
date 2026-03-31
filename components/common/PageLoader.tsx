"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Canvas particle constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
      pulse: number; pulseSpeed: number;
    };

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
    }));

    const MAX_DIST = 130;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 160, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        const glow = Math.sin(p.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 190, 255, ${p.alpha * glow})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Progress simulation + real load detection
  useEffect(() => {
    let cur = 0;
    const target = { val: 0 };
    let raf: number;

    const bump = () => {
      if (target.val < 85) target.val += Math.random() * 12 + 3;
      if (target.val > 85) target.val = 85;
    };

    const interval = setInterval(bump, 280);

    const animate = () => {
      cur += (target.val - cur) * 0.06;
      setProgress(Math.min(cur, 100));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onLoad = () => {
      clearInterval(interval);
      target.val = 100;
      setTimeout(() => {
        cancelAnimationFrame(raf);
        setPhase("reveal");
        setTimeout(() => setPhase("done"), 900);
      }, 400);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      {/*
        Only keyframes that Tailwind v3 cannot express natively live here.
        All layout, spacing, color, and transition classes are Tailwind.
      */}
      <style>{`
        @keyframes drawHex {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeInScale {
          to { opacity: 0.9; transform: scale(1); }
        }
        @keyframes charRise {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.7; }
          50%       { transform: translate(-50%, -50%) scale(1.15); opacity: 1;   }
        }
        @keyframes logoBreathe {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(126,184,255,0.4));  transform: scale(1);    }
          50%       { filter: drop-shadow(0 0 20px rgba(126,184,255,0.8)); transform: scale(1.04); }
        }
        @keyframes delayedFadeIn {
          to { opacity: 1; }
        }
        .hex-path {
          stroke-dasharray: 220;
          stroke-dashoffset: 220;
          animation: drawHex 1.4s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .hex-inner {
          opacity: 0;
          transform: scale(0.5);
          transform-origin: center;
          animation: fadeInScale 0.6s 1s ease forwards;
        }
        .logo-breathe  { animation: logoBreathe  3s ease-in-out infinite; }
        .glow-pulse    { animation: glowPulse    3s ease-in-out infinite; }
        .brand-char {
          opacity: 0;
          transform: translateY(12px);
          animation: charRise 0.5s ease forwards;
        }
        .delayed-fade {
          opacity: 0;
          animation: delayedFadeIn 1s ease forwards;
        }
      `}</style>

      {/* ── Root overlay ── */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          background: "linear-gradient(135deg,#0d1828 0%,#15233e 45%,#1e2f52 70%,#233865 100%)",
          opacity: phase === "reveal" ? 0 : 1,
        }}
      >
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Radial centre glow */}
        <div
          className="absolute rounded-full pointer-events-none glow-pulse"
          style={{
            top: "50%", left: "50%",
            width: 600, height: 600,
            background: "radial-gradient(circle,rgba(74,127,212,0.12) 0%,transparent 70%)",
            transform: "translate(-50%,-50%)",
          }}
        />

        {/* ── Centre content ── */}
        <div className="relative flex flex-col items-center gap-6">

          {/* Orbit rings + hex logo */}
          <div className="relative flex items-center justify-center w-40 h-40">

            {/* Outer orbit ring */}
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{ border: "1px solid rgba(100,160,255,0.18)", animationDuration: "4s" }}
            >
              <span
                className="absolute left-1/2 -top-[3px] -translate-x-1/2 w-[6px] h-[6px] rounded-full"
                style={{ background: "#7eb8ff", boxShadow: "0 0 10px #7eb8ff,0 0 20px rgba(126,184,255,0.5)" }}
              />
            </div>

            {/* Inner orbit ring (reverse) */}
            <div
              className="absolute rounded-full animate-spin"
              style={{
                inset: 14,
                border: "1px solid rgba(126,184,255,0.12)",
                animationDuration: "6s",
                animationDirection: "reverse",
              }}
            >
              <span
                className="absolute left-1/2 -bottom-[2px] -translate-x-1/2 w-[4px] h-[4px] rounded-full"
                style={{ background: "#a8d0ff", boxShadow: "0 0 8px #a8d0ff" }}
              />
            </div>

            {/* Hex logo mark */}
            <div className="absolute w-16 h-[72px] flex items-center justify-center logo-breathe">
              <svg viewBox="0 0 60 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M30 2L56 17V51L30 66L4 51V17L30 2Z" stroke="url(#hexGrad)" strokeWidth="1.5" fill="none" className="hex-path" />
                <path d="M20 24L30 18L40 24V36L30 42L20 36V24Z" fill="url(#hexGrad)" className="hex-inner" />
                <defs>
                  <linearGradient id="hexGrad" x1="4" y1="2" x2="56" y2="66" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7eb8ff" />
                    <stop offset="1" stopColor="#4a7fd4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Brand name — letter by letter */}
          <div className="flex gap-[3px] tracking-[0.35em]">
            {"AINORAX".split("").map((ch, i) => (
              <span
                key={i}
                className="brand-char font-mono text-[26px] font-bold"
                style={{
                  animationDelay: `${0.8 + i * 0.07}s`,
                  background: "linear-gradient(180deg,#c8e0ff 0%,#7eb8ff 60%,#4a7fd4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p
            className="delayed-fade font-mono text-[11px] tracking-[0.2em] uppercase m-0"
            style={{ color: "rgba(160,195,255,0.45)", animationDelay: "1.4s" }}
          >
            Initializing experience
          </p>

          {/* Progress bar */}
          <div className="delayed-fade flex items-center gap-3" style={{ animationDelay: "1.6s" }}>
            {/* Track */}
            <div
              className="relative w-[200px] h-[2px] rounded-sm overflow-visible"
              style={{ background: "rgba(100,150,220,0.15)" }}
            >
              {/* Fill */}
              <div
                className="h-full rounded-sm transition-[width] duration-[250ms] ease-out"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg,#3a6db5,#7eb8ff)" }}
              />
              {/* Glowing tip */}
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full pointer-events-none transition-[left] duration-[250ms] ease-out"
                style={{
                  left: `${progress}%`,
                  background: "radial-gradient(circle,rgba(126,184,255,0.7) 0%,transparent 70%)",
                }}
              />
            </div>
            {/* Percent */}
            <span className="font-mono text-[11px] min-w-[32px] tracking-[0.05em]" style={{ color: "rgba(126,184,255,0.6)" }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Corner accents */}
        <div className="delayed-fade absolute top-8 left-8  w-8 h-8 border-t border-l border-[#7eb8ff]/30" style={{ animationDelay: "0.3s" }} />
        <div className="delayed-fade absolute top-8 right-8 w-8 h-8 border-t border-r border-[#7eb8ff]/30" style={{ animationDelay: "0.3s" }} />
        <div className="delayed-fade absolute bottom-8 left-8  w-8 h-8 border-b border-l border-[#7eb8ff]/30" style={{ animationDelay: "0.3s" }} />
        <div className="delayed-fade absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[#7eb8ff]/30" style={{ animationDelay: "0.3s" }} />
      </div>
    </>
  );
}