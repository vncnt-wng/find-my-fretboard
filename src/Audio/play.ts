import { Note, noteString } from "../MusicModel/note";
import { synth } from "./synth";

export const playNotes = (notes: Note[]): void => {
  const noteNames = notes.map(n => noteString(n));
  synth.triggerAttackRelease(noteNames, 0.5);
}

export const playMidi = (): void  => {

}