import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteName } from "../../MusicModel/note";
import { PlayerPattern } from "../../MusicModel/scales";

interface PlayerState {
  key: NoteName,
  pattern: PlayerPattern 
}

const initialState: PlayerState = {
  key: NoteName.C,
  pattern: 'major'
}

const setKeyReducer = (state: PlayerState, action: PayloadAction<NoteName>) => {
  state.key = action.payload;
}

const setPatternReducer = (state: PlayerState, action: PayloadAction<PlayerPattern>) => {
  state.pattern = action.payload;
}

export const playerSlice = createSlice({
  name: 'playerStateSlice',
  initialState,
  reducers: {
    setPlayerKey: setKeyReducer,
    setPlayerPattern: setPatternReducer
  }
});

export const { 
  setPlayerKey,
  setPlayerPattern
} = playerSlice.actions;

export default playerSlice.reducer;