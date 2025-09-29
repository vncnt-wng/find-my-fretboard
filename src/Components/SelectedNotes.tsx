import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { noteCmp, NoteNameToStringMapping } from '../MusicModel/note';

const SelectedNotes = () => {
  const selectedNotes = useSelector((state: RootState) => state.noteStateReducer.selectedNotes);
  // move to reducer? 
  const sortedSelection = [...selectedNotes].sort((a, b) => noteCmp(a.note, b.note));

  return (
    <div style={{ height: '6rem', fontSize: '3rem', textAlign: 'center' }}>
      {sortedSelection.map(n => 
        `${NoteNameToStringMapping[n.note.name]}${n.note.octave}`).join(', ')
      }
    </div>
  )
}

export default SelectedNotes;