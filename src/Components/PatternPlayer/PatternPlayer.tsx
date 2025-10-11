import KeySelection from "./KeySelection"
import Player from "./Player"
import { PatternSelection } from "./PatternSelection"
import { colours, raisedBorderStyle } from "../styles"

const PatternPlayer = () => {
  return (
    <div style={{
      height: '300px',
      width: '90%', 
      backgroundColor: colours.panel, 
      borderRadius: '10px',
      display: 'grid',
      gridTemplateColumns: '1fr 0fr 2fr 0fr 2fr',
      justifyContent: 'spaceBetween',
      alignItems: 'center',
      padding: '20px',
      gap: '20px',
      ...raisedBorderStyle,
      borderWidth: '4px'
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

export default PatternPlayer;