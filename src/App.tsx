import { CSSProperties } from 'react'
import { Provider } from 'react-redux';
import { store } from './app/store';
import SettingsBar from './Components/SettingsBar';
import Fretboard from './Components/Fretboard/FretBoard';

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
  const noteName = 'B';
  return (
    <Provider store={store}>
      <SettingsBar />
      <div style={pageContainerStyle}>
        
        <div style={{ fontSize: '3rem', textAlign: 'center' }}>{noteName}</div>
        <Fretboard/>
      </div>
    </Provider>
  )
}

export default App
