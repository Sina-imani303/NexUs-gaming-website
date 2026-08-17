"use client";

import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

export default function Background() {
  const canvasRef = useRef(null);
  const gradientRef = useRef<NeatGradient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,

      colors: [
        { color: "#050506", enabled: true },
        { color: "#B88A2A", enabled: true },
      ],

      speed: 1.75,

      horizontalPressure: 3,
      verticalPressure: 1.4,

      waveFrequencyX: 0.9,
      waveFrequencyY: 0.6,

      waveAmplitude: 5,

      shadows: 10,

      highlights: 1,

      colorBrightness: 0.95,

      colorSaturation: 0.8,

      colorBlending: 12,

      backgroundColor: "#040405",
      backgroundAlpha: 1,

      resolution: 2,

      shapeType: "plane",
    });

    return () => {
      gradientRef.current?.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 h-screen w-screen" style={{ zIndex: 0 }} />;
}
