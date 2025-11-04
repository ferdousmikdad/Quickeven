import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface SimpleCrowdCanvasProps {
  src?: string;
  rows?: number;
  cols?: number;
}

const SimpleCrowdCanvas = ({ src = "/images/peeps/all-peeps.png", rows = 15, cols = 7 }: SimpleCrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.9;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create simple animated characters
    const characters: Array<{
      x: number;
      y: number;
      vx: number;
      size: number;
      color: string;
    }> = [];

    // Initialize characters
    for (let i = 0; i < 20; i++) {
      characters.push({
        x: Math.random() * canvas.width,
        y: canvas.height - 100 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 2,
        size: 20 + Math.random() * 20,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      characters.forEach(char => {
        // Update position
        char.x += char.vx;

        // Bounce off walls
        if (char.x < 0 || char.x > canvas.width) {
          char.vx *= -1;
        }

        // Draw character
        ctx.fillStyle = char.color;
        ctx.beginPath();
        ctx.arc(char.x, char.y, char.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw simple face
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(char.x - char.size/3, char.y - char.size/3, char.size/6, 0, Math.PI * 2);
        ctx.arc(char.x + char.size/3, char.y - char.size/3, char.size/6, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 h-[90vh] w-full bg-gradient-to-t from-blue-100 to-transparent"
    />
  );
};

export default SimpleCrowdCanvas;