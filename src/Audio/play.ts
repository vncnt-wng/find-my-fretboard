import { Note, noteString } from "../MusicModel/model";
import { synth } from "./player";

export const playNotes = (notes: Note[]): void => {
  const noteNames = notes.map(n => noteString(n));
  synth.triggerAttackRelease(noteNames, 0.5);
}
