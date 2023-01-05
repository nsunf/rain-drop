export default class Mic {
  public initialized: boolean = false;
  public analyser?: AnalyserNode;
  constructor() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((mediaStream: MediaStream) => {
        let audioCtx = new AudioContext();
        let mic = audioCtx.createMediaStreamSource(mediaStream);
        this.analyser = audioCtx.createAnalyser();
        this.analyser.fftSize = 32;
        this.analyser.smoothingTimeConstant = 0;
        mic.connect(this.analyser);

        this.initialized = true;
      }).catch(err => {
        this.initialized = false;
        console.log(err);
      })
  }
  getVolume() {
    if (!this.analyser) return 0; 
    let bufferSize = this.analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferSize)
    this.analyser.getByteTimeDomainData(dataArray);
    let normArray = [...dataArray].map(e => e/128 - 1);
    let sum = 0;
    normArray.forEach(e => {
      sum += Math.pow(e, 2)
    });
    return Math.sqrt(sum/bufferSize);
  }
}