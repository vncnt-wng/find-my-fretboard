import { chordButtonStyle, colours, getButtonColour } from "../styles"
import StyledButton, { StyledButtonProps } from "./Button"

interface ChordButtonProps extends StyledButtonProps {
  chordTone?: boolean
}

const ChordButton = (props: ChordButtonProps) => {
  return (
    <StyledButton 
      {...props}
      extraStyles={{
        ...chordButtonStyle,
        backgroundColor: getButtonColour(props.selected, props.alternate, props.alternate2) 
          ?? (
            props.chordTone 
            ? colours.chordTone 
            : ''),
        ...props.extraStyles
      }}
    />
  )
}

export default ChordButton;