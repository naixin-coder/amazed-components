function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Particle {
  x = 0;
  y = 0;
  size = 0;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    // this.clear();
    const r = Math.min(canvas.width, canvas.height) / 2 - 5;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const rad = (getRandom(0, 360) * Math.PI) / 180;
    this.x = cx + r * Math.cos(rad);
    this.y = cy + r * Math.sin(rad);
    this.size = getRandom(1, 4);
    // this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  moveTo(tx: number, ty: number) {
    const duration = 200;
    const sx = this.x;
    const sy = this.y;
    const xSpeed = (tx - sx) / duration;
    const ySpeed = (ty - sy) / duration;
    const startTime = Date.now();
    const _move = () => {
      const currentDuration = Date.now() - startTime;
      const x = sx + currentDuration * xSpeed;
      const y = sy + currentDuration * ySpeed;
      //   console.log(x, y);
      this.x = x;
      this.y = y;
      if (currentDuration >= duration) {
        this.x = tx;
        this.y = ty;
        return;
      }
      requestAnimationFrame(_move);
    };
    _move();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Particle;
