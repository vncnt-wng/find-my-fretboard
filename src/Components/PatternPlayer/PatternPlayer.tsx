import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { NoteName, NoteNameToStringMapping, noteTranspose } from "../../MusicModel/note"
import { makeScale, modeNamesByScale, ScaleType, scaleTypeToName } from "../../MusicModel/scales"
import { setChordTone, setPlayerKey, setPlayerPattern, setShowChordTones, setShowScaleName } from "../Slices/playerSlice"
import { useEffect, useRef } from "react"
import { getPatternMapping } from "../../MusicModel/noteToFretboardMapping"
import { UserPatternPreferences } from "../../MusicModel/pattern"
import { makeFretboardPlayoutPattern, makeKeysPlayoutPattern } from "../../MusicModel/makePlayoutPattern"
import { playFretboardPlayoutPattern, playKeysPlayoutPattern } from "../../Audio/play"
import { InstrumentType } from "../../MusicModel/instrument"
import { keyNum, startingKeyNote } from "../Keys/Keys"
import { clearKeySelectedNotes, clearSelectedNotes } from "../Slices/notesSlice"

const PatternPlayer = () => {
  return (
    <div style={{
      height: '300px',
      width: '90%', 
      backgroundColor: 'mediumSlateBlue', 
      borderRadius: '10px',
      display: 'grid',
      gridTemplateColumns: '1fr 0fr 2fr 0fr 2fr',
      justifyContent: 'spaceBetween',
      alignItems: 'center',
      padding: '20px',
      gap: '20px',
      borderTop: 'solid 3px grey',
      borderLeft: 'solid 3px grey',
      borderRight: 'solid 3px black',
      borderBottom: 'solid 3px black',
    }}>
      <KeySelection />
      <Divider />
      <PatternSelection />
      <Divider />
      <Player />
    </div>
  )
}

const Divider = () => {
  return (
    <div
      style={{width: '2px', height: '105%', backgroundColor: 'white'}}
    />
  )
}

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'mediumSlateBlue',
  gap: '5px',
  width: '100%',
  height: '100%',
  border: '20px 20px 20px 20px',
  justifyContent: 'center',
}

const chordButtonStyle: React.CSSProperties = {
  width: '35px',
  height: '35px',
  borderRadius: '100%'
}



