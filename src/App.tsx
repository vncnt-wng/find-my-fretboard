import { CSSProperties } from 'react'
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './app/store';
import SettingsBar from './Components/SettingsBar';
import Fretboard from './Components/Instruments/Fretboard/FretBoard';
import SelectedNotes from './Components/SelectedNotes';
import Listeners from './Components/Listeners';
import PatternPlayer from './Components/PatternPlayer/PatternPlayer';
import Keys from './Components/Instruments/Keys/Keys';
import { InstrumentType } from './MusicModel/instrument';

const pageContainerStyle: CSSProperties = {
  backgroundColor: '#2f3e51ff',
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
  console.log(instrumentType)
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '120px'}}>
      {
          instrumentType == InstrumentType.FRETBOARD
            ? <Fretboard />
            : instrumentType == InstrumentType.KEYS 
              ? <Keys />
              : instrumentType == InstrumentType.CHORDS
                ? <>coming soon...</>
                : <></>
      }
    </div>
  )

}


export default App
