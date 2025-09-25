import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { noteCmp, NoteNameToStringMapping } from '../MusicModel/model';

const SelectedNotes = () => {
  const selectedNotes = useSelector((state: RootState) => state.noteStateReducer.selectedNotes);
  // move to reducer? 
  const sortedSelection = [...selectedNotes].sort((a, b) => noteCmp(a,b));

  return (
    <div style={{ fontSize: '3rem', textAlign: 'center' }}>
      {sortedSelection.map(n => 
        `${NoteNameToStringMapping[n.name]}${n.octave}`).join(', ')
      }
    </div>
  )
}

export default SelectedNotes;