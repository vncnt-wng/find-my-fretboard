import { nextNote, Note, noteEq, noteHash, NoteName } from "./note";

export interface StringPosition {
  openString: Note;
  openStringIndex: number;
  index: number;
}

export interface FretboardNote {
  note: Note;
  stringPos: StringPosition | null
}

export const stringPositionEq = (sp1: StringPosition, sp2: StringPosition): boolean => {
  return sp1.index == sp2.index && noteEq(sp1.openString, sp2.openString);
}

export const stringPositionsContain = (stringPos: StringPosition, list: StringPosition[]): boolean => {
  return list.findIndex(si => stringPositionEq(si, stringPos)) != -1;
}

export const getOpenStringNotes = (instrument: Instrument, numStrings: number): Note[] => {
  if (instrument === Instrument.BASS) {
    return getBassOpenStrings(numStrings);
  } else if (instrument === Instrument.GUITAR) {
    return getGuitarOpenStrings(numStrings);
  }
  return [];
}

const getBassOpenStrings = (numStrings: number): Note[] => {
  var openStrings: Note[] = [
    { name: NoteName.E, octave: 1 },
    { name: NoteName.A, octave: 1 },
    { name: NoteName.D, octave: 2 },
    { name: NoteName.G, octave: 2 },
  ];

  if (numStrings >= 5) {
    openStrings = [{ name: NoteName.B, octave: 0 }, ...openStrings];
  }
  if (numStrings >= 6) {
    openStrings = [...openStrings, { name: NoteName.C, octave: 3 }];
  }

  return openStrings;
}

const getGuitarOpenStrings = (numStrings: number): Note[] => {
  var openStrings: Note[] = [
    { name: NoteName.E, octave: 2 },
    { name: NoteName.A, octave: 2 },
    { name: NoteName.D, octave: 3 },
    { name: NoteName.G, octave: 3 },
    { name: NoteName.B, octave: 3 },
    { name: NoteName.E, octave: 4 },
  ];

  if (numStrings >= 7) {
    openStrings = [{ name: NoteName.B, octave: 1 }, ...openStrings];
  }

  return openStrings;
}

export interface FretboardMapping {
  openStrings: Note[],
  // two below are same data, just rotated 
  indexNotesByString: Note[][]
  stringNotesByIndex: Note[][]
  // key is a string created by note, in lieu of proper hashing in ts
  stringPosByNote: Map<string, StringPosition[]>
  noteRange: [Note, Note]
}

export const initialiseFretboardMapping = (instrument: Instrument, numStrings: number, numFrets: number = 24, customTuning: Note[] | null = null): FretboardMapping => {
  const openStrings = customTuning ?? getOpenStringNotes(instrument, numStrings);
  const stringIndicies = new Map<string, StringPosition[]>();

  const indexNotesByString: Note[][] = openStrings
    .map((openString, i) => {
      const stringNotes: Note[] = []
      var current = openString;
      for (var fretI = 0; fretI <= numFrets; fretI++) {
        stringNotes.push(current);
        const key = noteHash(current);
        const stringPos = { openString, openStringIndex: i, index: fretI };
        if (stringIndicies.has(key)) {
          stringIndicies.get(key)!.push(stringPos)
        } 
        else {
          stringIndicies.set(key, [stringPos])
        }
        current = nextNote(current);
      }
      return stringNotes;
  });

  const stringNotesByIndex: Note[][] = [];
  for (var i = 0; i <= numFrets; i++) {
    const fretNotes: Note[] = [];
    stringNotesByIndex.push(fretNotes)
    for (var j = 0; j < numStrings; j ++) {
      fretNotes.push(indexNotesByString[j][i])
    }
  }

  const result = {
    openStrings: openStrings,
    indexNotesByString: indexNotesByString,
    stringNotesByIndex: stringNotesByIndex,
    stringPosByNote: stringIndicies,
    noteRange: [
      indexNotesByString[0][0], 
      indexNotesByString[numStrings - 1][numFrets - 1]
    ] as [Note, Note]
  };

  return result;
}


export enum Instrument {
  GUITAR = 0,
  BASS = 1
}

export enum InstrumentType {
  FRETBOARD = 0,
  KEYS = 1
}

export const InstrumentToStringNumRange = {
  [Instrument.GUITAR]: [6, 7],
  [Instrument.BASS]: [4, 6]
}