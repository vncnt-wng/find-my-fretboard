export enum NoteName {
  C = 0,
  C_SHARP = 1,
  D = 2,
  D_SHARP = 3,
  E = 4,
  F = 5,
  F_SHARP = 6,
  G = 7,
  G_SHARP = 8,
  A = 9,
  A_SHARP = 10,
  B = 11
}

export const NoteNameToStringMapping = {
  [NoteName.C]: 'C',
  [NoteName.C_SHARP]: 'C#',
  [NoteName.D]: 'D',
  [NoteName.D_SHARP]: 'D#',
  [NoteName.E]: 'E',
  [NoteName.F]: 'F',
  [NoteName.F_SHARP]: 'F#',
  [NoteName.G]: 'G',
  [NoteName.G_SHARP]: 'G#',
  [NoteName.A]: 'A',
  [NoteName.A_SHARP]: 'A#',
  [NoteName.B]: 'B',
}

export interface Note {
  name: NoteName;
  octave: number;
}

export interface StringPosition {
  openString: Note;
  index: number;
}

export interface FretboardNote {
  note: Note;
  stringPos: StringPosition
}

export const nextNote = (note: Note): Note => {
  const nextName = (note.name + 1) % 12;
  const nextOctave = nextName === NoteName.C ? note.octave + 1 : note.octave;
  return { name: nextName, octave: nextOctave };
};

export const noteHash = (note: Note): string => {
  return `${note.name}-${note.octave}`
}

export const noteString = (note: Note): string => {
  return NoteNameToStringMapping[note.name] + note.octave.toString();
}

export const noteEq = (note1: Note, note2: Note): boolean => {
  return note1.name === note2.name && note1.octave === note2.octave;
}

// export const noteAdd = (note: Note, semis: number): Note => {
//   const newName = (note.name + semis) % 12;
//   const next
//   const newOctave = 
// }

export const noteCmp = (note1: Note, note2: Note): number => {
  if (note1.octave > note2.octave) {
    return 1;
  } else if (note1.octave < note2.octave) {
    return -1;
  } else {
    return note1.name >= note2.name ? 1 : -1;
  }
}

export const notesContain = (note: Note, list: Note[]): boolean => {
  return list.findIndex(n => noteEq(note, n)) != -1;
}

export const stringPositionEq = (sp1: StringPosition, sp2: StringPosition): boolean => {
  return sp1.index == sp2.index && noteEq(sp1.openString, sp2.openString);
}

export const stringPositionsContain = (stringPos: StringPosition, list: StringPosition[]): boolean => {
  return list.findIndex(si => stringPositionEq(si, stringPos)) != -1;
}

export const getOpenStringNotes = (numStrings: number): Note[] => {
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

export interface FretboardMapping {
  openStrings: Note[],
  // two below are same data, just rotated 
  indexNotesByString: Note[][]
  stringNotesByIndex: Note[][]
  // key is a string created by note, in lieu of proper hashing in ts
  stringPosByNote: Map<string, StringPosition[]>
}

export const initialiseFretboardMapping = (numStrings: number, numFrets: number): FretboardMapping => {
  const openStrings = getOpenStringNotes(numStrings);
  const stringIndicies = new Map<string, StringPosition[]>();

  const indexNotesByString: Note[][] = openStrings
    .map((openString) => {
      const stringNotes: Note[] = []
      var current = openString;
      for (var i = 0; i <= numFrets; i++) {
        stringNotes.push(current);
        var key = noteHash(current);
        if (stringIndicies.has(key)) {
          stringIndicies.get(key)!.push({ openString, index: i })
        } 
        else {
          stringIndicies.set(key, [{ openString, index: i }])
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

  return {
    openStrings: openStrings,
    indexNotesByString: indexNotesByString,
    stringNotesByIndex: stringNotesByIndex,
    stringPosByNote: stringIndicies
  };
}
