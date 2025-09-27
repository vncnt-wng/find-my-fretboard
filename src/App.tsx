import { CSSProperties, useEffect } from 'react'
import { Provider, useDispatch, useSelector, useStore } from 'react-redux';
import { RootState, store } from './app/store';
import SettingsBar from './Components/SettingsBar';
import Fretboard from './Components/Fretboard/FretBoard';
import SelectedNotes from './Components/SelectedNotes';
import { playNotes } from './Audio/play';
import { clear } from './Components/Slices/notesSlice';

const pageContainerStyle: CSSProperties = {
  backgroundColor: '#233040',
  width: '100vw',
  maxWidth: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '10px',
  color: 'white',
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif'
}

const App = () => {
  return (
    <Provider store={store}>
      <SettingsBar />
      <div style={pageContainerStyle}>
        <Listeners/>
        <SelectedNotes />
        <Fretboard />
      </div>
    </Provider>
  )
}

const Listeners = () => {
  const store = useStore<RootState>();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      console.log(e);
      if (e.code === "Space") {
        const selectedNotes = store.getState().noteStateReducer.selectedNotes;
        console.log(selectedNotes);
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

export default App
