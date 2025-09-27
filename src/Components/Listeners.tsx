import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { RootState } from "../app/store";
import { playNotes } from "../Audio/play";
import { clear } from "./Slices/notesSlice";

const Listeners = () => {
  const store = useStore<RootState>();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const selectedNotes = store.getState().noteStateReducer.selectedNotes;
        playNotes(selectedNotes.map(n => n.note));
      }
      if (e.code === "Backspace") {
        dispatch(clear())
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (<></>);
}

export default Listeners;