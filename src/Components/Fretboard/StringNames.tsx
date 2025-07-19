import { CSSProperties } from 'react'
import { getOpenStringNotes, NoteNameToStringMapping } from '../../MusicModel/model'

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
  const names = getOpenStringNotes(numStrings).map(n => NoteNameToStringMapping[n.name]).reverse();

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

export default StringNames;