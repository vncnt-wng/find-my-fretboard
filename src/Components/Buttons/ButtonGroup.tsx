import StyledButton from "./Button"

export const ButtonGroup = ({selected, setSelected, values}: {selected: string, setSelected: (s: string) => void, values: string[]}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%', gap: '3px'}}>
    {
      values.map(v => 
        <StyledButton 
          text={v}
          onClick={() => setSelected(v)}
          selected={v === selected}
        />
      )
    }
    </div>
  )
}
