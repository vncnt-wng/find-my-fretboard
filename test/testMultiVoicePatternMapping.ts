import { NoteName } from "../src/MusicModel/note";
import { initialiseFretboardMapping, Instrument} from "../src/MusicModel/instrument";
import { NotePattern, UserPatternPreferences } from "../src/MusicModel/pattern";
import { getPatternMapping } from "../src/MusicModel/noteToFretboardMapping";

// TODO - when generating scale patterns, we can just take a single scale and transpose/ do intervals


const defaultPrefs: UserPatternPreferences = {
  stretch: 3,
  skipWeight: 0.9,
  shiftWeight: 0.7,
  openStringWeight: 1.3,
}

const fretboardMapping = initialiseFretboardMapping(Instrument.BASS, 4);

// const pattern = getPatternMapping(makeThirds(8), {fretboardMapping: fretboardMapping, settings: defaultPrefs})
// console.log(JSON.stringify(pattern, null, 4));