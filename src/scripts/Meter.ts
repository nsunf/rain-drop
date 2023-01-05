export default class Meter {
  private ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    // this.x = this.ctx.canvas.width/2;
    // this.y = this.ctx.canvas.height;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 0;
  }
  draw() {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
  update(level: number) {
    let sound = level * this.ctx.canvas.height;
    this.y = this.ctx.canvas.height - sound;
    this.height = sound;
    this.draw();
  }
}