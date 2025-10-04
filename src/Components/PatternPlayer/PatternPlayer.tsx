import { useDispatch, useSelector } from "react-redux"
import { RootState, store } from "../../app/store"
import { playPlayoutPattern } from "../../Audio/play"
import { makePlayoutPattern } from "../../MusicModel/makePlayoutPattern"
import { NoteName } from "../../MusicModel/note"
import { NotePattern, UserPatternPreferences } from "../../MusicModel/pattern"
import { getScaleNames, ScaleType, scaleTypeToName } from "../../MusicModel/scales"
import { setPlayerKey, setPlayerPattern } from "../Slices/playerSlice"
import { clearHighlightedNames, clearScaleNames, setHighlightedNames, setScaleNames } from "../Slices/notesSlice"

const PatternPlayer = () => {
  // TODO challenge - render circle of 5th as circle, with arrows in between 
  // - idea - fixed position 
  const GMajor: NotePattern = [
    [{ name: NoteName.G, octave: 1 }],
    [{ name: NoteName.A, octave: 1 }],
    [{ name: NoteName.B, octave: 1 }],
    [{ name: NoteName.C, octave: 2 }],
    [{ name: NoteName.D, octave: 2 }],
    [{ name: NoteName.E, octave: 2 }],
    [{ name: NoteName.F_SHARP, octave: 2 }],
    [{ name: NoteName.G, octave: 2 }],
    [{ name: NoteName.A, octave: 2 }],
    [{ name: NoteName.B, octave: 2 }],
    [{ name: NoteName.C, octave: 3 }],
    [{ name: NoteName.D, octave: 3 }],
    [{ name: NoteName.E, octave: 3 }],
    [{ name: NoteName.F_SHARP, octave: 3 }],
    [{ name: NoteName.G, octave: 3 }]
  ] 
  
  const defaultPrefs: UserPatternPreferences = {
    stretch: 3,
    skipWeight: 0.9,
    shiftWeight: 0.7,
    openStringWeight: 1.3,
  }
  
  const playPattern = () => {
    var pattern = makePlayoutPattern(
      GMajor, 
      {
        fretboardMapping: store.getState().fretboardSettings.fretboardMapping, 
        settings: defaultPrefs 
      }
    )

    playPlayoutPattern(pattern);
  }

  return (
    // <button onClick={playPattern}>play G major</button>
    <div style={{
      width: '90%', 
      height: '200px', 
      backgroundColor: 'lightslategrey', 
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'spaceBetween',
      alignItems: 'center',
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
  gap: '5px',
  width: '100%',
  height: '100%',
  backgroundColor: 'mediumSlateBlue',
  // margin: '20px 20px 20px 20p',
}

const KeySelection = () => {
  const dispatch = useDispatch();

  const setKey = (name: NoteName) => {
    dispatch(setPlayerKey(name))
    dispatch(clearScaleNames())
    dispatch(clearHighlightedNames())
  }

  return ( 
    <div style={sectionStyle}>
      <div>
      <button onClick={() => setKey(NoteName.C)}>
        C
      </button>
      <button onClick={() => setKey(NoteName.G)}>
        G
      </button>
      </div>
      <div>
      <button onClick={() => setKey(NoteName.D)}>
        D
      </button>
      <button onClick={() => setKey(NoteName.A)}>
        A
      </button>
      </div>
      <div>
      <button onClick={() => setKey(NoteName.E)}>
        E
      </button>
      <button onClick={() => setKey(NoteName.F_SHARP)}>
        F#
      </button>
      </div>
      <div>
      <button onClick={() => setKey(NoteName.C_SHARP)}>
        Db
      </button>
      <button onClick={() => setKey(NoteName.G_SHARP)}>
        Ab
      </button>
      </div>
      <div>
      <button onClick={() => setKey(NoteName.D_SHARP)}>
        Eb
      </button>
      <button onClick={() => setKey(NoteName.A_SHARP)}>
        Bb
      </button>
      </div>
      <div>
      <button onClick={() => setKey(NoteName.F)}>
        F
      </button>
      </div>
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