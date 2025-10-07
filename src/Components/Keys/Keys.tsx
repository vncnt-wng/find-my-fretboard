import { useState } from "react";
import { nextNote, Note, NoteName } from "../../MusicModel/note";
import { PatternMarker } from "../Fretboard/FretboardOverlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { stringPositionsContain } from "../../MusicModel/instrument";
import { setKeyHeldNote, setKeySingleNote } from "../Slices/notesSlice";

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
  const startingNote: Note = { name: NoteName.C, octave: 2 }
  const keys = makeKeys(startingNote, keyNum);
  
  const blackKeys = [
    NoteName.C_SHARP,
    NoteName.D_SHARP,
    NoteName.F_SHARP,
    NoteName.G_SHARP,
    NoteName.A_SHARP
  ]

  const blackKeyWidth = 16;
  const whiteKeyWidth = 26;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'center',
      height: '110px',
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
                  ? '70px'
                  : '110px',
                position: blackKey
                  ? 'absolute'
                  : undefined,
                left: blackKey
                  ? `${whiteKeyWidth * (i - skippedNum) - blackKeyWidth / 2}px`
                  : undefined
              }}
            >
              <Key note={k} blackKey={blackKey}/>
            </div>
          )
        })
      }
    </div>
  )
}

const Key = ({note, blackKey}: {note: Note, blackKey: boolean}) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const { hold } = useSelector((state: RootState) => state.fretboardSettings);
  const selectedKeysNotes = useSelector((state: RootState) => state.noteState.selectedKeyNotes)

  const held = selectedKeysNotes.includes(note);

  const setNote = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(note);
    if (hold) {
      dispatch(setKeyHeldNote(note));
    } else {
      dispatch(setKeySingleNote(note));
    }
  }

  return (
    <div 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={setNote}
      style={{
        height:'100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        paddingBottom: '3px',
        boxSizing: 'border-box',
        backgroundColor: hover && held
          ? 'tomato'
          : hover 
            ? 'orange'
            : held 
              ? 'orangered'
              : '' 
   
      }}
    >
      <PatternMarker 
        note={note} 
        scaleColor={blackKey ? 'white' : 'black'} 
        position={undefined}
      />
    </div>
  )
}


export default Keys;