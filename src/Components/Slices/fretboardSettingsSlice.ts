import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FretboardMapping, initialiseFretboardMapping, Instrument, InstrumentToStringNumRange } from '../../MusicModel/instrument';


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
  fretboardMapping: initialiseFretboardMapping(Instrument.BASS, 4, 24)
}

const changeInstrument = (state: FretboardSettings, action: PayloadAction<Instrument>) => {
  state.instrument = action.payload;
  state.stringNum = InstrumentToStringNumRange[state.instrument][0];
  state.fretboardMapping = initialiseFretboardMapping(state.instrument, state.stringNum, 24)
}

const fretboardSettingsSlice = createSlice({
  name: 'fretboardSettings',
  initialState,
  reducers: {
    setInstrument: changeInstrument,
    setFretSpacing: (state, action: PayloadAction<boolean>) => { state.constFretSpacing = action.payload },
    setStringNum: (state, action: PayloadAction<number>) => { 
      console.log(action);
      state.stringNum = action.payload;
      state.fretboardMapping = initialiseFretboardMapping(state.instrument, action.payload, 24);
    },
    setHold: (state, action: PayloadAction<boolean>) => { state.hold = action.payload },
    // makeNewMapping: (state, action: PayloadAction<boolean>) => { state.hold = action.payload },
  },
});

export const { setInstrument, setFretSpacing, setStringNum, setHold } = fretboardSettingsSlice.actions;
export default fretboardSettingsSlice.reducer;