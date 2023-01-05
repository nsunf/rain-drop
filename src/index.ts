import canvas from './scripts/canvas';
import './stylesheets/style.css';

const root = document.getElementById('root')!;

root.appendChild(canvas);

import lightRain1 from './audio/mixkit-light-rain-loop-1253.wav'
import lightRain2 from './audio/mixkit-light-rain-looping-1249.wav'
import rain from './audio/mixkit-rain-loop-1250.wav';
import waterBloopClose from './audio/Water-Bloop-7CloseDistance.mp3';
import waterBloopFar from './audio/Water-Bloop-7FarDistance.mp3';
import waterBloopMed from './audio/Water-Bloop-7MedDistance.mp3';
import waterDrop1 from './audio/Water-Dripping-A2.mp3';
import waterDrop1In from './audio/Water-Dripping-A2-indoor.mp3';
import waterDrop1Out from './audio/Water-Dripping-A2-outdoor.mp3';
import waterDrop2 from './audio/Water-Dripping-A4.mp3';
import waterDrop2In from './audio/Water-Dripping-A4-indoor.mp3';
import waterDrop2Out from './audio/Water-Dripping-A4-outdoor.mp3';

const audio = new Audio(waterDrop1)
console.log(audio);

// addEventListener('load', () => {
//   audio.play();
//   console.log('play')
// })

