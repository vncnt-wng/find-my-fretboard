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

export const StringToNoteNameMapping: { [key: string]: NoteName } = {
  ["C"]: NoteName.C,
  ["C#"]: NoteName.C_SHARP,
  ["Db"]: NoteName.C_SHARP,
  ["D"]: NoteName.D,
  ["D#"]: NoteName.D_SHARP,
  ["Eb"]: NoteName.D_SHARP,
  ["E"]: NoteName.E,
  ["F"]: NoteName.F,
  ["F#"]: NoteName.F_SHARP,
  ["Gb"]: NoteName.F_SHARP,
  ["G"]: NoteName.G,
  ["G#"]: NoteName.G_SHARP,
  ["Ab"]: NoteName.G_SHARP,
  ["A"]: NoteName.A,
  ["A#"]: NoteName.A_SHARP,
  ["Bb"]: NoteName.A_SHARP,
  ["B"]: NoteName.B,
}

export interface Note {
  name: NoteName;
  octave: number;
}


export const noteNameIntervalSemis = (lower: NoteName, higher: NoteName) => {
  // add 12 to higher to avoid having to deal with negative modulo weirdness
  return ((higher + 12) - lower) % 12;
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

export const noteCmp = (note1: Note, note2: Note): number => {
  if (note1.octave > note2.octave) {
    return 1;
  } else if (note1.octave < note2.octave) {
    return -1;
  } else {
    return note1.name >= note2.name ? 1 : -1;
  }
}

export const noteValue = (note: Note): number => {
  return note.name + (note.octave * 12);
}

export const noteFromValue = (value: number): Note => {
  return { name: value % 12, octave: Math.floor(value / 12) };
}

export const noteTranspose = (note: Note, diff: number): Note => {
  return noteFromValue(noteValue(note) + diff);
}

export const noteNameTranspose = (noteName: NoteName, diff: number): NoteName => {
  return (noteName + diff) % 12
}

export const notesContain = (note: Note, list: Note[]): boolean => {
  return list.findIndex(n => noteEq(note, n)) != -1;
}

export const tryParseNoteString = (str: string): Note | null => {
  const splitIndex = str.charAt(1) == 'b' || str.charAt(1) == '#'
    ? 2
    : 1;
  const nameString = str.substring(0, splitIndex);
  const octaveIndex = str.substring(splitIndex, str.length);

  if (!(nameString in StringToNoteNameMapping)) return null;
  const tryParseOctave = parseInt(octaveIndex);
  if (Number.isNaN(tryParseOctave)) return null;

  return {name: StringToNoteNameMapping[nameString], octave: tryParseOctave}
}