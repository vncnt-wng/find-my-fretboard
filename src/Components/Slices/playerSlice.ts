import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { NoteName } from "../../MusicModel/note";
import { getScaleNames, PlayerPattern } from "../../MusicModel/scales";

interface PlayerState {
  key: NoteName,
  pattern: PlayerPattern, 
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
const defaultScale = getScaleNames(defaultKey, defaultPattern);
const defaultChordTones = getDefaultChordTones(defaultScale);

const initialState: PlayerState = {
  key: defaultKey,
  pattern: defaultPattern,
  showScaleNames: false,
  showChordTones: false,
  scaleNames: defaultScale,
  chordTones: defaultChordTones
}

const setNewNotesAndDefaultTones = (state: PlayerState) => {
  const scaleNames = getScaleNames(state.key, state.pattern)
  state.scaleNames = scaleNames
  state.chordTones = getDefaultChordTones(scaleNames)
}

const setKeyReducer = (state: PlayerState, action: PayloadAction<NoteName>) => {
  state.key = action.payload;
  setNewNotesAndDefaultTones(state);
}

const setPatternReducer = (state: PlayerState, action: PayloadAction<PlayerPattern>) => {
  state.pattern = action.payload;
  setNewNotesAndDefaultTones(state);
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
  console.log(action.payload)
  console.log(indexToRemove)

  if (indexToRemove == -1) {
    newTones.push(action.payload);
  }
  else {
    newTones.splice(indexToRemove, 1);
  }

  console.log(newTones);
  
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