import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteName, NoteNameToStringMapping, Note, StringIndex, noteEq } from '../../MusicModel/model';

interface NoteState {
  selectedNotes: Note[],
}

const initialState: NoteState = {
  selectedNotes: []
}

const setSingleNoteReducer = (state: NoteState, note: PayloadAction<Note>) => {
  state.selectedNotes = [note.payload];
}

const setHeldNoteReducer = (state: NoteState, note: PayloadAction<Note>) => {
  const matchIndex = state.selectedNotes.findIndex(n => noteEq(n, note.payload));
  if (matchIndex == -1) {
    state.selectedNotes.push(note.payload);
  } 
  else
  {
    state.selectedNotes.splice(matchIndex, 1);
  }
}

export const notesSlice = createSlice({
  name: 'notesStateSlice',
  initialState,
  reducers: {
    setSingleNote: setSingleNoteReducer,
    setHeldNote: setHeldNoteReducer
  }
});

export const { setSingleNote, setHeldNote } = notesSlice.actions;
export default notesSlice.reducer;