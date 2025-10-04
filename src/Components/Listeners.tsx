import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { RootState } from "../app/store";
import { playNotes } from "../Audio/play";
import { clearSelectedNotes } from "./Slices/notesSlice";

const Listeners = () => {
  const store = useStore<RootState>();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      console.log(e);
      if (e.code === "Space") {
        const selectedNotes = store.getState().noteState.selectedNotes;
        playNotes(selectedNotes.map(n => n.note));
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