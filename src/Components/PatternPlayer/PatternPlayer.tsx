import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { modeNamesByScale, ScaleType, scaleTypeToName } from "../../MusicModel/scales"
import { setPlayerPattern } from "../Slices/playerSlice"
import KeySelection from "./KeySelection"
import Player from "./Player"

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

export default PatternPlayer;