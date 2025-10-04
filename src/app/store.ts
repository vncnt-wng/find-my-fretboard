import { configureStore } from '@reduxjs/toolkit';
import fretboardSettings from '../Components/Slices/fretboardSettingsSlice'
import noteState from '../Components/Slices/notesSlice';
import playerState from '../Components/Slices/playerSlice';

export const store = configureStore({
  reducer: {
    fretboardSettings: fretboardSettings,
    noteState: noteState,
    playerState: playerState
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;