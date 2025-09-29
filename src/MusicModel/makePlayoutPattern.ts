import { NotePattern, PatternMappingContext } from './pattern'
import { PlayoutPattern } from '../Audio/play'
import { getPatternMapping } from './noteToFretboardMapping'
import { Note, noteString } from './note'

export const makePlayoutPattern = (pattern: NotePattern, ctx: PatternMappingContext): PlayoutPattern => {
  const patternMapping = getPatternMapping(pattern, ctx)
  return patternMapping.map((fn, i) => {
    return { fretboardNote: fn, midiNote: getBasicMidiNoteData(fn.note, i) };
  });
}

const getBasicMidiNoteData = (note: Note, index: number) => {
  const noteName = noteString(note);
  return {
    name: noteName,
    duration: 0.3,
    time: 0.5 * index,
    velocity: 60
  }
}