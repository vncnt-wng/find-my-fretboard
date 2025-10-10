import * as Tone from 'tone';

const comp = new Tone.Compressor(-30, 5);
const limiter = new Tone.Limiter(0);

export const synth = new Tone.PolySynth(Tone.Synth)
  .connect(comp)
  .connect(limiter)
  .toDestination();