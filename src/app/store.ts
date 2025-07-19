import { configureStore } from '@reduxjs/toolkit';
import fretboardSettingsReducer from '../Fretboard/Slices/fretboardSettings'

export const store = configureStore({
  reducer: {
    fretboardSettings: fretboardSettingsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;