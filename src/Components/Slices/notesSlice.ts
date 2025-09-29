import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { noteEq } from '../../MusicModel/note';
import { FretboardNote, stringPositionEq } from '../../MusicModel/instrument';
import { playNotes } from '../../Audio/play';

interface NoteState {
  selectedNotes: FretboardNote[],
}

const initialState: NoteState = {
  selectedNotes: []
}

const clearReducer = (state: NoteState) => {
  state.selectedNotes = [];
}

const setSingleNoteReducer = (state: NoteState, note: PayloadAction<FretboardNote>) => {
  state.selectedNotes = [note.payload];
  playNotes(state.selectedNotes.map(n => n.note));
}

const setHeldNoteReducer = (state: NoteState, note: PayloadAction<FretboardNote>) => {
  if (note.payload.stringPos == null) {
    return;
  }
  const matchStringIndex = state.selectedNotes.findIndex(
    n => noteEq(n.stringPos!.openString, note.payload.stringPos!.openString)
  );
  if (matchStringIndex == -1) {
    state.selectedNotes.push(note.payload);
    playNotes(state.selectedNotes.map(n => n.note));
  } 
  else
  {
    
    const matchStringPos = state.selectedNotes[matchStringIndex].stringPos!;
    state.selectedNotes.splice(matchStringIndex, 1);
    if (!stringPositionEq(note.payload.stringPos!, matchStringPos)) {
      state.selectedNotes.push(note.payload)
      playNotes(state.selectedNotes.map(n => n.note));
    }
  }
}

export const notesSlice = createSlice({
  name: 'notesStateSlice',
  initialState,
  reducers: {
    setSingleNote: setSingleNoteReducer,
    setHeldNote: setHeldNoteReducer,
    clear: clearReducer
  }
});

export const { setSingleNote, setHeldNote, clear } = notesSlice.actions;
export default notesSlice.reducer;