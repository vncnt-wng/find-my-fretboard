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
  panel: 'slateBlue'
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


export const raisedBorderStyle: React.CSSProperties = {
  borderTop: 'solid lightslategrey',
  borderLeft: 'solid lightslategray',
  borderRight: 'solid darkslategrey',
  borderBottom: 'solid darkslategray'
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
  borderWidth: '2px',
  ...raisedBorderStyle
}

export const buttonStyle: React.CSSProperties = {
  borderRadius: '3px',
  borderWidth: '1px',
  ...raisedBorderStyle
}
