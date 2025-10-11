export const colours = {
  // fretboard/player styles
  selected: 'orangeRed',
  relatedMode: 'dodgerBlue',
  relatedSymmetry: 'skyBlue',
  chordTone: 'orchid',
  scaleTone: 'black',

  // key/string
  hover: 'orange',
  hoverHeld: 'tomato',
  held: 'orangeRed',

  // page styles
  panel: 'slateBlue',
  outline: 'lightsteelblue',
  buttonBackground: 'mediumslateblue'
}

export const getKeyStyle = (hover: boolean, held: boolean, defaultColour: string = ''): string => {
  return hover && held
    ? colours.hoverHeld
    : hover 
      ? colours.hover
      : held 
        ? colours.held
        : defaultColour
}


export const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  width: '100%',
  height: '100%',
  border: '20px',
  justifyContent: 'center',
}

export const chordButtonStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '100%',
  // borderWidth: '2px',
  // ...raisedBorderStyle
}


export const boxStyle: React.CSSProperties = {
  verticalAlign: 'bottom', 
  color: 'white', 
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: colours.outline,
  borderRadius: '5px',
  backgroundColor: colours.buttonBackground
}

export const getButtonColour = (selected: boolean, alternate?: boolean, alternate2?: boolean): string => {
  return selected
    ? colours.selected
    : alternate
      ? colours.relatedMode
      : alternate2
        ? colours.relatedSymmetry
        : colours.buttonBackground
}
