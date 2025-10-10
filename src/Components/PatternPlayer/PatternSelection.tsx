import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { modeNamesByScale, ScaleType, scaleTypeToName } from "../../MusicModel/scales";
import { setPlayerPattern } from "../Slices/playerSlice";
import { ButtonGroup } from "./ButtonGroup";
import { useState } from "react";

export const PatternSelection = () => {
  const [patternType, setPatternType] = useState("scales")

  return ( 
    <div style={{display: 'flex', flexDirection: 'column', height: '300px', gap: '5px'}}>
      <ButtonGroup selected={patternType} setSelected={(s) => setPatternType(s)} values={['scales', 'chords', 'patterns']}/>
      {
        patternType === 'scales'
          ? 
            (
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll', height: '100%', flex: '1 1 auto', overflowY: 'auto'  }}>
                {
                  Object.keys(scaleTypeToName).map(k => 
                    <Pattern scaleType={k}/>
                  )  
                }
              </div>
            )
          :
            (
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll', alignItems: 'center', height: '100%', flex: '1 1 auto', overflowY: 'auto'  }}>
                <button>maj</button>
                <button>7</button>
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
            textAlign: 'left',
            backgroundColor: scaleType == pattern && mode ==0
              ? 'orangeRed'
              : scaleType == pattern
                ? 'dodgerblue'
                : '', 
            width: '100%'
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
                  backgroundColor: showModes
                    ? 'orangeRed'
                    : scaleType == pattern && mode != 0
                      ? 'dodgerblue'
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
                textAlign: 'left',
                backgroundColor:  scaleType == pattern && i == mode ? 'orangeRed': '', 
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