import { ReactElement, useState, useRef, useEffect, CSSProperties } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setSingleNote, setHeldNote } from '../Slices/notesSlice';
import { FretboardNote, initialiseFretboardMapping, Note, noteHash, notesContain, StringPosition, stringPositionsContain } from '../../MusicModel/model';
  
const fretboardOverlayStyle: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const FretboardOverlay = ({ numStrings }: { numStrings: number }): ReactElement => {
  const widthRef = useRef<HTMLDivElement>(null);
  const [noteWidths, setNoteWidths] = useState<number[]>([]);
  const fretboardSettings = useSelector((state: RootState) => state.fretboardSettings);
  const { fretboardMapping, constFretSpacing } = fretboardSettings;

  useEffect(() => {
    if (widthRef.current?.offsetWidth) {
      const divWidth = widthRef.current?.offsetWidth;
      let currentNoteStringLength = divWidth * 4 / 3;
      console.log(divWidth);
      console.log(currentNoteStringLength)
      const widths: number[] = [];
      const noteStringLengths: number[] = [currentNoteStringLength];
      for (var i = 1; i <= 24; i++) {
        if (constFretSpacing) {
          widths.push(divWidth / 24)
        } else {
          // f = c/(2L) -- c is some constant we don't care about 
          // up one semitone:
          // 2^(1/12) * f / f = l / l'
          // l' = l / 2^(1/12)
          // I just realised why does anyone case if the frets are spaced as they should,,, apparently I do I guess
          currentNoteStringLength = currentNoteStringLength / Math.pow(2, 1 / 12);
          widths.push(noteStringLengths[noteStringLengths.length - 1] - currentNoteStringLength);
          noteStringLengths.push(currentNoteStringLength);
        }
        setNoteWidths(widths);
      }
    }
  }, [widthRef.current?.offsetWidth, constFretSpacing]);

  const fretMarkerIndicies = [2, 4, 6, 8];

  return (
    <div ref={widthRef} style={{ ...fretboardOverlayStyle, display: 'flex', flexDirection: 'row' }}>
      {noteWidths.map((w, i) => {
        return (
          <div
            key={i}
            style={{
              border: '1px solid grey',
              width: w,
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '2rem',
              position: 'relative',
              boxSizing: 'border-box'
            }}>
            <StringSegments 
              numStrings={numStrings} 
              indexNotes={fretboardMapping.stringNotesByIndex[i+1]}
              fret={i+1}
            />
            {(i + 1) % 12 === 0
              ?
              <>
                <Dot />
                <Dot />
              </>
              : fretMarkerIndicies.includes(i % 12)
                ? <Dot />
                : <></>}
          </div>
        )
      })}
    </div>
  )
}

const Dot = () => <span style={{ borderRadius: '100%', width: '0.4rem', height: '0.4rem', backgroundColor: 'black' }} />


const stringSpacingStyle: CSSProperties = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0.4rem 0',
  background: 'transparent',
  boxSizing: 'border-box'
}

const StringSegments = ({ numStrings, indexNotes, fret }: { numStrings: number, indexNotes: Note[], fret: number }): ReactElement => {

  return (
    <div style={fretboardOverlayStyle}>
      <div style={stringSpacingStyle}>
        {...[...Array(numStrings)].map((_, i) => {
          const openIndex = indexNotes.length - 1 - i;
          return (
            <StringSegment note={indexNotes[openIndex]} stringIndex={openIndex} fret={fret}/>
          )
        })}
      </div>
    </div >
  )
}

const StringSegment =  ({ note, stringIndex, fret }: { note: Note, stringIndex: number, fret: number}) => {
  const [hover, setHover] = useState(false);

  const { fretboardMapping, hold } = useSelector((state: RootState) => state.fretboardSettings);
  const stringPos: StringPosition = { openString: fretboardMapping.openStrings[stringIndex], index: fret}
  const fretboardNote: FretboardNote = { note: note, stringPos: stringPos };
  const heldNotes = useSelector((state: RootState) => state.noteStateReducer.selectedNotes)
  const isHeld = stringPositionsContain(stringPos, heldNotes.map(fretNote => fretNote.stringPos))
  const dispatch = useDispatch();

  const setNote = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(note)
    if (hold) {
      dispatch(setHeldNote(fretboardNote));
    } else {
      dispatch(setSingleNote(fretboardNote));
    }
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={setNote}
      style={{ height: isHeld ? '2px': '1px', width: '100%', backgroundColor: hover || isHeld ? 'red' : 'black', backgroundClip: 'content-box', padding:'0.3rem 0' }}
    />
  )
}

export default FretboardOverlay;