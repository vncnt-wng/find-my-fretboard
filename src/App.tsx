import { CSSProperties } from 'react'
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './app/store';
import SettingsBar from './Components/SettingsBar';
import Fretboard from './Components/Fretboard/FretBoard';
import SelectedNotes from './Components/SelectedNotes';
import Listeners from './Components/Listeners';
import { NotePattern, UserPatternPreferences } from './MusicModel/pattern';
import { NoteName } from './MusicModel/note';
import { makePlayoutPattern } from './MusicModel/makePlayoutPattern';
import { playPlayoutPattern } from './Audio/play';
import PatternPlayer from './Components/PatternPlayer/PatternPlayer';
import Keys from './Components/Keys/Keys';
import { InstrumentType } from './MusicModel/instrument';

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
  gap: '60px',
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif'
}

const App = () => {
  return (
    <Provider store={store}>
      <div style={pageContainerStyle}>
        <SettingsBar />
        <Listeners/>
        <div style={{
          display:'flex',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '60px',
        }}>
          <SelectedNotes />
          <Instrument />
          <PatternPlayer />
        </div>
      </div>
    </Provider>
  )
}

const Instrument = () => {
  const instrumentType = useSelector((state: RootState) => state.fretboardSettings.instrumentType);
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '120px'}}>
      {
          instrumentType == InstrumentType.FRETBOARD
            ? <Fretboard />
            : InstrumentType.KEYS 
              ? <Keys />
              : <></>
      }
    </div>
  )

}


export default App
