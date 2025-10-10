import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { modeNamesByScale, ScaleType, scaleTypeToName } from "../../MusicModel/scales"
import { setPlayerPattern } from "../Slices/playerSlice"
import KeySelection from "./KeySelection"
import Player from "./Player"
import { PatternSelection } from "./PatternSelection"

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
      style={{width: '2px', height: '105%', backgroundColor: 'pink'}}
    />
  )
}

export const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'mediumSlateBlue',
  gap: '5px',
  width: '100%',
  height: '100%',
  border: '20px 20px 20px 20px',
  justifyContent: 'center',
}

export const chordButtonStyle: React.CSSProperties = {
  width: '35px',
  height: '35px',
  borderRadius: '100%'
}


export default PatternPlayer;