import * as Tone from "tone";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { RootState } from "../app/store";
import { playNotes, playPlayoutPattern } from "../Audio/play";
import { clear } from "./Slices/notesSlice";
import { makePlayoutPattern } from "../MusicModel/makePlayoutPattern";
import { NotePattern, UserPatternPreferences } from "../MusicModel/pattern";
import { NoteName } from "../MusicModel/note";

const Listeners = () => {
  const store = useStore<RootState>();
  const dispatch = useDispatch();

  const cMajor: NotePattern = [
    { name: NoteName.G, octave: 1 },
    { name: NoteName.A, octave: 1 },
    { name: NoteName.B, octave: 1 },
    { name: NoteName.C, octave: 2 },
    { name: NoteName.D, octave: 2 },
    { name: NoteName.E, octave: 2 },
    { name: NoteName.F_SHARP, octave: 2 },
    { name: NoteName.G, octave: 2 },
  ] 
  
  const defaultPrefs: UserPatternPreferences = {
    stretch: 3,
    skipWeight: 0.9,
    shiftWeight: 0.7,
    openStringWeight: 1.3,
  }

  const startAudio = async () => {
    await Tone.start(); 
    console.log("audio started");
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      console.log(e);
      if (e.code === "Space") {
        const selectedNotes = store.getState().noteStateReducer.selectedNotes;
        playNotes(selectedNotes.map(n => n.note));
      }
      if (e.code === "Backspace") {
        dispatch(clear())
      }
      if (e.key === "s") {
        startAudio();
      }
      if (e.key === "p") {
        var pattern = makePlayoutPattern(
          cMajor, 
          {
            fretboardMapping: store.getState().fretboardSettings.fretboardMapping, 
            settings: defaultPrefs 
          }
        )

        playPlayoutPattern(pattern);
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (<></>);
}

export default Listeners;