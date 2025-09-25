import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum Instrument {
  GUITAR = 0,
  BASS = 1
}

interface FretboardSettings {
  instrument: Instrument,
  constFretSpacing: boolean,
  stringNum: number,
  hold: boolean
}

const initialState: FretboardSettings = {
  instrument: Instrument.BASS,
  constFretSpacing: false,
  stringNum: 4,
  hold: false
}

const fretboardSettingsSlice = createSlice({
  name: 'fretboardSettings',
  initialState,
  reducers: {
    setInstrument: (state, action: PayloadAction<number>) => { state.instrument = action.payload },
    setFretSpacing: (state, action: PayloadAction<boolean>) => { state.constFretSpacing = action.payload },
    setStringNum: (state, action: PayloadAction<number>) => { state.stringNum = action.payload },
    setHold: (state, action: PayloadAction<boolean>) => { state.hold = action.payload },
  },
});

export const { setFretSpacing, setStringNum, setHold } = fretboardSettingsSlice.actions;
export default fretboardSettingsSlice.reducer;