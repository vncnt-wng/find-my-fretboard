import { NotePattern, PatternMappingContext } from './pattern'
import { FretboardPlayoutPattern, KeysPlayoutNoteData, KeysPlayoutPattern } from '../Audio/play'
import { getPatternMapping } from './noteToFretboardMapping'
import { Note, noteString } from './note'

export const makeFretboardPlayoutPattern = (pattern: NotePattern, ctx: PatternMappingContext): FretboardPlayoutPattern => {
  const patternMapping = getPatternMapping(pattern, ctx)
  return patternMapping.map(
    (notes, i) => notes.map(
      fn => { 
        return { fretboardNote: fn, midiNote: getBasicMidiNoteData(fn.note, i) }
      }
  ));
}

export const makeKeysPlayoutPattern = (pattern: NotePattern): KeysPlayoutPattern => {
  return pattern.map(
    (notes, i) => notes.map(
      note => { 
        return { note: note, midiNote: getBasicMidiNoteData(note, i) }
      }
  ));
}

const getBasicMidiNoteData = (note: Note, index: number) => {
  const noteName = noteString(note);
  return {
    name: noteName,
    duration: 0.2,
    time: 0.45 * index,
    velocity: 60
  }
}