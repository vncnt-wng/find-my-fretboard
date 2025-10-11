import KeySelection from "./KeySelection"
import Player from "./Player"
import { PatternSelection } from "./PatternSelection"
import { colours } from "../styles"

const PatternPlayer = () => {
  return (
    <div style={{
      height: '300px',
      width: '90%', 
      backgroundColor: colours.panel, 
      borderRadius: '10px',
      display: 'grid',
      gridTemplateColumns: '2fr 0fr 1fr 0fr 2fr',
      justifyContent: 'spaceBetween',
      alignItems: 'center',
      padding: '20px',
      gap: '20px',
      border: 'solid ' + colours.outline,
      borderWidth: '4px',
    }}>
      <PatternSelection />
      <Divider />
      <KeySelection />
      <Divider />
      <Player />
    </div>
  )
}

const Divider = () => {
  return (
    <div
      style={{width: '2px', height: '105%', backgroundColor: colours.outline}}
    />
  )
}

export default PatternPlayer;