export default class WaterDrop {
  private ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public velocity: number;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, velocity: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = velocity * 2;
    this.velocity = velocity;
  }
  draw() {
    let ctx = this.ctx;
    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillRect(this.x - (this.width/2), this.y - this.height, this.width, this.height);
    // ctx.fillStyle = 'white';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
  }
  update() {
    let canvasHeight = this.ctx.canvas.height;
    if (this.y - this.height >= canvasHeight) {
      this.velocity = 0;
    }

    this.y += this.velocity;
    this.draw();
  }
}