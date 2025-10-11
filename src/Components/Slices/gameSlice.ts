import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FretboardNote } from '../../MusicModel/instrument';
import { Note, NoteName } from '../../MusicModel/note';

export type GameType = 'notes' | 'intervals'
export type Question = Note | FretboardNote
export type Answer = NoteName[] | Note[] | FretboardNote[]

interface GameState {
  gameType: GameType | null,
  question: Question | null,
  answer: Answer | null
  // TODO
  // right/wrong tally
  // skipped
}

const initialState: GameState = {
  gameType: null,
  question: null,
  answer: null
}

const makeQuestionAndAnswer = (state: GameState, ) => {
  
}

const setGameTypeReducer = (state: GameState, action: PayloadAction<GameType>) => {
  state.gameType = action.payload;
  makeQuestionAndAnswerReducer(state);
}

const makeQuestionAndAnswerReducer = (state: GameState) => {

}

export const gameStateSlice = createSlice({
  name: 'notesStateSlice',
  initialState,
  reducers: {

  }
});

export const { 
} = gameStateSlice.actions;
export default gameStateSlice.reducer;

