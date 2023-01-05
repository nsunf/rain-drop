import Mic from "./Mic";
import Splash from "./Splash";
import Meter from "./Meter";
import WaterDrop from "./WaterDrop";
import Lightning from "./Lightning";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d')!;

canvas.width = innerWidth;
canvas.height = innerHeight;

let animationID: number;
let lastTimeStamp = 0;
let frameTimer = 0;
let frameRate = 60;

let rainGenerator: NodeJS.Timer = setInterval(createRain, 500);

let mic = new Mic();
let rain: WaterDrop[] = []; 
let splashArr: Splash[][] = [];
let soundMeter = new Meter(ctx, canvas.width/2, canvas.height);
let lightning = new Lightning(ctx);

function render() {
  // let gradient = ctx.createLinearGradient(canvas.width/2, 0, canvas.width/2, canvas.height);
  // gradient.addColorStop(0, '#00000a');
  // gradient.addColorStop(0.5, '#020024');
  // gradient.addColorStop(1, '#151549');
  // gradient.addColorStop(1, '#0f1958');
  // ctx.fillStyle = gradient;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // - rain
  rain.forEach(drop => {
    drop.update()
    if (drop.velocity === 0) {
      createSplash(drop.x, canvas.height - drop.height);
      let dropIdx = rain.findIndex((e: WaterDrop) => e === drop)
      rain = rain.filter((_, idx) => dropIdx !== idx);
    }
  });

  // - splash
  splashArr.forEach((splash, splashIdx) => {
    if (splash === []) {
      splashArr = splashArr.filter((_, idx) => splashIdx !== idx);
    }
    splash.forEach((el, elIdx) => {
      el.update()
      if (el.willDeinit) {
        splashArr[splashIdx] = splash.filter((_, idx) => elIdx !== idx);
      }
    });
  })
  // - lightning
  if (Math.random() > 0.998 - mic.getVolume() * 0.1) {
    let x = Math.floor(10 + Math.random() * (lightning.width - 10));
    // let y = Math.floor(5 + Math.random() * (lightning.height + 3));
    let y = 0;
    let length = Math.floor(lightning.height / 2 + Math.random() * (lightning.height/3));
    lightning.launchBolt(x, y, length, Math.PI * 3 / 2);
  }

  if (lightning.flashOpacity > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${lightning.flashOpacity})`;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    lightning.flashOpacity = Math.max(0, lightning.flashOpacity - 2 * 7/1000)
  }

  lightning.bolts.forEach((bolt, i) => {
    bolt.duration += 7/1000;
    if (bolt.duration >= lightning.totalBoltDuration) {
      lightning.bolts.splice(i, 1);
      i--
    }
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, (lightning.totalBoltDuration - bolt.duration) / lightning.boltFadeDuration))
    ctx.drawImage(bolt.canvas, 0, 0);
    ctx.restore();
  })
  // - meter
  soundMeter.update(mic.getVolume());
}

function animate(timeStamp: number = 0) {
  let deltaTime = timeStamp - lastTimeStamp;
  lastTimeStamp = timeStamp;
  if (frameTimer > 1000/frameRate) {
    render();
    frameTimer = 0;
  } else {
    frameTimer += deltaTime;
  }
  animationID = requestAnimationFrame(animate);
}

function createRain() {
  let amount = mic.getVolume() * 200;
  amount = amount === 0 ? 1 : amount;
  for (let i = 0; i < amount; i++) {
    let r = randomNumber(1, 0.5, 10);
    let x = randomNumber(canvas.width - r, r);
    let y = randomNumber(-r, -r-200);
    let velocity = randomNumber(30, 10, 10);
    rain.push(new WaterDrop(ctx, x, y, r, velocity));
  }
}

function createSplash(x: number, y: number) {
  let splash: Splash[] = [];
  for (let i = 0; i < 3; i++) {
    let velocity = { x: randomNumber(1, -1, 10), y: randomNumber(10, 2, 10)};
    let r = randomNumber(0.5, 0.1, 100);
    splash.push(new Splash(ctx, x, y, r, velocity));
  }
  splashArr.push(splash);
}

function randomNumber(max: number, min: number, chiper: 1|10|100|1000 = 1): number {
  let num = Math.random() * (max - min) + min;
  return Math.floor(num * chiper) / chiper;
}

addEventListener('resize', () => {
  cancelAnimationFrame(animationID)
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  soundMeter = new Meter(ctx, canvas.width/2, canvas.height);
  requestAnimationFrame(animate);
})

document.onvisibilitychange = (e: Event) => {
  if (document.visibilityState == 'hidden') {
    cancelAnimationFrame(animationID);
    clearInterval(rainGenerator);
  } else {
    requestAnimationFrame(animate);
    rainGenerator = setInterval(createRain, 100);
  }
}

animate();
export default canvas;