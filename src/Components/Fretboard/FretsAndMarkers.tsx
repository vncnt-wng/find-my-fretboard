import { ReactElement, useState, useRef, useEffect, CSSProperties } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const fretboardOverlayStyle: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const FretsAndMarkers = ({ numStrings }: { numStrings: number }): ReactElement => {
  const widthRef = useRef<HTMLDivElement>(null);
  const [noteWidths, setNoteWidths] = useState<number[]>([]);

  const constWidthFrets = useSelector((state: RootState) => state.fretboardSettings.constFretSpacing);

  useEffect(() => {
    if (widthRef.current?.offsetWidth) {
      const divWidth = widthRef.current?.offsetWidth;
      let currentNoteStringLength = divWidth * 4 / 3;
      console.log(divWidth);
      console.log(currentNoteStringLength)
      const widths: number[] = [];
      const noteStringLengths: number[] = [currentNoteStringLength];
      for (var i = 1; i <= 24; i++) {
        if (constWidthFrets) {
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
  }, [widthRef.current?.offsetWidth, constWidthFrets]);

  const fretIndicies = [2, 4, 6, 8];

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
            <Strings numStrings={numStrings} />
            {(i + 1) % 12 === 0
              ?
              <>
                <Dot />
                <Dot />
              </>
              : fretIndicies.includes(i % 12)
                ? <Dot />
                : <></>}
          </div>
        )
      })}
    </div>
  )
}

const Dot = () => <span style={{ borderRadius: '100%', width: '0.4rem', height: '0.4rem', backgroundColor: 'black' }} />


// const fretboardOverlayStyle: CSSProperties = {
//   position: 'absolute',
//   width: '100%',
//   height: '100%'
// }

const stringSpacingStyle: CSSProperties = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0.4rem 0',
  background: 'transparent',
  boxSizing: 'border-box'
}

const Strings = ({ numStrings }: { numStrings: number, }): ReactElement => {

  return (
    <div style={fretboardOverlayStyle}>
      <div style={stringSpacingStyle}>
        {...[...Array(numStrings)].map(_ =>
          <String />
        )}
      </div>
    </div >
  )
}

const String =  () => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ height: '1px', width: '100%', backgroundColor: hover ? 'red' : 'black', backgroundClip: 'content-box', padding:'0.3rem 0' }}
    />
  )
}

export default FretsAndMarkers;