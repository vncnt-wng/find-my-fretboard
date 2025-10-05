import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { NoteName, NoteNameToStringMapping } from "../../MusicModel/note"
import { ScaleType, scaleTypeToName } from "../../MusicModel/scales"
import { setChordTone, setPlayerKey, setPlayerPattern, setShowChordTones, setShowScaleName } from "../Slices/playerSlice"
import { useEffect, useRef } from "react"

const PatternPlayer = () => {
  return (
    <div style={{
      width: '90%', 
      backgroundColor: 'mediumSlateBlue', 
      borderRadius: '10px',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 2fr',
      justifyContent: 'spaceBetween',
      alignItems: 'center',
      padding: '20px',
      gap: '20px'
    }}>
      <KeySelection />
      <PatternSelection />
      <Player />
    </div>
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
  const key = useSelector((state: RootState) => state.playerState.key)
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      const radius = Math.min(width, height) / 2 - 20;
      const keyDivs = Array.from(divRef.current.children) as HTMLElement[];
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
    }

  }, [])

  const setKey = (name: NoteName) => {
    dispatch(setPlayerKey(name))
  }

  return ( 
    <div 
      ref={divRef}
      style={{
        ...sectionStyle,
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.C ? 'red' : ''}} onClick={() => setKey(NoteName.C)}>
        C
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.G ? 'red' : ''}} onClick={() => setKey(NoteName.G)}>
        G
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.D ? 'red' : ''}} onClick={() => setKey(NoteName.D)}>
        D
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.A ? 'red' : ''}} onClick={() => setKey(NoteName.A)}>
        A
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.E ? 'red' : ''}} onClick={() => setKey(NoteName.E)}>
        E
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.B ? 'red' : ''}} onClick={() => setKey(NoteName.B)}>
        B
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.F_SHARP ? 'red' : ''}} onClick={() => setKey(NoteName.F_SHARP)}>
        F#
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.C_SHARP ? 'red' : ''}} onClick={() => setKey(NoteName.C_SHARP)}>
        Db
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.G_SHARP ? 'red' : ''}} onClick={() => setKey(NoteName.G_SHARP)}>
        Ab
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.D_SHARP ? 'red' : ''}} onClick={() => setKey(NoteName.D_SHARP)}>
        Eb
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.A_SHARP ? 'red' : ''}} onClick={() => setKey(NoteName.A_SHARP)}>
        Bb
      </button>
      <button style={{...chordButtonStyle, backgroundColor: key == NoteName.F ? 'red' : ''}} onClick={() => setKey(NoteName.F)}>
        F
      </button>
    </div>
  )
}

const PatternSelection = () => {
  const pattern = useSelector((state: RootState) => state.playerState.pattern)
  const dispatch = useDispatch();

  const setPattern = (scaleType: ScaleType) => {
    dispatch(setPlayerPattern(scaleType))
  }

  return ( 
    <div style={sectionStyle}>
      {
        Object.keys(scaleTypeToName).map(k => 
          <button style={{backgroundColor: k == pattern ? 'red': ''}} onClick={() => setPattern(k)}>
            {scaleTypeToName[k]}
          </button>
        )  
      }
    </div>
  )
}

const Player = () => {
  const { scaleNames, chordTones, showScaleNames, showChordTones} = useSelector((state: RootState) => state.playerState);
  
  const dispatch = useDispatch();

  const playPattern = () => {

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
    <div style={sectionStyle}>
      <button onClick={playPattern}>
        Play
      </button>
      <button style={{backgroundColor: showScaleNames ? 'red': ''}} onClick={toggleShowScaleNotes}>
        Show scale notes
      </button>
      <button style={{backgroundColor: showChordTones ? 'red': ''}} onClick={toggleShowChordTones}>
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
                      backgroundColor: chordTones.includes(n) ? 'red': ''
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