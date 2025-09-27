import { CSSProperties, useState } from 'react'
import { FretboardNote, getOpenStringNotes, Note, NoteNameToStringMapping, stringPositionsContain } from '../../MusicModel/model'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { setHeldNote, setSingleNote } from '../Slices/notesSlice'

const stringSpacingStyle: CSSProperties = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.4rem 0',
  background: 'transparent',
  boxSizing: 'border-box'
}

const StringNames = () => {
  const notes = [...useSelector((state: RootState) => state.fretboardSettings.fretboardMapping.openStrings)].reverse();

  return (
    <div style={stringSpacingStyle}>
      {
        notes.map((note, i) => {
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', height: '0.5rem'}}>
              <StringName note={note} />
            </div>
          )
        })
      }
    </div >
  )
}

const StringName = ({ note }: {note: Note}) => {
  const [hover, setHover] = useState(false);
  const hold = useSelector((state: RootState) => state.fretboardSettings.hold);
  const heldPositions = [...useSelector((state: RootState) => state.noteStateReducer.selectedNotes)].map(fretNote => fretNote.stringPos)
  const name = NoteNameToStringMapping[note.name];
  const stringPos = {openString: note, index: 0} 
  const isHeld = stringPositionsContain(stringPos, heldPositions)
  const dispatch = useDispatch(); 

  const setOpenString = () => {
    const fretboardNote: FretboardNote = { note:note, stringPos: stringPos }
    if (hold) {
      dispatch(setHeldNote(fretboardNote));
    } else {
      dispatch(setSingleNote(fretboardNote));
    }
  }

  return (
    <span 
      style={{ height: '1rem', color: hover || isHeld ? 'red' : 'white' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={setOpenString}
    >
      {name}
    </span>
  )
}

export default StringNames;