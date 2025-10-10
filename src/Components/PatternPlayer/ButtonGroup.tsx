export const ButtonGroup = ({selected, setSelected, values}: {selected: string, setSelected: (s: string) => void, values: string[]}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
    {values.map(v => <button style={{backgroundColor: v === selected ? 'orangeRed': ''}} onClick={_ => setSelected(v)}>{v}</button>)}
    </div>
  )
}
