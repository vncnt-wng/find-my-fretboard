import { configureStore } from '@reduxjs/toolkit';
import fretboardSettingsReducer from '../Components/Slices/fretboardSettingsSlice'
import noteStateReducer from '../Components/Slices/notesSlice';


export const store = configureStore({
  reducer: {
    fretboardSettings: fretboardSettingsReducer,
    noteStateReducer: noteStateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;