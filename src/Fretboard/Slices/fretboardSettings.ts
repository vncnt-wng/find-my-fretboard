import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FretboardSettings {
  constFretSpacing: boolean,
  stringNum: number
}

const initialState: FretboardSettings = {
  constFretSpacing: false,
  stringNum: 4
}

const fretboardSettingsSlice = createSlice({
  name: 'fretboardSettings',
  initialState,
  reducers: {
    setFretSpacing: (state, action: PayloadAction<boolean>) => { state.constFretSpacing = action.payload  },
    setStringNum: (state, action: PayloadAction<number>) => { state.stringNum = action.payload },
  },
});

export const { setFretSpacing, setStringNum } = fretboardSettingsSlice.actions;
export default fretboardSettingsSlice.reducer;