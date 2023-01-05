export default class Splash {
  private ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public r: number;
  public velocity: { x: number, y: number };
  public deacceleration: number;
  public willDeinit: boolean = false;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, velocity: { x: number, y: number }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.velocity = velocity;
    this.deacceleration = 0.5;
  }
  draw() {
    let ctx = this.ctx;
    ctx.save();
    // ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();
  }
  update() {
    let canvasHeight = this.ctx.canvas.height;
    if (this.y + this.r <= canvasHeight) {
      this.x += this.velocity.x;
      this.y -= this.velocity.y;
      this.velocity.y -= this.deacceleration;
    } else {
      this.willDeinit = true;
    }
    this.draw();
  }
}