import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setFretSpacing, setStringNum, setHold, setInstrument } from './Slices/fretboardSettingsSlice';
import { Instrument, InstrumentToStringNumRange } from '../MusicModel/model';
import { clear } from './Slices/notesSlice';

const settingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
}

const checkboxStyle = {
  margin: '0 0 0 1px'
}

const SettingsBar = () => {
  const fretboardSpacing = useSelector((state: RootState) => state.fretboardSettings.constFretSpacing);
  const hold = useSelector((state: RootState) => state.fretboardSettings.hold);
  const dispatch = useDispatch();

  return (
    <div style={{ width: '100%', height: '5rem', position: 'fixed', top: 0, backgroundColor: 'grey' }}>
      <div style={{ display: 'flex', height: '100%', justifyContent: 'spaceBetween', alignItems: 'center', padding: '0 2rem' }}>
        <div style={{ fontSize: '1.5rem', width: '100%' }}>Find my Fretboard</div>
        <div style={{fontSize: '1rem', flexWrap: 'nowrap', width: '100%', height: '100%', display: 'flex', justifyContent: 'end', flexDirection: 'row', alignItems: 'center', gap: '2rem'}}>
          <div style={settingStyle}>
              Constant Width Frets: 
              <input 
                style={checkboxStyle}
                checked={fretboardSpacing} 
                onChange={e => dispatch(setFretSpacing(e.target.checked))} 
                type="checkbox"
              />
          </div>
          <StringAndInstrumentSelection />
          <div style={settingStyle}>
            Hold notes: 
            <input
              style={checkboxStyle}
              checked={hold} 
              onChange={e => dispatch(setHold(e.target.checked))} 
              type="checkbox" 
            />
          </div>
        </div>
      </div>
      
    </div>
  )
}

const StringAndInstrumentSelection = () => {
  const { instrument, stringNum } = useSelector((state: RootState) => state.fretboardSettings);
  const stringRange = InstrumentToStringNumRange[instrument];
  const dispatch = useDispatch();
  
  return (
    <>
      <div style={settingStyle}>
        Instrument:
        <select
          value={instrument}
          name="numStrings"
          onChange={e => {
            dispatch(clear())
            dispatch(setInstrument(Number(e.target.value)))} 
          }
          
        >
          <option value={Instrument.BASS}>Bass</option>
          <option value={Instrument.GUITAR}>Guitar</option>
        </select>
      </div>
      <div style={settingStyle}>
        Number of strings: 
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