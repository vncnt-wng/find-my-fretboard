import { chordButtonStyle, colours, getButtonColour } from "../styles"
import StyledButton, { StyledButtonProps } from "./Button"

interface ChordButtonProps extends StyledButtonProps {
  chordTone?: boolean
}

const ChordButton = (props: ChordButtonProps) => {
  const buttonBackground = getButtonColour(props.selected, props.alternate, props.alternate2) 
  console.log((
            props.chordTone 
            ? colours.chordTone 
            : ''))
  return (
    <StyledButton 
      {...props}
      extraStyles={{
        ...chordButtonStyle,
        backgroundColor: buttonBackground !== colours.buttonBackground
          ? buttonBackground
          : props.chordTone 
            ? colours.chordTone 
            : colours.buttonBackground,
        ...props.extraStyles
      }}
    />
  )
}

export default ChordButton;