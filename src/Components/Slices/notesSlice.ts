import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, noteEq, NoteName } from '../../MusicModel/note';
import { FretboardNote, stringPositionEq } from '../../MusicModel/instrument';
import { playNotes } from '../../Audio/play';

interface NoteState {
  selectedNotes: FretboardNote[],
  scaleNames: NoteName[],
  highlightedNames: NoteName[],
  highlightedNotes: Note[] // need to figure out how UX of all these together will work
}

const initialState: NoteState = {
  selectedNotes: [],
  scaleNames: [],
  highlightedNames: [],
  highlightedNotes: []
}

const setScaleNamesReducer = (state: NoteState, action: PayloadAction<NoteName[]>) => {
  state.scaleNames = action.payload;
}

const setHighlightedNamesReducer = (state: NoteState, action: PayloadAction<NoteName[]>) => {
  state.highlightedNames = action.payload;
}

const clearScaleNamesReducer = (state: NoteState) => {
  state.scaleNames = [];
}

const clearHighlightedNamesReducer = (state: NoteState) => {
  state.highlightedNames = [];
}

const clearSelectedNotesReducer = (state: NoteState) => {
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

const setHeldNotesReducer = (state: NoteState, notes: PayloadAction<FretboardNote[]>) => {
  // TODO - eventually want to be able to do individually moving voices instead of changing all held notes
  state.selectedNotes = notes.payload;
  playNotes(state.selectedNotes.map(n => n.note));
}

export const notesSlice = createSlice({
  name: 'notesStateSlice',
  initialState,
  reducers: {
    setScaleNames: setScaleNamesReducer,
    setHighlightedNames: setHighlightedNamesReducer,
    setSingleNote: setSingleNoteReducer,
    setHeldNote: setHeldNoteReducer,
    setHeldNotes: setHeldNotesReducer,
    clearSelectedNotes: clearSelectedNotesReducer,
    clearScaleNames: clearScaleNamesReducer,
    clearHighlightedNames: clearHighlightedNamesReducer,
  }
});

export const { 
  setScaleNames,
  setHighlightedNames,
  setSingleNote, 
  setHeldNote, 
  setHeldNotes, 
  clearScaleNames,
  clearHighlightedNames,
  clearSelectedNotes
} = notesSlice.actions;

export default notesSlice.reducer;