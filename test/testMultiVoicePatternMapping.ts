import { NoteName } from "../src/MusicModel/note";
import { initialiseFretboardMapping, Instrument} from "../src/MusicModel/instrument";
import { NotePattern, UserPatternPreferences } from "../src/MusicModel/pattern";
import { getPatternMapping } from "../src/MusicModel/noteToFretboardMapping";

// TODO - when generating scale patterns, we can just take a single scale and transpose/ do intervals
const g = [
  { name: NoteName.G, octave: 1 },
  { name: NoteName.A, octave: 1 },
  { name: NoteName.B, octave: 1 },
  { name: NoteName.C, octave: 2 },
  { name: NoteName.D, octave: 2 },
  { name: NoteName.E, octave: 2 },
  { name: NoteName.F_SHARP, octave: 2 },
  { name: NoteName.G, octave: 2 },
  { name: NoteName.A, octave: 2 },
  { name: NoteName.B, octave: 2 },
  { name: NoteName.C, octave: 3 },
  { name: NoteName.D, octave: 3 },
  { name: NoteName.E, octave: 3 },
  { name: NoteName.F_SHARP, octave: 3 },
] 

const makeIntervals = (length: number, interval: number): NotePattern => {
  const pattern = [];
  for (var i = 0; i < length; i++) {
    pattern.push([g[i], g[i + interval]])
  }
  return pattern;
}

const makeAscendingIntervals = (length: number, interval: number): NotePattern => {
  const pattern = [];
  for (var i = 0; i < length; i++) {
    pattern.push([g[i]])
    pattern.push([g[i + interval]])
  }
  return pattern;
}

const makeThirds = (length: number): NotePattern => {
  return makeIntervals(length, 2);
}

const makeSixths = (length: number): NotePattern => {
  return makeIntervals(length, 5);
}

const defaultPrefs: UserPatternPreferences = {
  stretch: 3,
  skipWeight: 0.9,
  shiftWeight: 0.7,
  openStringWeight: 1.3,
}

const fretboardMapping = initialiseFretboardMapping(Instrument.BASS, 4);

const pattern = getPatternMapping(makeThirds(8), {fretboardMapping: fretboardMapping, settings: defaultPrefs})
console.log(JSON.stringify(pattern, null, 4));