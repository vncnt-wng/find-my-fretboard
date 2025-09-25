import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FretboardMapping, initialiseFretboardMapping } from '../../MusicModel/model';

enum Instrument {
  GUITAR = 0,
  BASS = 1
}

interface FretboardSettings {
  instrument: Instrument,
  constFretSpacing: boolean,
  stringNum: number,
  hold: boolean,
  fretboardMapping: FretboardMapping
}

const initialState: FretboardSettings = {
  instrument: Instrument.BASS,
  constFretSpacing: false,
  stringNum: 4,
  hold: false,
  fretboardMapping: initialiseFretboardMapping(4, 24)
}

const fretboardSettingsSlice = createSlice({
  name: 'fretboardSettings',
  initialState,
  reducers: {
    setInstrument: (state, action: PayloadAction<number>) => { state.instrument = action.payload },
    setFretSpacing: (state, action: PayloadAction<boolean>) => { state.constFretSpacing = action.payload },
    setStringNum: (state, action: PayloadAction<number>) => { 
      state.stringNum = action.payload;
      state.fretboardMapping = initialiseFretboardMapping(action.payload, 24);
    },
    setHold: (state, action: PayloadAction<boolean>) => { state.hold = action.payload },
    // makeNewMapping: (state, action: PayloadAction<boolean>) => { state.hold = action.payload },
  },
});

export const { setFretSpacing, setStringNum, setHold } = fretboardSettingsSlice.actions;
export default fretboardSettingsSlice.reducer;