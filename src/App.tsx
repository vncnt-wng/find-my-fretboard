import { useMemo, CSSProperties, ReactElement } from 'react'
import FretsAndMarkers from './FretsAndMarkers';

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
  const numStrings = 6;
  const noteName = 'B';
  return (
    <div style={pageContainerStyle}>
      <div style={{ fontSize: '3rem', textAlign: 'center' }}>{noteName}</div>
      <Fretboard numStrings={numStrings} />
    </div>
  )
}

const Fretboard = ({ numStrings }: { numStrings: number }): ReactElement => {
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
        <FretsAndMarkers numStrings={numStrings} />
        {/* <Strings numStrings={numStrings} /> */}
      </div>
    </div>
  )
}

const stringSpacingStyle: CSSProperties = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0.4rem 0',
  background: 'transparent',
  boxSizing: 'border-box'
}

const StringNames = ({ numStrings }: { numStrings: number }) => {

  const names: string[] = useMemo(() => {
    // TODO - this kind of logic will need to be refactored once we get into the playback stuff
    let result: string[] = ['E', 'A', 'D', 'G'];
    if (numStrings >= 5)
      result = ['B', ...result];
    if (numStrings >= 6)
      result = [...result, 'C'];
    return result.reverse();
  }, [numStrings])

  console.log(names)

  return (
    <div style={{
      ...stringSpacingStyle,
      padding: '-1rem',
      gap: 0,
      width: '5%',
      fontSize: '0.8rem',
      // TODO - refactor
      height: `${5 + numStrings - 4}rem`,
    }}>
      {
        names.map((name, i) => {
          return <div key={i} style={{ textAlign: 'right' }}>{name}</div>
        })
      }
    </div >
  )
}


export default App
