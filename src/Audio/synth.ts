import * as Tone from 'tone';

export const synth = new Tone.PolySynth(Tone.Synth).toDestination();