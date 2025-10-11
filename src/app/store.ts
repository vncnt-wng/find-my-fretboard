import { configureStore } from '@reduxjs/toolkit';
import fretboardSettings from '../Components/Slices/fretboardSettingsSlice'
import noteState from '../Components/Slices/notesSlice';
import playerType from '../Components/Slices/playerTypeSlice';
import playerState from '../Components/Slices/playerSlice';

export const store = configureStore({
  reducer: {
    fretboardSettings: fretboardSettings,
    noteState: noteState,
    playerType: playerType,
    playerState: playerState,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;