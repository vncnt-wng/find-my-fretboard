import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, noteEq, NoteName } from '../../MusicModel/note';
import { FretboardNote, stringPositionEq } from '../../MusicModel/instrument';
import { playNotes } from '../../Audio/play';

interface NoteState {
  selectedKeyNotes: Note[],
  selectedFretboardNotes: FretboardNote[],
  // scaleNames: NoteName[],
  // highlightedNames: NoteName[],
}

const initialState: NoteState = {
  selectedKeyNotes: [],
  selectedFretboardNotes: [],
  // scaleNames: [],
  // highlightedNames: [],
  // highlightedNotes: []
}

// const setScaleNamesReducer = (state: NoteState, action: PayloadAction<NoteName[]>) => {
//   state.scaleNames = action.payload;
// }

// const setHighlightedNamesReducer = (state: NoteState, action: PayloadAction<NoteName[]>) => {
//   state.highlightedNames = action.payload;
// }

// const clearScaleNamesReducer = (state: NoteState) => {
//   state.scaleNames = [];
// }

// const clearHighlightedNamesReducer = (state: NoteState) => {
//   state.highlightedNames = [];
// }

const clearKeySelectedNotesReducer = (state: NoteState) => {
  state.selectedKeyNotes = [];
}

const setKeySingleNoteReducer = (state: NoteState, note: PayloadAction<Note>) => {
  state.selectedKeyNotes = [note.payload];
  playNotes(state.selectedKeyNotes);
}

const setKeyHeldNoteReducer = (state: NoteState, note: PayloadAction<Note>) => {
  const matchIndex = state.selectedKeyNotes.findIndex(n => noteEq(n, note.payload));

  if (matchIndex != -1) {
    state.selectedKeyNotes.splice(matchIndex, 1);
  }
  else {
    state.selectedKeyNotes.push(note.payload)
  }
  playNotes(state.selectedKeyNotes);
}

const setKeyHeldNotesReducer = (state: NoteState, notes: PayloadAction<Note[]>) => {
  // TODO - eventually want to be able to do individually moving voices instead of changing all held notes
  state.selectedKeyNotes = notes.payload;
  playNotes(state.selectedKeyNotes);
}

const clearSelectedNotesReducer = (state: NoteState) => {
  state.selectedFretboardNotes = [];
}

const setSingleNoteReducer = (state: NoteState, note: PayloadAction<FretboardNote>) => {
  state.selectedFretboardNotes = [note.payload];
  playNotes(state.selectedFretboardNotes.map(n => n.note));
}

const setHeldNoteReducer = (state: NoteState, note: PayloadAction<FretboardNote>) => {
  if (note.payload.stringPos == null) {
    return;
  }
  const matchStringIndex = state.selectedFretboardNotes.findIndex(
    n => noteEq(n.stringPos!.openString, note.payload.stringPos!.openString)
  );
  if (matchStringIndex == -1) {
    state.selectedFretboardNotes.push(note.payload);
    playNotes(state.selectedFretboardNotes.map(n => n.note));
  } 
  else
  {
    
    const matchStringPos = state.selectedFretboardNotes[matchStringIndex].stringPos!;
    state.selectedFretboardNotes.splice(matchStringIndex, 1);
    if (!stringPositionEq(note.payload.stringPos!, matchStringPos)) {
      state.selectedFretboardNotes.push(note.payload)
      playNotes(state.selectedFretboardNotes.map(n => n.note));
    }
  }
}

const setHeldNotesReducer = (state: NoteState, notes: PayloadAction<FretboardNote[]>) => {
  // TODO - eventually want to be able to do individually moving voices instead of changing all held notes
  state.selectedFretboardNotes = notes.payload;
  playNotes(state.selectedFretboardNotes.map(n => n.note));
}

export const notesSlice = createSlice({
  name: 'notesStateSlice',
  initialState,
  reducers: {
    // setScaleNames: setScaleNamesReducer,
    // setHighlightedNames: setHighlightedNamesReducer,
    setKeySingleNote: setKeySingleNoteReducer,
    setKeyHeldNote: setKeyHeldNoteReducer,
    setKeyHeldNotes: setKeyHeldNotesReducer,
    clearKeySelectedNotes: clearKeySelectedNotesReducer,
    setSingleNote: setSingleNoteReducer,
    setHeldNote: setHeldNoteReducer,
    setHeldNotes: setHeldNotesReducer,
    clearSelectedNotes: clearSelectedNotesReducer,
    // clearScaleNames: clearScaleNamesReducer,
    // clearHighlightedNames: clearHighlightedNamesReducer,
  }
});

export const { 
  setKeySingleNote,
  setKeyHeldNote,
  setKeyHeldNotes,
  clearKeySelectedNotes,
  // setScaleNames,
  // setHighlightedNames,
  setSingleNote, 
  setHeldNote, 
  setHeldNotes, 
  // clearScaleNames,
  // clearHighlightedNames,
  clearSelectedNotes
} = notesSlice.actions;

export default notesSlice.reducer;