import { Note, NoteName, noteNameTranspose, noteTranspose } from "./note";
import { NotePattern } from "./pattern";

export interface Scale {
  type: ScaleType,
  noteName: NoteName
}

export type PlayerPattern = ScaleType | string;

export type ScaleType = 
  'major' | 
  '6th_dim' | 
  'minor_mel' | 
  'minor_harm' | 
  '6th_dim_minor' | 
  'diminished_hw' | 
  'diminished_wh' | 
  'wholeTone' | 
  string

export const scaleTypeToName: { [key: ScaleType]: string }= {
  'major': 'major',
  '6th_dim': '6th diminished', 
  'minor_mel': 'melodic minor', 
  'minor_harm': 'harmonic minor', 
  '6th_dim_minor': 'minor 6th diminished',  
  'diminished_hw': 'half-whole diminished', 
  'diminished_wh': 'whole-half diminished', 
  'augmented': 'augmented',
  'wholeTone': 'whole tone'
}



const intervalsByScale: { [key: ScaleType]: number[] } = {
  'major': [0, 2, 4, 5, 7, 9, 11],
  '6th_dim': [0, 2, 4, 5, 7, 8, 9, 11],
  '6th_dim_minor': [0, 2, 3, 5, 7, 8, 9, 11],
  // 'altered': [0, 1, 3, 4, 6, 8, 10], // 7th mode of melodic minor
  'minor_mel': [0, 2, 3, 5, 7, 9, 11],
  'minor_harm': [0, 2, 3, 5, 7, 8, 11],
  'diminished_hw': [0, 1, 3, 4, 6, 7, 9, 10],
  'diminished_wh': [0, 2, 3, 5, 6, 8, 9, 11],
  'augmented': [0, 3, 4, 7, 8, 11],
  'wholeTone': [0, 2, 4, 6, 8, 10],
}

const symmetryIntervalsByScale: { [key: ScaleType]: number[] } = {
  'diminished_hw': [3, 6, 9],
  'diminished_wh': [3, 6, 9],
  'augmented': [4, 8],
  'wholeTone': [2, 4, 6, 8, 10],
}

export const getScaleNames = (name: NoteName, scale: ScaleType) => {
  return intervalsByScale[scale]
    .map((i => noteNameTranspose(name, i)))
}

export const getSymmetryNotes = (name: NoteName, scale: ScaleType) => {
  if (!(scale in symmetryIntervalsByScale)) {
    return [];
  }
  const intervals = symmetryIntervalsByScale[scale];
  return intervals.map(i => noteNameTranspose(name, i))
}

// TODO should scales just be list of notenames instead of notes?
export const makeScale = (name: NoteName, scale: ScaleType, startOctave: number, octaves: number): Note[] => {
  const start: Note = {name: name, octave: startOctave }
  const notes = [start];
  const intervals = intervalsByScale[scale]

  for (var i = 0; i < octaves; i++) {
    for (var j = 0; j < intervals.length; j++) {
      notes.push(noteTranspose(start, intervals[j] + i * 12))
    }
  }

  return notes;
}

// export const makeIntervals = (length: number, interval: number): NotePattern => {
//   const pattern = [];
//   for (var i = 0; i < length; i++) {
//     pattern.push([g[i], g[i + interval]])
//   }
//   return pattern;
// }

// export const makeAscendingIntervals = (length: number, interval: number): NotePattern => {
//   const pattern = [];
//   for (var i = 0; i < length; i++) {
//     pattern.push([g[i]])
//     pattern.push([g[i + interval]])
//   }
//   return pattern;
// }

// export const makeThirds = (length: number): NotePattern => {
//   return makeIntervals(length, 2);
// }

// export const makeSixths = (length: number): NotePattern => {
//   return makeIntervals(length, 5);
// }