const KeySelection = () => {
  const { key, symmetryKeys } = useSelector((state: RootState) => state.playerState)
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    const drawCircleFifths = new ResizeObserver(() => {
      const { width, height } = divRef.current!.getBoundingClientRect();
      const radius = Math.min(width, height) / 2 - 20;
      const keyDivs = Array.from(divRef.current!.children) as HTMLElement[];
      for (var i = 0; i < keyDivs.length; i++)
      {
        const current = keyDivs[i];
        const offset = current.getBoundingClientRect().height / 2;
        const angle = (- Math.PI / 2) + (2 * Math.PI / keyDivs.length * i);
        const x = (width / 2) - offset + radius * Math.cos(angle);
        const y = (height / 2) - offset + radius * Math.sin(angle);
        current.style.left = `${x.toString()}px`;
        current.style.top = `${y.toString()}px`;
        current.style.position = 'absolute'
      }
    })

    drawCircleFifths.observe(divRef.current);
    
    return () => drawCircleFifths.disconnect();
  }, [])

  const setKey = (name: NoteName) => {
    dispatch(setPlayerKey(name))
  }

  // change this lol 
  const keyStyle = (name: NoteName) => ({
    ...chordButtonStyle,
    backgroundColor: key == name
      ? 'orangeRed' 
      : symmetryKeys?.includes(name)
        ? 'skyBlue'
        : ''
  })

  return ( 
    <div 
      ref={divRef}
      style={{
        ...sectionStyle,
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <button style={keyStyle(NoteName.C)} onClick={() => setKey(NoteName.C)}>
        C
      </button>
      <button style={keyStyle(NoteName.G)}onClick={() => setKey(NoteName.G)}>
        G
      </button>
      <button style={keyStyle(NoteName.D)} onClick={() => setKey(NoteName.D)}>
        D
      </button>
      <button style={keyStyle(NoteName.A)} onClick={() => setKey(NoteName.A)}>
        A
      </button>
      <button style={keyStyle(NoteName.E)} onClick={() => setKey(NoteName.E)}>
        E
      </button>
      <button style={keyStyle(NoteName.B)} onClick={() => setKey(NoteName.B)}>
        B
      </button>
      <button style={keyStyle(NoteName.F_SHARP)} onClick={() => setKey(NoteName.F_SHARP)}>
        F#
      </button>
      <button style={keyStyle(NoteName.C_SHARP)}onClick={() => setKey(NoteName.C_SHARP)}>
        Db
      </button>
      <button style={keyStyle(NoteName.G_SHARP)} onClick={() => setKey(NoteName.G_SHARP)}>
        Ab
      </button>
      <button style={keyStyle(NoteName.D_SHARP)} onClick={() => setKey(NoteName.D_SHARP)}>
        Eb
      </button>
      <button style={keyStyle(NoteName.A_SHARP)} onClick={() => setKey(NoteName.A_SHARP)}>
        Bb
      </button>
      <button style={keyStyle(NoteName.F)} onClick={() => setKey(NoteName.F)}>
        F
      </button>
    </div>
  )
}



const PatternSelection = () => {
  const {pattern, mode} = useSelector((state: RootState) => state.playerState)
  const dispatch = useDispatch();

  const setPattern = (scaleType: ScaleType, mode: number = 0) => {
    dispatch(setPlayerPattern({ pattern: scaleType, mode: mode }))
  }

  return ( 
    <div style={{...sectionStyle, justifyContent: 'start', overflow: 'scroll', alignItems: 'center', 'height': '100%'}}>
      {
        Object.keys(scaleTypeToName).map(k => 
          <>
            <button style={{backgroundColor: k == pattern ? 'orangeRed': '', width: '100%'}} onClick={() => setPattern(k)}>
              {scaleTypeToName[k]}
            </button>
            {
              k in modeNamesByScale 
                ? modeNamesByScale[k].map((name, i) => 
                  <button style={{backgroundColor:  k == pattern && i == mode ? 'orangeRed': '', width: '90%'}} onClick={() => setPattern(k, i)}>
                    {name}
                  </button>
                )
                : <></>
            }
          </>
        )  
      }
    </div>
  )
}

const Player = () => {
  const { fretboardMapping, instrumentType } = useSelector((state: RootState) => state.fretboardSettings);
  const { noteRange } = fretboardMapping; 
  const { key, pattern, mode, modeRoot, scaleNames, chordTones, showScaleNames, showChordTones} = useSelector((state: RootState) => state.playerState);
  
  const dispatch = useDispatch();

  const defaultPrefs: UserPatternPreferences = {
    stretch: 3,
    skipWeight: 0.9,
    shiftWeight: 0.7,
    openStringWeight: 1.0,
  }

  const playPattern = () => {
    dispatch(clearKeySelectedNotes());
    dispatch(clearSelectedNotes());

    if (instrumentType === InstrumentType.FRETBOARD) {
      const lowOctave = modeRoot >= noteRange[0].name
        ? noteRange[0].octave
        : noteRange[0].octave + 1
    
      const highOctave = modeRoot <= noteRange[1].name
          ? noteRange[1].octave
          : noteRange[1].octave - 1
      
      // generate longest possible for now
      const scale = makeScale(modeRoot, pattern as ScaleType, mode, lowOctave, highOctave - lowOctave)
      const ctx = { fretboardMapping: fretboardMapping, settings: defaultPrefs }
      const playoutPattern = makeFretboardPlayoutPattern(scale, ctx);
      playFretboardPlayoutPattern(playoutPattern);
    }
    else {      
      const lowOctave = modeRoot >= startingKeyNote.name
        ? startingKeyNote.octave
        : startingKeyNote.octave + 1
      const highestNote = noteTranspose(startingKeyNote, keyNum - 1);
      const highOctave = modeRoot <= highestNote.name
          ? highestNote.octave
          : highestNote.octave - 1

      const scale = makeScale(modeRoot, pattern as ScaleType, mode, lowOctave, highOctave - lowOctave)
      const playoutPattern = makeKeysPlayoutPattern(scale);
      playKeysPlayoutPattern(playoutPattern);
    }
    
  }

  const toggleShowScaleNotes = () => {
    dispatch(setShowScaleName(!showScaleNames))
  }

  const toggleShowChordTones = () => {
    dispatch(setShowChordTones(!showChordTones))
  }

  const setPlayerChordTone = (noteName: NoteName) => {
    dispatch(setChordTone(noteName))
  }

  return ( 
    <div style={{...sectionStyle, justifyContent: 'start'}}>
      <button onClick={playPattern}>
        Play
      </button>
      <button style={{backgroundColor: showScaleNames ? 'orangeRed': ''}} onClick={toggleShowScaleNotes}>
        Show scale notes
      </button>
      <button style={{backgroundColor: showChordTones ? 'orangeRed': ''}} onClick={toggleShowChordTones}>
        Show chord tones
      </button>
      {
        showChordTones 
          ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px'}}>
              {
                scaleNames.map(n => (
                  <button 
                    onClick={() => setPlayerChordTone(n)}
                    style={{
                      ...chordButtonStyle,
                      backgroundColor: modeRoot == n
                        ? 'orangeRed'
                        : chordTones.includes(n) 
                          ? 'orchid'
                          : ''
                    }}
                  >
                    {NoteNameToStringMapping[n]}
                  </button>
                ))
              }
            </div>
          : <></> 
      }
    </div>
  )
}

export default PatternPlayer;