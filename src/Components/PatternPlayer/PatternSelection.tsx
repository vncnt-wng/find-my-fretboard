import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { modeNamesByScale, ScaleType, scaleTypeToName } from "../../MusicModel/scales";
import { setPlayerPattern } from "../Slices/playerSlice";
import { ButtonGroup } from "../Buttons/ButtonGroup";
import { useState } from "react";
import { PlayerType, playerTypes, setPlayerType } from "../Slices/playerTypeSlice";
import StyledButton from "../Buttons/Button";

const scrollSelection: React.CSSProperties = { 
  display: 'flex', 
  flexDirection: 'column', 
  overflow: 'scroll', 
  height: '100%', 
  flex: '1 1 auto', 
  overflowY: 'auto',
  gap: '2px',
}

const selectButtonStyle: React.CSSProperties = {
  // ...buttonStyle,
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
      <div style={{display: "flex", position: 'relative'}}>
        <StyledButton
          text={scaleTypeToName[scaleType]}
          selected={scaleType == pattern && mode ==0}
          alternate={scaleType == pattern}
          onClick={() => setPattern(scaleType)}
          extraStyles={{
            ...selectButtonStyle,
            ...(scaleType in modeNamesByScale ? { borderTopRightRadius: 0, borderBottomRightRadius: 0} : {})
          }}
        />
        {
          scaleType in modeNamesByScale 
            ?
              <StyledButton
                text={'modes'}
                selected={showModes}
                alternate={scaleType == pattern && mode != 0}
                onClick={() => setShowModes(b => !b)}
                extraStyles={{ 
                  borderTopLeftRadius: 0, 
                  borderBottomLeftRadius: 0,
                  borderLeft: 0
                }}
              />
            : <></>
        }
        
      </div>
      {
        scaleType in modeNamesByScale && showModes
          ? modeNamesByScale[scaleType].map((name, i) => 
            <StyledButton
              text={name}
              selected={scaleType == pattern && i == mode}
              onClick={() => setPattern(scaleType, i)}
              extraStyles={{ 
                width: '95%',
                marginLeft: 'auto',
                textAlign: 'left'
              }}
            />
          )
          : <></>
      }
    </>
  )
}