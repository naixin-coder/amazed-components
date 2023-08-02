import { useEffect, useRef } from "react";
import Particle from "./particle";

interface IParticleText {
  text: string;
  speed?: string;
  style?: React.CSSProperties;
  className?: string;
}
let ctx: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;
const ParticleText: React.FC<IParticleText> = ({ text }) => {
  const $canvasRef = useRef<HTMLCanvasElement>(null);
  const particleList: Particle[] = [];
  const draw = () => {
    update();
    particleList.forEach((particle) => {
      particle.draw();
    });
    requestAnimationFrame(draw);
  };
  const drawText = () => {
    const { width, height } = canvas;
    ctx.beginPath();
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000";
    ctx.font = `60px 'DS-Digital',sans-serif`;
    ctx.fillText(text, (width - ctx.measureText(text).width) / 2, height / 2);
  };
  const update = () => {
    drawText();
    const points = getPoints();
    clear();
    points.forEach((point, index) => {
      let p = particleList[index];
      if (!p) {
        p = new Particle(canvas);
        particleList.push(p);
      }
      const [x, y] = point;
      p.moveTo(x, y);
    });
    if (points.length < particleList.length) {
      particleList.splice(points.length);
    }
  };
  const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getPoints = () => {
    const gap = 4;
    const points = [];
    const { width, height, data } = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    for (let i = 0; i < width; i += gap) {
      for (let j = 0; j < height; j += gap) {
        const index = (i + j * width) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
        if (!r && !g && !b && a === 255) {
          points.push([i, j]);
        }
      }
    }
    return points;
  };

  useEffect(() => {
    if ($canvasRef.current) {
      canvas = $canvasRef.current;
      ctx = $canvasRef.current.getContext("2d")!;
      draw();
    }
  });

  return (
    <canvas
      style={{ background: "#00000023" }}
      width={300}
      height={300}
      ref={$canvasRef}
    />
  );
};

export default ParticleText;
