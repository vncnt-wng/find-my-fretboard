import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { noteCmp, NoteNameToStringMapping } from '../MusicModel/note';
import { InstrumentType } from '../MusicModel/instrument';

const SelectedNotes = () => {
  const instrumentType = useSelector((state: RootState) => state.fretboardSettings.instrumentType);
  const { selectedKeyNotes, selectedFretboardNotes } = useSelector((state: RootState) => state.noteState)
  const selectedNotes = instrumentType == InstrumentType.KEYS
    ? selectedKeyNotes
    : selectedFretboardNotes.map(fn => fn.note)

  // move to reducer? 
  const sortedSelection = [...selectedNotes].sort((a, b) => noteCmp(a, b));

  return (
    <div style={{ height: '3rem', fontSize: '3rem', textAlign: 'center' }}>
      {sortedSelection.map(n => 
        `${NoteNameToStringMapping[n.name]}${n.octave}`).join(', ')
      }
    </div>
  )
}

export default SelectedNotes;