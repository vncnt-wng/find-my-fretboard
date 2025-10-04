import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { NoteName } from "../../MusicModel/note"
import { getScaleNames, ScaleType, scaleTypeToName } from "../../MusicModel/scales"
import { setPlayerKey, setPlayerPattern } from "../Slices/playerSlice"
import { clearHighlightedNames, clearScaleNames, setHighlightedNames, setScaleNames } from "../Slices/notesSlice"
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
  borderRadius: '100%',
  position: 'absolute'
}



const KeySelection = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      const radius = Math.min(width, height) / 2 - 20;
      console.log(radius)
      const keyDivs = Array.from(divRef.current.children) as HTMLElement[];
      for (var i = 0; i < keyDivs.length; i++)
      {
        const current = keyDivs[i];
        const offset = current.getBoundingClientRect().height / 2;
        const angle = (- Math.PI / 2) + (2 * Math.PI / keyDivs.length * i);
        const x = - offset + (width / 2) + radius * Math.cos(angle);
        const y = - offset + (height / 2) + radius * Math.sin(angle);
        console.log(x, y)
        current.style.left = `${x.toString()}px`;
        current.style.top = `${y.toString()}px`;
        current.style.position = 'absolute'
      }
    }

  }, [])

  const setKey = (name: NoteName) => {
    dispatch(setPlayerKey(name))
    dispatch(clearScaleNames())
    dispatch(clearHighlightedNames())
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
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.C)}>
        C
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.G)}>
        G
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.D)}>
        D
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.A)}>
        A
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.E)}>
        E
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.B)}>
        B
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.F_SHARP)}>
        F#
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.C_SHARP)}>
        Db
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.G_SHARP)}>
        Ab
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.D_SHARP)}>
        Eb
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.A_SHARP)}>
        Bb
      </button>
      <button style={chordButtonStyle} onClick={() => setKey(NoteName.F)}>
        F
      </button>
    </div>
  )
}

const PatternSelection = () => {
  const dispatch = useDispatch();

  const setPattern = (scaleType: ScaleType) => {
    dispatch(setPlayerPattern(scaleType))
  }

  return ( 
    <div style={sectionStyle}>
      {
        Object.keys(scaleTypeToName).map(k => 
          <button onClick={() => setPattern(k)}>
            {scaleTypeToName[k]}
          </button>
        )  
      }
    </div>
  )
}

const Player = () => {
  const { noteState, playerState } = useSelector((state: RootState) => state);
  const { key, pattern } = playerState;
  const dispatch = useDispatch();

  const scaleNames = getScaleNames(key, pattern);

  const playPattern = () => {

  }

  const showScaleNotes = () => {
    console.log(scaleNames)
    dispatch(setScaleNames(scaleNames))
  }

  const showChordTones = () => {
    const chordTones = []
    for (var i = 0; i < scaleNames.length; i += 2) {
      chordTones.push(scaleNames[i]);
    }
    console.log(chordTones);
    dispatch(setHighlightedNames(chordTones));
  }

  return ( 
    <div style={sectionStyle}>
      <button onClick={playPattern}>
        Play
      </button>
      <button onClick={showScaleNotes}>
        Show scale notes
      </button>
      <button onClick={showChordTones}>
        Show chord tones
      </button>
    </div>
  )
}

export default PatternPlayer;