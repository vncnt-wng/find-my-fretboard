import { useEffect, useRef } from "react";
import { NoteName } from "../../MusicModel/note";
import { setPlayerKey } from "../Slices/playerSlice";
import { chordButtonStyle, sectionStyle } from "./PatternPlayer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";


const KeySelection = () => {
  const { key, symmetryKeys } = useSelector((state: RootState) => state.playerState)
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

  // change this lol 
  const keyStyle = (name: NoteName) => ({
    ...chordButtonStyle,
    backgroundColor: key == name
      ? 'orangeRed' 
      : symmetryKeys?.includes(name)
        ? 'skyBlue'
        : ''
  })

  return ( 
    <div 
      ref={divRef}
      style={{
        ...sectionStyle,
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <button style={keyStyle(NoteName.C)} onClick={() => setKey(NoteName.C)}>
        C
      </button>
      <button style={keyStyle(NoteName.G)}onClick={() => setKey(NoteName.G)}>
        G
      </button>
      <button style={keyStyle(NoteName.D)} onClick={() => setKey(NoteName.D)}>
        D
      </button>
      <button style={keyStyle(NoteName.A)} onClick={() => setKey(NoteName.A)}>
        A
      </button>
      <button style={keyStyle(NoteName.E)} onClick={() => setKey(NoteName.E)}>
        E
      </button>
      <button style={keyStyle(NoteName.B)} onClick={() => setKey(NoteName.B)}>
        B
      </button>
      <button style={keyStyle(NoteName.F_SHARP)} onClick={() => setKey(NoteName.F_SHARP)}>
        F#
      </button>
      <button style={keyStyle(NoteName.C_SHARP)}onClick={() => setKey(NoteName.C_SHARP)}>
        Db
      </button>
      <button style={keyStyle(NoteName.G_SHARP)} onClick={() => setKey(NoteName.G_SHARP)}>
        Ab
      </button>
      <button style={keyStyle(NoteName.D_SHARP)} onClick={() => setKey(NoteName.D_SHARP)}>
        Eb
      </button>
      <button style={keyStyle(NoteName.A_SHARP)} onClick={() => setKey(NoteName.A_SHARP)}>
        Bb
      </button>
      <button style={keyStyle(NoteName.F)} onClick={() => setKey(NoteName.F)}>
        F
      </button>
    </div>
  )
}

export default KeySelection;