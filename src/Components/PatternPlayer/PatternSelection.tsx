import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { modeNamesByScale, ScaleType, scaleTypeToName } from "../../MusicModel/scales";
import { setPlayerPattern } from "../Slices/playerSlice";
import { ButtonGroup } from "./ButtonGroup";
import { useState } from "react";
import { buttonStyle, colours } from "../styles";
import { PlayerType, playerTypes, setPlayerType } from "../Slices/playerTypeSlice";

const scrollSelection: React.CSSProperties = { 
  display: 'flex', 
  flexDirection: 'column', 
  overflow: 'scroll', 
  height: '100%', 
  flex: '1 1 auto', 
  overflowY: 'auto'  
}

const selectButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  textAlign: 'left',
  width: '100%',
}

export const PatternSelection = () => {
  const playerType = useSelector((state: RootState) => state.playerType.playerType)
  const dispatch = useDispatch();

  return ( 
    <div style={{display: 'flex', flexDirection: 'column', height: '300px', gap: '5px'}}>
      <ButtonGroup 
        selected={playerType} 
        setSelected={(s) => dispatch(setPlayerType(s as PlayerType))} values={playerTypes}
      />
      {
        playerType === 'scales'
          ? 
            (
              <div style={scrollSelection}>
                {
                  Object.keys(scaleTypeToName).map(k => 
                    <Pattern scaleType={k}/>
                  )  
                }
              </div>
            )
          : playerType === 'training games'
            ? 
              <div style={scrollSelection}>
                <button style={selectButtonStyle}>notes</button>
                <button style={selectButtonStyle}>intervals</button>
              </div>
            :
              (
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll', height: '100%', flex: '1 1 auto', overflowY: 'auto'  }}>
                  coming soon...
                </div>
              )
      }
      
    </div>
  )
}

export const Pattern = ({scaleType}: {scaleType: ScaleType}) => {
  const {pattern, mode} = useSelector((state: RootState) => state.playerState)

  const [showModes, setShowModes] = useState(false);

  const dispatch = useDispatch();

  const setPattern = (scaleType: ScaleType, mode: number = 0) => {
    dispatch(setPlayerPattern({ pattern: scaleType, mode: mode }))
  }

  return (
    <>
      <div style={{display: "flex"}}>
        <button 
          style={{
            ...selectButtonStyle,
            backgroundColor: scaleType == pattern && mode ==0
              ? colours.selected
              : scaleType == pattern
                ? colours.relatedMode
                : '', 
          }} 
          onClick={() => setPattern(scaleType)}
        >
          {scaleTypeToName[scaleType]}
        </button>
        {
          scaleType in modeNamesByScale 
            ?
              <button 
                style={{
                  ...buttonStyle,
                  backgroundColor: showModes
                    ? colours.selected
                    : scaleType == pattern && mode != 0
                      ? colours.relatedMode
                      : ''
                }}
                onClick={() => setShowModes(b => !b)}
              >
                modes
              </button>
            : <></>
        }
        
      </div>
      {
        scaleType in modeNamesByScale && showModes
          ? modeNamesByScale[scaleType].map((name, i) => 
            <button 
              style={{
                ...buttonStyle,
                textAlign: 'left',
                backgroundColor:  scaleType == pattern && i == mode ? colours.selected : '', 
                width: '95%',
                marginLeft: 'auto'
              }} 
              onClick={() => setPattern(scaleType, i)}
            >
              {name}
            </button>
          )
          : <></>
      }
    </>
  )
}