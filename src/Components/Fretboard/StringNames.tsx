import { CSSProperties, useEffect, useState } from 'react'
import { Note, NoteNameToStringMapping } from '../../MusicModel/note'
import { FretboardNote, stringPositionsContain } from '../../MusicModel/instrument'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { setHeldNote, setSingleNote } from '../Slices/notesSlice'
import { PatternMarker } from './FretboardOverlay'

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
  const [editing, setEditing] = useState<boolean>(false);
  const openStringNotes = useSelector((state: RootState) => state.fretboardSettings.fretboardMapping.openStrings);
  const notes = [...openStringNotes].reverse();

  const [editingNotes, setEditingNotes] = useState([...openStringNotes].reverse());

  useEffect(() => {
    setEditingNotes([...openStringNotes].reverse())
  }, [openStringNotes])

  const changeEditingNote = (value: string, index: number) => {
    
  }

  return (
    <div style={{ position: 'relative', width: '40px'}}>
      <div style={{position: 'absolute', top: '-40px', width: '100%', textAlign: 'center'}}>
        <button onClick={() => setEditing(b => !b)}>edit</button>  
      </div>
      { editing
          ? 
            <div style={{...stringSpacingStyle}}>
              {
                editingNotes.map((note, i) => {
                  return (
                      <div key={i} style={{  display: 'flex', alignItems: 'center', fontSize: '0.8rem', height: '0.5rem'}}>
                        <input 
                          onChange={e => changeEditingNote(e.target.value, i)}
                          style={{ height: '0.8rem', width: '25px', textAlign: 'center'}}
                          value={`${NoteNameToStringMapping[note.name]}${note.octave}`}
                        />
                      </div>
                      
                  )
                })
              }
            </div>
          : 
            <div style={stringSpacingStyle}>
              {
                notes.map((note, i) => {
                  return (
                    <div key={i} style={{  display: 'flex', alignItems: 'center', fontSize: '0.8rem', height: '0.5rem'}}>
                      <PatternMarker note={note} scaleColor='black' position='absolute' size={16} />
                      <StringName note={note} />
                    </div>
                  )
                })
              }
            </div>
      }
    </div>
  )
}

const StringName = ({ note }: {note: Note}) => {
  const [hover, setHover] = useState(false);
  // TODO this derived state is duplicated in StringSegment
  const hold = useSelector((state: RootState) => state.fretboardSettings.hold);
  const heldPositions = [...useSelector((state: RootState) => state.noteState.selectedFretboardNotes)].map(fretNote => fretNote.stringPos!)
  const name = NoteNameToStringMapping[note.name];
  const stringPos = {openString: note, index: 0, openStringIndex: 0 } 
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
      style={{ height: '1rem', color: hover || isHeld ? 'orangeRed' : 'white', zIndex:1000 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={setOpenString}
    >
      {name}
    </span>
  )
}

export default StringNames;