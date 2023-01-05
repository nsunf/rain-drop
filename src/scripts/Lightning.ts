export default class Lightning {
  private ctx: CanvasRenderingContext2D;
  public flashOpacity: number;
  public boltFlashDuration: number;
  public boltFadeDuration: number;

  public scale = 1;
  
  public bolts: { canvas: HTMLCanvasElement, duration: number }[];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.flashOpacity = 0;
    this.boltFlashDuration = 0.2;
    this.boltFadeDuration = 0.2;
    this.bolts = [];
  }

  get totalBoltDuration() {
    return this.boltFlashDuration + this.boltFadeDuration;
  }

  get width() {
    return Math.ceil(window.innerWidth / this.scale);
  }

  get height() {
    return Math.ceil(window.innerHeight / this.scale);
  }

  launchBolt(x: number, y: number, length: number, direction: number) {
    this.flashOpacity = 0.15 + Math.random() * 0.2;
    let boltCanvas = document.createElement('canvas');
    boltCanvas.width = window.innerWidth;
    boltCanvas.height = window.innerHeight;
    let boltCtx = boltCanvas.getContext('2d')!;
    boltCtx.scale(this.scale, this.scale);

    this.bolts.push({ canvas: boltCanvas, duration: 0.0 });

    this.recursiveLaunchBolt(x, y, length, direction, boltCtx);
  }

  recursiveLaunchBolt(x: number, y: number, length: number, direction: number, boltCtx: CanvasRenderingContext2D) {
    direction = direction < Math.PI * 7/6 ? Math.PI * 7/6 : direction;
    direction = direction > Math.PI * 11/6 ? Math.PI * 11/6 : direction;
    let originalDirection = direction;

    let boltInterval = setInterval(() => {
      if (length <= 0) {
        clearInterval(boltInterval);
        return;
      }

      let i = 0;
      while (i++ < Math.floor(45 / this.scale) && length > 0) {
        let x1 = Math.floor(x);
        let y1 = Math.floor(y);
        x += Math.cos(direction);
        y -= Math.sin(direction);
        length--;

        if (x1 != Math.floor(x) || y1 != Math.floor(y)) {
          let alpha = Math.min(1, length / 350);
          boltCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          boltCtx.fillRect(x1, y1, 1, 1);
          direction = originalDirection + (-Math.PI / 8.0 + Math.random() * (Math.PI / 4.0));

          if (Math.random() > 0.99) {
            this.recursiveLaunchBolt(
              x1, 
              y1, 
              length * (0.3 + Math.random() * 0.4),
              originalDirection + (-Math.PI / 6.0 + Math.random() * (Math.PI / 3.0)),
              boltCtx
            );
          } else if (Math.random() > 0.97) {
            this.recursiveLaunchBolt(
              x1,
              y1,
              length,
              originalDirection + (-Math.PI / 6.0 + Math.random() * (Math.PI/3.0)),
              boltCtx
            )
            length = 0;
          }
        }
      }
    }, 20);
  }
}