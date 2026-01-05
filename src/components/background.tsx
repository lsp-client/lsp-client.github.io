import { useTheme } from "@/components/theme-provider";
import { useEffect, useRef } from "react";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeApi =
    typeof useTheme === "function"
      ? useTheme()
      : { theme: "light", setTheme: () => {} };
  const theme = themeApi?.theme ?? "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Configuration
    const config = {
      lineCount: 32, // More lines for better coverage
      amplitude: 50, // Gentle waves
      frequency: 0.002, // Smooth curves
      speed: 0.0002, // Subtle movement
      opacity: 0.07, // Visible but not distracting
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      const isDark = document.documentElement.classList.contains("dark");

      ctx.lineWidth = 1;

      for (let i = 0; i < config.lineCount; i++) {
        ctx.beginPath();

        // Distribute lines across the entire height
        // Add some padding at top and bottom (-0.1 to 1.1) to ensure coverage
        const progress = i / config.lineCount;
        const yBase = height * (progress * 1.2 - 0.1);

        ctx.moveTo(0, yBase);

        // Create complex but smooth wave
        for (let x = 0; x <= width; x += 10) {
          const noise1 = Math.sin(x * config.frequency + time + i * 0.2);
          const noise2 = Math.cos(
            x * config.frequency * 0.5 - time * 0.3 + i * 0.1
          );

          // Combine waves
          // Vary amplitude based on position to create "breathing" effect
          const currentAmp =
            config.amplitude * (1 + Math.sin(time * 0.5 + i * 0.1) * 0.3);
          const yOffset = (noise1 + noise2 * 0.5) * currentAmp;

          ctx.lineTo(x, yBase + yOffset);
        }

        // Simple stroke color
        const color = isDark ? "255, 255, 255" : "0, 0, 0";
        // Calculate opacity based on vertical position (fade at edges slightly)
        const centerDist = Math.abs(0.5 - progress);
        const lineOpacity = config.opacity * (1 - centerDist * 0.5);

        ctx.strokeStyle = `rgba(${color}, ${lineOpacity})`;
        ctx.stroke();
      }

      if (prefersReducedMotion) return;

      time += config.speed * 10;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    let observer: MutationObserver | null = null;
    if (prefersReducedMotion) {
      observer = new MutationObserver(() => {
        draw();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (!prefersReducedMotion) cancelAnimationFrame(animationFrameId);
      observer?.disconnect();
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background transition-colors duration-500">
      {/* Subtle dot pattern overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Vignette effect to focus attention on center */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/10 to-background/80" />
    </div>
  );
}
