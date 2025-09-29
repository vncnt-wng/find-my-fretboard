import { Note } from "./note";
import { FretboardMapping, FretboardNote } from "./instrument";

export type NotePattern = Note[]

export type PatternMapping = FretboardNote[];

export interface UserPatternPreferences {
  stretch: number,
  skipWeight: number, // weighting for string skips
  shiftWeight: number, // weighting for 
  openStringWeight: number, 
}

export interface PatternMappingContext {
  fretboardMapping: FretboardMapping,
  settings: UserPatternPreferences,
}