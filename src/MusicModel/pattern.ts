import { Note, noteTranspose } from "./note";
import { FretboardMapping, FretboardNote } from "./instrument";

export type NotePattern = Note[]

export type PatternMapping = FretboardNote[];

export interface UserPatternPreferences {
  stretch: number,
  skipWeight: number, // weighting for string skips
  shiftWeight: number, // weighting for shifts
  openStringWeight: number, 
}

export interface PatternMappingContext {
  fretboardMapping: FretboardMapping,
  settings: UserPatternPreferences,
}

export const notePatternTranspose = (pattern: NotePattern, diff: number): NotePattern => {
  return pattern.map(n => noteTranspose(n, diff));
}

