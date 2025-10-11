import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setFretSpacing, setStringNum, setHold, setInstrument, setInstrumentType } from './Slices/fretboardSettingsSlice';
import { Instrument, InstrumentToStringNumRange, InstrumentType } from '../MusicModel/instrument';
import { clearKeySelectedNotes, clearSelectedNotes } from './Slices/notesSlice';
import { colours } from './styles';

const settingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
}

const boxStyle = {
  verticalAlign: 'bottom', 
  color: 'white', 
  backgroundColor: 'transparent',
  border: 'solid 1px lightsteelblue',
  borderRadius: '5px',
  outline: 'none'
}

const checkboxStyle = {
  ...boxStyle,
  margin: '0 0 0 1px'
}


const SettingsBar = () => {
  const { hold, instrumentType } = useSelector((state: RootState) => state.fretboardSettings);
  const dispatch = useDispatch();

  const handleSetInstrumentType = (instrumentType: InstrumentType) => {
    dispatch(setInstrumentType(instrumentType));
    // TODO handle converting between these two
    dispatch(clearSelectedNotes())
    dispatch(clearKeySelectedNotes())
  }

  return (
    <>
      <div style={{height: '5rem'}}></div>
      <div style={{ width: '100%', height: '5rem', position: 'fixed', top: 0, backgroundColor: colours.panel }}>
        <div style={{ display: 'flex', height: '100%', justifyContent: 'spaceBetween', alignItems: 'center', padding: '0 2rem' }}>
          <div style={{ fontSize: '1.5rem', width: '100%', display: 'flex',  alignItems: 'end', height: '2rem', gap: '5px'}}>
            <span style={{height: '2rem', paddingTop: '1px'}}>find my </span>
            <select 
              style={{ 
                height: '2rem', 
                fontSize: '1.4rem',
                ...boxStyle
              }}
              value={instrumentType}
              onChange={e => {
                handleSetInstrumentType(Number(e.target.value))
              }}
            >
              {/* <optgroup style={{fontSize: '1.5rem'}}> */}
                <option value={InstrumentType.FRETBOARD}>fretboard</option>
                <option value={InstrumentType.KEYS}>keys</option>
                <option value={InstrumentType.KEYS}>chords</option>
              {/* </optgroup> */}
            </select>
          </div>
          <div style={{fontSize: '1rem', flexWrap: 'nowrap', width: '100%', height: '100%', display: 'flex', justifyContent: 'end', flexDirection: 'row', alignItems: 'center', gap: '2rem'}}>
            {
              instrumentType == InstrumentType.FRETBOARD
                ? <StringInstrumentSettings />
                : <></>
            }
            <div style={settingStyle}>
              hold notes: 
              <input
                style={checkboxStyle}
                checked={hold} 
                onChange={e => {
                  dispatch(setHold(e.target.checked))
                  if (!e.target.checked) {
                    dispatch(clearSelectedNotes())
                    dispatch(clearKeySelectedNotes())
                  }
                }} 
                type="checkbox" 
              />
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

const StringInstrumentSettings = () => {
  const { stringInstrument: instrument, stringNum, constFretSpacing } = useSelector((state: RootState) => state.fretboardSettings);
  const stringRange = InstrumentToStringNumRange[instrument];
  const dispatch = useDispatch();
  
  return (
    <>
     <div style={settingStyle}>
          constant width frets: 
          <input 
            style={checkboxStyle}
            checked={constFretSpacing} 
            onChange={e => dispatch(setFretSpacing(e.target.checked))} 
            type="checkbox"
          />
      </div>
      <div style={settingStyle}>
        instrument:
        <select
          value={instrument}
          name="numStrings"
          onChange={e => {
            dispatch(clearSelectedNotes())
            dispatch(setInstrument(Number(e.target.value)))} 
          }
          
        >
          <option value={Instrument.BASS}>Bass</option>
          <option value={Instrument.GUITAR}>Guitar</option>
        </select>
      </div>
      <div style={settingStyle}>
        number of strings: 
        <select 
          value={stringNum} 
          onChange={e => dispatch(setStringNum(Number(e.target.value)))} 
          name="numStrings"
        >
          {Array.from({ length: stringRange[1] - stringRange[0] + 1 }, (_, i) => 
            <option key={i} value={stringRange[0] + i}>{stringRange[0] + i}</option>
          )}
        </select>
      </div>
    </>
  )
}

export default SettingsBar;