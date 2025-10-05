import { nextNote, Note, NoteName } from "../../MusicModel/note";
import { PatternMarker } from "../Fretboard/FretboardOverlay";

const makeKeys = (startingNote: Note, keys: number): Note[] => {
  const result = [];
  var current = startingNote;
  for (var i = 0; i < keys; i++) {
    result.push(current)
    current = nextNote(current);
  }

  return result;
}

const Keys = () => {
  const keyNum = 60;
  const startingNote: Note = { name: NoteName.C, octave: 1 }
  const keys = makeKeys(startingNote, keyNum);
  
  const blackKeys = [
    NoteName.C_SHARP,
    NoteName.D_SHARP,
    NoteName.F_SHARP,
    NoteName.G_SHARP,
    NoteName.A_SHARP
  ]

  const blackKeyWidth = 14;
  const whiteKeyWidth = 24;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'center',
      height: '100px',
      // width: '90%', 
      boxSizing: 'border-box',
      color: 'white',
      position: 'relative'
    }}>
      {
        keys.map((k, i) => {
          const blackKeyIndex = blackKeys.indexOf(k.name);
          const blackKey = blackKeyIndex != -1;
          // number of black keys so far - used for positioning black keys
          const skippedNum = blackKeyIndex + (Math.floor(i / 12) * 5)

          return (
            <div 
              style={{
                border: '1px black solid',
                boxSizing: 'border-box',
                backgroundColor: blackKey
                  ? 'black'
                  : 'white',
                width: blackKey
                  ? `${blackKeyWidth}px`
                  : `${whiteKeyWidth}px`,
                height: blackKey
                  ? '65px'
                  : '100px',
                position: blackKey
                  ? 'absolute'
                  : undefined,
                left: blackKey
                  ? `${whiteKeyWidth * (i - skippedNum) - blackKeyWidth / 2}px`
                  : undefined
              }}
            >
              <div 
                style={{
                  height:'100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'end',
                  paddingBottom: '3px',
                  boxSizing: 'border-box'
                }}
              >
                <PatternMarker note={k} scaleColor={blackKey ? 'white' : 'black'} />
              </div>
            </div>
          )
        }
          
        )
      }
    </div>
  )
}



export default Keys;