import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { NotePattern, UserPatternPreferences } from "../../MusicModel/pattern";
import { clearKeySelectedNotes, clearSelectedNotes } from "../Slices/notesSlice";
import { InstrumentType } from "../../MusicModel/instrument";
import { getModeIntervals, intervalShorthandByNumber, makeScale, ScaleType } from "../../MusicModel/scales";
import { makeFretboardPlayoutPattern, makeKeysPlayoutPattern } from "../../MusicModel/makePlayoutPattern";
import { playFretboardPlayoutPattern, playKeysPlayoutPattern } from "../../Audio/play";
import { keyNum, startingKeyNote } from "../Keys/Keys";
import { Note, NoteName, NoteNameToStringMapping, noteTranspose } from "../../MusicModel/note";
import { setChordTone, setShowChordTones, setShowScaleName } from "../Slices/playerSlice";
import { chordButtonStyle, sectionStyle } from "./PatternPlayer";
import { useState } from "react";

const Player = () => {
  const { modeRoot, mode, pattern, scaleNames, chordTones, showScaleNames, showChordTones} = useSelector((state: RootState) => state.playerState);
  const modeIntervals = getModeIntervals(pattern as ScaleType, mode);

  const dispatch = useDispatch();

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
      <PlayPattern />
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
                scaleNames.map((n, i) => (
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
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
                    <span style={{fontSize: '0.8rem'}}>{intervalShorthandByNumber[modeIntervals[i]]}</span>
                  </div>
                ))
              }
            </div>
          : <></> 
      }
    </div>
  )
}

const PlayPattern = () => {
  const { fretboardMapping, instrumentType } = useSelector((state: RootState) => state.fretboardSettings);
  const { noteRange } = fretboardMapping; 
  const { pattern, mode, modeRoot } = useSelector((state: RootState) => state.playerState);
  const dispatch = useDispatch();

  // make actual types for these 
  const [patternMode, setPatternMode] = useState("normal");
  const [interval, setInterval] = useState<string>("thirds");
  const [numVoices, setNumVoices] = useState<string>("2");

  // let user enter somewhere
  const defaultPrefs: UserPatternPreferences = {
    stretch: 3,
    skipWeight: 0.9,
    shiftWeight: 0.7,
    openStringWeight: 1.0,
  }

  const arpegiateScale = (scale: NotePattern, intervalSkip: number, numVoices: number): NotePattern => {
    const result: NotePattern = []
    for (var i = 0; i < scale.length - (intervalSkip * (numVoices - 1)); i++) {
      for (var j = 0; j < numVoices; j++) {
        result.push(scale[i + j * intervalSkip]);
      }
    }
    return result;
  }

  const chordScale = (scale: NotePattern, intervalSkip: number, numVoices: number): NotePattern => {
    console.log(intervalSkip, numVoices)
    const result: NotePattern = []
    for (var i = 0; i < scale.length - (intervalSkip * (numVoices - 1)); i++) {
      var chord: Note[] = [];
      for (var j = 0; j < numVoices; j++) {
        chord = chord.concat(scale[i + j * intervalSkip]);
      }
      console.log(chord)
      result.push(chord);
    }
    return result;
  }

  const playPattern = () => {
    dispatch(clearKeySelectedNotes());
    dispatch(clearSelectedNotes());

    const range = instrumentType === InstrumentType.FRETBOARD
      ? noteRange
      : [startingKeyNote, noteTranspose(startingKeyNote, keyNum - 1)]

    const lowOctave = modeRoot >= range[0].name
      ? range[0].octave
      : range[0].octave + 1
  
    const highOctave = modeRoot <= range[1].name
        ? range[1].octave
        : range[1].octave - 1
      
    const intervalSkip = interval === 'thirds'
      ? 2
      : interval === 'fourths'
        ? 3
        : interval === 'fifths' 
          ? 4
          : interval === 'sixths'
            ? 5
            : 2
    const numIntervals = Number(numVoices)

    // generate longest possible for now
    const scale = makeScale(modeRoot, pattern as ScaleType, mode, lowOctave, highOctave - lowOctave)
    const notePattern = patternMode === 'arpegiated'
      ? arpegiateScale(scale, intervalSkip, numIntervals)
      : patternMode === 'chord'
        ? chordScale(scale, intervalSkip, numIntervals)
        : scale

    console.log(notePattern);

    if (instrumentType === InstrumentType.FRETBOARD) {
      const ctx = { fretboardMapping: fretboardMapping, settings: defaultPrefs }
      const playoutPattern = makeFretboardPlayoutPattern(notePattern, ctx);
      playFretboardPlayoutPattern(playoutPattern);
    }
    else {
      const playoutPattern = makeKeysPlayoutPattern(notePattern);
      playKeysPlayoutPattern(playoutPattern);
    }
  }

  return (
    <>
      <ButtonGroup selected={patternMode} setSelected={(s) => setPatternMode(s)} values={['normal','arpegiated','chord']}/>
      { patternMode != "normal"
        ? <>
            <ButtonGroup selected={interval} setSelected={(s) => setInterval(s)} values={['thirds','fourths','fifths', 'sixths']}/>
            <ButtonGroup selected={numVoices} setSelected={(s) => setNumVoices(s)} values={['2','3','4']}/>
          </>
        : <></>
      }
      
      <button onClick={playPattern}>
        Play
      </button>
    </>
  )
}

const ButtonGroup = ({selected, setSelected, values}: {selected: string, setSelected: (s: string) => void, values: string[]}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
    {values.map(v => <button style={{backgroundColor: v === selected ? 'orangeRed': ''}} onClick={_ => setSelected(v)}>{v}</button>)}
    </div>
  )
}

export default Player;