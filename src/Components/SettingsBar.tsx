import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setFretSpacing, setStringNum } from '../Components/Fretboard/Slices/fretboardSettings';

const SettingsBar = () => {
  const stringNum = useSelector((state: RootState) => state.fretboardSettings.stringNum);
  const fretboardSpacing = useSelector((state: RootState) => state.fretboardSettings.constFretSpacing);
  const dispatch = useDispatch();

  return (
    <div style={{ width: '100%', height: '3rem', display: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
      <div style={{width: '100%', display: 'flex', justifyContent: 'end', flexDirection: 'row', alignItems: 'center', gap: '2rem'}}>
      <div>
          Constant Width Frets: <input checked={fretboardSpacing} onChange={e => dispatch(setFretSpacing(e.target.checked))} type="checkbox" style={{ marginLeft: '1rem' }} />
      </div>
      <div>
        Number of strings: 
        <select value={stringNum} onChange={e => dispatch(setStringNum(Number(e.target.value)))} name="numStrings" style={{ marginLeft: '1rem', padding: '0.2rem' }}>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        </select></div>
      </div>
    </div>
  )
}

export default SettingsBar;