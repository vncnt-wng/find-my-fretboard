import * as Tone from 'tone';
import { Note, noteString } from "../MusicModel/note";
import { synth } from "./synth";
import { store } from '../app/store';
import { setHeldNotes } from '../Components/Slices/notesSlice';
import { FretboardNote } from '../MusicModel/instrument';

export const playNotes = (notes: Note[]): void => {
  const noteNames = notes.map(n => noteString(n));
  synth.triggerAttackRelease(noteNames, 0.5);
}

export interface MidiNoteData {
  name: string,
  duration: number, 
  time: number,
  velocity: number,
}

export interface PlayoutNoteData {
  midiNote: MidiNoteData
  fretboardNote: FretboardNote
}

export type PlayoutPattern = PlayoutNoteData[][]

export const playPlayoutPattern = (pattern: PlayoutPattern): void  => {
  console.log(pattern);
  const transport = Tone.getTransport();
  const draw = Tone.getDraw();

  transport.cancel();
  transport.seconds = 0

  pattern.forEach(noteList => {
    const midiData = noteList[0].midiNote;
    const notesNames = noteList.map(n => n.midiNote.name);
    const fretboardNotes = noteList.map(n => n.fretboardNote);

    // schedule audio
    synth.triggerAttackRelease(
      notesNames,
      midiData.duration,
      midiData.time,
      midiData.velocity
    );
    
    // schedule overlay at time
    transport.schedule(time => {
      draw.schedule(() => {
        console.log('scheduled', fretboardNotes);
        store.dispatch(setHeldNotes(fretboardNotes));
      }, time);
    }, midiData.time);
  });
  transport.start();
}