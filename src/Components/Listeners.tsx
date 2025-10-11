import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { RootState } from "../app/store";
import { playNotes } from "../Audio/play";
import { clearSelectedNotes } from "./Slices/notesSlice";
import { InstrumentType } from "../MusicModel/instrument";

const Listeners = () => {
  const store = useStore<RootState>();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      console.log(e);
      if (e.code === "Space") {
        const instrumentType = store.getState().fretboardSettings.instrumentType;
        const selectedNotes = instrumentType === InstrumentType.FRETBOARD
          ? store.getState().noteState.selectedFretboardNotes.map(n => n.note)
          : store.getState().noteState.selectedKeyNotes;
        playNotes(selectedNotes);
      }
      if (e.code === "Backspace") {
        dispatch(clearSelectedNotes())
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (<></>);
}

export default Listeners;