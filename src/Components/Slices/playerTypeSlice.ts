import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PlayerType = 'scales' | 'chords' | 'patterns' | 'training games'
export const playerTypes: PlayerType[] = ['scales', 'chords', 'patterns', 'training games']

interface PlayerTypeState {
  playerType: PlayerType
}

const initialState: PlayerTypeState = {
  playerType: playerTypes[0]
}

const setPlayerTypeReducer = (state: PlayerTypeState, action: PayloadAction<PlayerType>) => {
  state.playerType = action.payload;
}

const playerTypeSlice = createSlice({
  name: 'playerType',
  initialState,
  reducers: {
    setPlayerType: setPlayerTypeReducer
  },
});

export const { 
  setPlayerType
} = playerTypeSlice.actions;
export default playerTypeSlice.reducer;