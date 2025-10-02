import { CSSProperties } from 'react'
import { Provider } from 'react-redux';
import { store } from './app/store';
import SettingsBar from './Components/SettingsBar';
import Fretboard from './Components/Fretboard/FretBoard';
import SelectedNotes from './Components/SelectedNotes';
import Listeners from './Components/Listeners';
import { NotePattern, UserPatternPreferences } from './MusicModel/pattern';
import { NoteName } from './MusicModel/note';
import { makePlayoutPattern } from './MusicModel/makePlayoutPattern';
import { playPlayoutPattern } from './Audio/play';

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
  gap: '30px',
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif'
}

const App = () => {
  return (
    <Provider store={store}>
      <div style={pageContainerStyle}>
        <SettingsBar />
        <Listeners/>
        <SelectedNotes />
        <Fretboard />
        <PatternPlayer />
      </div>
    </Provider>
  )
}

const PatternPlayer = () => {

  const GMajor: NotePattern = [
    [{ name: NoteName.G, octave: 1 }],
    [{ name: NoteName.A, octave: 1 }],
    [{ name: NoteName.B, octave: 1 }],
    [{ name: NoteName.C, octave: 2 }],
    [{ name: NoteName.D, octave: 2 }],
    [{ name: NoteName.E, octave: 2 }],
    [{ name: NoteName.F_SHARP, octave: 2 }],
    [{ name: NoteName.G, octave: 2 }],
  ] 
  
  const defaultPrefs: UserPatternPreferences = {
    stretch: 3,
    skipWeight: 0.9,
    shiftWeight: 0.7,
    openStringWeight: 1.3,
  }
  
  const playPattern = () => {
    var pattern = makePlayoutPattern(
      GMajor, 
      {
        fretboardMapping: store.getState().fretboardSettings.fretboardMapping, 
        settings: defaultPrefs 
      }
    )

    playPlayoutPattern(pattern);
  }

  return (
    <button onClick={playPattern}>play G major</button>
    // <div style={{paddingTop: '20px', width: '90%', height: '50px', backgroundColor: 'orange', borderRadius: '10px'}} ></div>
  )
}

export default App
