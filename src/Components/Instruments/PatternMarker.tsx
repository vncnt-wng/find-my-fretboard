import { useSelector } from "react-redux";
import { colours } from "../styles";
import { RootState } from "../../app/store";
import { Note } from "../../MusicModel/note";

export const PatternMarker = ({note, scaleColor, position, size}: {note: Note, scaleColor: string, position: string | undefined, size: number}) => {
  const { modeRoot, scaleNames, chordTones, showScaleNames, showChordTones } = useSelector((state: RootState) => state.playerState);
  const root = modeRoot == note.name && showChordTones;
  const chordTone = chordTones.includes(note.name) && showChordTones;
  const scaleNote = scaleNames.includes(note.name) && showScaleNames;

  if (!root && !chordTone && !scaleNote) {
    return <></>
  }

  return (
    <div style={{
      backgroundColor: root
        ? colours.selected
        : chordTone
          ? colours.chordTone
          : scaleColor,
      borderRadius: '100%',
      height: `${size}px`,
      width: `${size}px`,
      position: position as 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static',
      left: 0,
      right: 0,
      marginInline: 'auto'
    }}/>
  )
}