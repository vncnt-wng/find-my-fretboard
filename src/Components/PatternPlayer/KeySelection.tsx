import { useEffect, useRef } from "react";
import { NoteName } from "../../MusicModel/note";
import { setPlayerKey } from "../Slices/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { sectionStyle } from "../styles";
import ChordButton from "../Buttons/ChordButton";

const KeySelection = () => {
  const { key, modeRoot, symmetryKeys } = useSelector((state: RootState) => state.playerState)
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    const drawCircleFifths = new ResizeObserver(() => {
      const { width, height } = divRef.current!.getBoundingClientRect();
      const radius = Math.min(width, height) / 2 - 20;
      const keyDivs = Array.from(divRef.current!.children) as HTMLElement[];
      for (var i = 0; i < keyDivs.length; i++)
      {
        const current = keyDivs[i];
        const offset = current.getBoundingClientRect().height / 2;
        const angle = (- Math.PI / 2) + (2 * Math.PI / keyDivs.length * i);
        const x = (width / 2) - offset + radius * Math.cos(angle);
        const y = (height / 2) - offset + radius * Math.sin(angle);
        current.style.left = `${x.toString()}px`;
        current.style.top = `${y.toString()}px`;
        current.style.position = 'absolute'
      }
    })

    drawCircleFifths.observe(divRef.current);
    
    return () => drawCircleFifths.disconnect();
  }, [])

  const setKey = (name: NoteName) => {
    dispatch(setPlayerKey(name))
  }

  const circleOfFifths = [
    NoteName.C,
    NoteName.G,
    NoteName.D,
    NoteName.A,
    NoteName.E,
    NoteName.B,
    NoteName.F_SHARP,
    NoteName.C_SHARP,
    NoteName.G_SHARP,
    NoteName.D_SHARP,
    NoteName.A_SHARP,
    NoteName.F,
  ];

  const circleOfFifthsNames = [
    'C',
    'G',
    'D',
    'A',
    'E',
    'B',
    'F#',
    'Db',
    'Ab',
    'Eb',
    'Bb',
    'F',
  ]

  return ( 
    <div 
      ref={divRef}
      style={{
        ...sectionStyle,
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {
        circleOfFifths.map((noteName, i) => 
          <ChordButton
            text={circleOfFifthsNames[i]}
            onClick={() => setKey(noteName)}
            selected={modeRoot == noteName}
            alternate={key == noteName}
            alternate2={symmetryKeys?.includes(noteName)}
          />
        )
      }
      
    </div>
  )
}

export default KeySelection;