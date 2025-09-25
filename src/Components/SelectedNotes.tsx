import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { noteCmp, NoteNameToStringMapping } from '../MusicModel/model';

const SelectedNotes = () => {
  const selectedNotes = useSelector((state: RootState) => state.noteStateReducer.selectedNotes);
  // move to reducer? 
  const sortedSelection = [...selectedNotes].sort((a, b) => noteCmp(a.note, b.note));

  return (
    <div style={{ fontSize: '3rem', textAlign: 'center' }}>
      {sortedSelection.map(n => 
        `${NoteNameToStringMapping[n.note.name]}${n.note.octave}`).join(', ')
      }
    </div>
  )
}

export default SelectedNotes;