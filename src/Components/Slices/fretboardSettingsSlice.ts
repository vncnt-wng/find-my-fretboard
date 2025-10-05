import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FretboardMapping, initialiseFretboardMapping, Instrument as StringInstrument, InstrumentToStringNumRange, InstrumentType } from '../../MusicModel/instrument';


interface FretboardSettings {
  instrumentType: InstrumentType,
  stringInstrument: StringInstrument,
  hold: boolean,
  constFretSpacing: boolean,
  stringNum: number,
  fretboardMapping: FretboardMapping
}

const initialState: FretboardSettings = {
  instrumentType: InstrumentType.FRETBOARD,
  stringInstrument: StringInstrument.BASS,
  constFretSpacing: false,
  stringNum: 4,
  hold: false,
  fretboardMapping: initialiseFretboardMapping(StringInstrument.BASS, 4, 24)
}

const changeInstrumentType = (state: FretboardSettings, action: PayloadAction<InstrumentType>) => {
  state.instrumentType = action.payload;
  if (InstrumentType.FRETBOARD) {
    setStringInstrument(state, state.stringInstrument)
  }
  state.stringNum = InstrumentToStringNumRange[state.stringInstrument][0];
  state.fretboardMapping = initialiseFretboardMapping(state.stringInstrument, state.stringNum, 24)
}

const setStringInstrument = (state: FretboardSettings, instrument: StringInstrument) => {
  state.stringInstrument = instrument;
  state.stringNum = InstrumentToStringNumRange[state.stringInstrument][0];
  state.fretboardMapping = initialiseFretboardMapping(state.stringInstrument, state.stringNum, 24)
}

const changeInstrument = (state: FretboardSettings, action: PayloadAction<StringInstrument>) => {
  setStringInstrument(state, action.payload);
}

const fretboardSettingsSlice = createSlice({
  name: 'fretboardSettings',
  initialState,
  reducers: {
    setInstrumentType: changeInstrumentType,
    setInstrument: changeInstrument,
    setFretSpacing: (state, action: PayloadAction<boolean>) => { state.constFretSpacing = action.payload },
    setStringNum: (state, action: PayloadAction<number>) => { 
      state.stringNum = action.payload;
      state.fretboardMapping = initialiseFretboardMapping(state.stringInstrument, action.payload, 24);
    },
    setHold: (state, action: PayloadAction<boolean>) => { state.hold = action.payload },
    // makeNewMapping: (state, action: PayloadAction<boolean>) => { state.hold = action.payload },
  },
});

export const { setInstrument, setInstrumentType, setFretSpacing, setStringNum, setHold } = fretboardSettingsSlice.actions;
export default fretboardSettingsSlice.reducer;