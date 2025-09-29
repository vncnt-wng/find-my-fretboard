import { CSSProperties } from 'react'
import { Provider } from 'react-redux';
import { store } from './app/store';
import SettingsBar from './Components/SettingsBar';
import Fretboard from './Components/Fretboard/FretBoard';
import SelectedNotes from './Components/SelectedNotes';
import Listeners from './Components/Listeners';

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
      <div style={pageContainerStyle}>
        <SettingsBar />
        <Listeners/>
        <SelectedNotes />
        <Fretboard />
        {/* <PatternPlayer /> */}
      </div>
    </Provider>
  )
}

const PatternPlayer = () => {
  return (
    <div style={{width: '90%', height: '100px', backgroundColor: 'orange'}} ></div>
  )
}

export default App
