import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteName, NoteNameToStringMapping, Note, StringPosition, noteEq, FretboardNote, stringPositionEq } from '../../MusicModel/model';

interface NoteState {
  selectedNotes: FretboardNote[],
}

const initialState: NoteState = {
  selectedNotes: []
}

const setSingleNoteReducer = (state: NoteState, note: PayloadAction<FretboardNote>) => {
  state.selectedNotes = [note.payload];
}

const setHeldNoteReducer = (state: NoteState, note: PayloadAction<FretboardNote>) => {
  const matchStringIndex = state.selectedNotes.findIndex(
    n => noteEq(n.stringPos.openString, note.payload.stringPos.openString)
  );
  if (matchStringIndex == -1) {
    state.selectedNotes.push(note.payload);
  } 
  else
  {
    const matchStringPos = state.selectedNotes[matchStringIndex].stringPos;
    state.selectedNotes.splice(matchStringIndex, 1);
    if (!stringPositionEq(note.payload.stringPos, matchStringPos)) {
      state.selectedNotes.push(note.payload)
    }
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