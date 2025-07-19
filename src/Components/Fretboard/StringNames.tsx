import { useMemo, CSSProperties } from 'react'

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

export default StringNames;