import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setFretSpacing, setStringNum, setHold, setInstrument } from './Slices/fretboardSettingsSlice';
import { Instrument, InstrumentToStringNumRange } from '../MusicModel/model';
import { clear } from './Slices/notesSlice';

const SettingsBar = () => {
  const fretboardSpacing = useSelector((state: RootState) => state.fretboardSettings.constFretSpacing);
  const hold = useSelector((state: RootState) => state.fretboardSettings.hold);
  const dispatch = useDispatch();

  return (
    <div style={{ width: '100%', height: '3rem', position: 'fixed', top: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
      <div style={{width: '100%', display: 'flex', justifyContent: 'end', flexDirection: 'row', alignItems: 'center', gap: '2rem'}}>
        <div>
            Constant Width Frets: <input checked={fretboardSpacing} onChange={e => dispatch(setFretSpacing(e.target.checked))} type="checkbox" style={{ marginLeft: '1rem' }} />
        </div>
        <StringAndInstrumentSelection />
        <div>
            Hold notes: <input checked={hold} onChange={e => dispatch(setHold(e.target.checked))} type="checkbox" style={{ marginLeft: '1rem' }} />
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
      <div>
        Instrument:
        <select 
          value={instrument} 
          onChange={e => {
            dispatch(clear())
            dispatch(setInstrument(Number(e.target.value)))} 
          }
          name="numStrings" style={{ marginLeft: '1rem', padding: '0.2rem' }}
          
        >
          <option value={Instrument.BASS}>Bass</option>
          <option value={Instrument.GUITAR}>Guitar</option>
        </select>
      </div>
      <div>
        Number of strings: 
        <select value={stringNum} onChange={e => dispatch(setStringNum(Number(e.target.value)))} name="numStrings" style={{ marginLeft: '1rem', padding: '0.2rem' }}>
          {Array.from({ length: stringRange[1] - stringRange[0] + 1 }, (_, i) => 
            <option value={stringRange[0]}>{stringRange[0] + i}</option>
          )}
        </select>
      </div>
    </>
  )
}

export default SettingsBar;