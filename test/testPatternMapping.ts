import { NoteName } from "../src/MusicModel/note";
import { initialiseFretboardMapping, Instrument} from "../src/MusicModel/instrument";
import { NotePattern, UserPatternPreferences } from "../src/MusicModel/pattern";
import { getPatternMapping } from "../src/MusicModel/noteToFretboardMapping";

const cMajor: NotePattern = [
  { name: NoteName.G, octave: 1 },
  { name: NoteName.A, octave: 1 },
  { name: NoteName.B, octave: 1 },
  { name: NoteName.C, octave: 2 },
  { name: NoteName.D, octave: 2 },
  { name: NoteName.E, octave: 2 },
  { name: NoteName.F_SHARP, octave: 2 },
  { name: NoteName.G, octave: 2 },
] 

const defaultPrefs: UserPatternPreferences = {
  stretch: 3,
  skipWeight: 0.9,
  shiftWeight: 0.5,
  openStringWeight: 1,
}

const fretboardMapping = initialiseFretboardMapping(Instrument.BASS, 4);

const pattern = getPatternMapping(cMajor, {fretboardMapping: fretboardMapping, settings: defaultPrefs})
console.log(pattern);