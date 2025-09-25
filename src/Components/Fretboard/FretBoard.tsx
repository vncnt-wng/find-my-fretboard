import { CSSProperties, ReactElement } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import StringNames from './StringNames';
import FretboardOverlay from './FretboardOverlay';

const Fretboard = (): ReactElement => {
  const numStrings = useSelector((state: RootState) => state.fretboardSettings.stringNum);

  const fretboardStyle: CSSProperties = {
    backgroundColor: 'navajowhite',
    width: '95%',
    height: `${5 + numStrings - 4}rem`,
    flexGrow: 0,
    position: 'relative'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', width: '100%', padding: '5rem', boxSizing: 'border-box' }}>
      <StringNames numStrings={numStrings} />
      <div style={fretboardStyle}>
        <FretboardOverlay numStrings={numStrings} />
        {/* <Strings numStrings={numStrings} /> */}
      </div>
    </div>
  )
}

export default Fretboard;