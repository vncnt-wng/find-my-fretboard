import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { NoteName, noteNameIntervalSemis, noteNameTranspose } from "../../MusicModel/note";
import { getScaleNames, getSymmetryNotes, PlayerPattern, ScaleType } from "../../MusicModel/scales";

interface PlayerState {
  key: NoteName,
  modeRoot: NoteName,
  symmetryKeys: NoteName[]
  pattern: PlayerPattern, 
  mode: number,
  showScaleNames: boolean,
  showChordTones: boolean,
  scaleNames: NoteName[],
  chordTones: NoteName[]
}

const getDefaultChordTones = (scaleNames: NoteName[]) => {
  const chordTones = [];
  for (var i = 0; i < scaleNames.length; i += 2) {
    chordTones.push(scaleNames[i]);
  }
  return chordTones
}

const defaultKey = NoteName.C;
const defaultPattern = 'major';
const defaultSymmetry = getSymmetryNotes(defaultKey, defaultPattern);
const defaultScale = getScaleNames(defaultKey, defaultPattern);
const defaultChordTones = getDefaultChordTones(defaultScale);

const initialState: PlayerState = {
  key: defaultKey,
  modeRoot: 0,
  symmetryKeys: defaultSymmetry,
  pattern: defaultPattern,
  mode: 0,
  showScaleNames: false,
  showChordTones: false,
  scaleNames: defaultScale,
  chordTones: defaultChordTones
}

const setNewNotes = (state: PlayerState) => {
  const scaleNames = getScaleNames(state.key, state.pattern)
  const modeNames = scaleNames.slice(state.mode, scaleNames.length).concat(scaleNames.slice(0, state.mode))
  state.scaleNames = modeNames
  state.modeRoot = modeNames[0];
}

const setDefaultChordTones = (state: PlayerState) => {
  state.chordTones = getDefaultChordTones(state.scaleNames)
}

const setNewNotesAndDefaultTones = (state: PlayerState) => {
  setNewNotes(state);
  setDefaultChordTones(state);
}

const setSymmetry = (state: PlayerState) => {
  state.symmetryKeys = getSymmetryNotes(state.key, state.pattern);
}

const setKeyReducer = (state: PlayerState, action: PayloadAction<NoteName>) => {
  const currentChordToneIntervals = state.chordTones.map(n => noteNameIntervalSemis(state.key, n));
  state.key = action.payload;
  setNewNotes(state);
  setSymmetry(state);
  const newChordTones = currentChordToneIntervals.map(i => noteNameTranspose(state.key, i))
  state.chordTones = newChordTones
}

export interface PatternMode {
  pattern: PlayerPattern,
  mode: number
}

const setPatternReducer = (state: PlayerState, action: PayloadAction<PatternMode>) => {
  state.pattern = action.payload.pattern
  state.mode = action.payload.mode
  setNewNotesAndDefaultTones(state);
  setSymmetry(state);
}

// const setScaleNamesReducer = (state: PlayerState, action: PayloadAction<boolean>) => {
//   state.showScaleNames = action.payload;
// }

const setShowScaleNameReducer = (state: PlayerState, action: PayloadAction<boolean>) => {
  state.showScaleNames = action.payload;
}

const setShowChordTonesReducer = (state: PlayerState, action: PayloadAction<boolean>) => {
  state.showChordTones = action.payload;
}

const setChordToneReducer = (state: PlayerState, action: PayloadAction<NoteName>) => {
  const newTones = [...state.chordTones];
  const indexToRemove = newTones.indexOf(action.payload);

  if (indexToRemove == -1) {
    newTones.push(action.payload);
  }
  else {
    newTones.splice(indexToRemove, 1);
  }
  
  state.chordTones = newTones;
}

export const playerSlice = createSlice({
  name: 'playerStateSlice',
  initialState,
  reducers: {
    setPlayerKey: setKeyReducer,
    setPlayerPattern: setPatternReducer,
    // setScaleNames: setScaleNamesReducer,
    setShowScaleName: setShowScaleNameReducer,
    setShowChordTones: setShowChordTonesReducer,
    setChordTone: setChordToneReducer
  }
});

export const { 
  setPlayerKey,
  setPlayerPattern,
  // setScaleNames,
  setShowScaleName,
  setShowChordTones,
  setChordTone
} = playerSlice.actions;

export default playerSlice.reducer;