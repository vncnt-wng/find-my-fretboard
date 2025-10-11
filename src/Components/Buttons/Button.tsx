import { boxStyle, getButtonColour } from "../styles"

export interface StyledButtonProps {
  text: string,
  onClick: () => void,
  selected: boolean, 
  alternate?: boolean, 
  alternate2?: boolean,
  extraStyles?: React.CSSProperties
}

const StyledButton = ({text, selected, alternate, alternate2, onClick, extraStyles}: StyledButtonProps) => {
  return (
    <button 
      style={{
        ...boxStyle,
        backgroundColor: getButtonColour(selected, alternate, alternate2),
        ...(extraStyles ?? {})
      }} 
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default StyledButton;