import { Note, noteHash } from "./note";
import { FretboardMapping, FretboardNote, StringPosition } from "./instrument";
import { NotePattern, PatternMapping, PatternMappingContext, UserPatternPreferences } from "./pattern";


export const getPatternMapping = (pattern: NotePattern, ctx: PatternMappingContext): PatternMapping => {
  const result: FretboardNote[] = [];
  var handStartPos: StringPosition | null = null;

  // TODO - this is greedy
  // - proposal - run with A* with highest cumulative score as the distance
  //  - could try making new nodes on both string position and hand start
  for (const note of pattern) {
    const candidatePositions = stringPositionsForNote(note, ctx.fretboardMapping);
    if (!candidatePositions) {
      result.push({ note: note, stringPos: null }) // empty mapping if no candidates
      continue;
    }
    const bestPosition = getBestPostion(note, candidatePositions!, handStartPos, ctx.settings)
    const fretboardNote = { note: note, stringPos: bestPosition };
    result.push(fretboardNote);

    // console.log(handStartPos);
    // console.log(fretboardNote)
    // console.log()

    handStartPos = updateHandStart(handStartPos, bestPosition, ctx.settings);
  }

  return result;
}

const updateHandStart = (
  previousHandStart: StringPosition | null, 
  nextPosition: StringPosition,
  settings: UserPatternPreferences
): StringPosition => {
  if (previousHandStart == null) {
    return nextPosition;
  }

  var nextIndex = previousHandStart.index + calculateShift(previousHandStart.index, nextPosition.index, settings.stretch);

  return { ...nextPosition, index: nextIndex } 
}

const stringPositionsForNote = (
  note: Note, 
  fretboardMapping: FretboardMapping
): StringPosition[] | undefined => {
    const key = noteHash(note);
    return fretboardMapping.stringPosByNote.get(key);
}


const getBestPostion = (
  note: Note, 
  candidatePositions: StringPosition[], 
  handStart: StringPosition | null, 
  prefs: UserPatternPreferences
): StringPosition => {
  var bestScore = 0;
  var bestPos = candidatePositions[0];

  for (const position of candidatePositions) {
    const score = scorePosition(note, position, handStart, prefs);
    if (score > bestScore) {
      bestScore = score;
      bestPos = position;
    }
  }

  return bestPos;
}

const scorePosition = (
  note: Note, 
  position: StringPosition, 
  handStart: StringPosition | null, 
  prefs: UserPatternPreferences
): number => {
  var score = 10;
  // main concept:
  // - anything that can be played from the current handStart 
  score *= getVerticalWeight(position, handStart, prefs);
  score *= getHorizontalWeight(position, handStart, prefs);
  // console.log(score);
  return score;
}

const getVerticalWeight = (
  position: StringPosition, 
  handStart: StringPosition | null, 
  prefs: UserPatternPreferences
): number => {
  var weight = 1;
  
  // adjust for vertical skipping
  const skip = handStart == null 
    ? 0
    : Math.abs(position.openStringIndex - handStart!.openStringIndex)
  // console.log('skip', saip);
  weight = Math.pow(prefs.skipWeight, skip);

  if (position.index == 0) {
    weight *= prefs.openStringWeight;
  }

  // TODO:
  // - prefer higher strings for higher notes 

  return weight;
}

const getHorizontalWeight = (
  position: StringPosition, 
  handStart: StringPosition | null, 
  prefs: UserPatternPreferences
): number => {
  var weight = 1;

  // adjust for horizontal shifting 
  const shift = handStart == null 
    ? 0
    : Math.abs(calculateShift(handStart.index, position.index, prefs.stretch));
  // console.log('shift', shift);
  weight = Math.pow(prefs.shiftWeight, shift);
  
  return weight;
}

const calculateShift = (
  startIndex: number, 
  targetIndex: number, 
  stretch: number
): number => {
  // open string - no shift, handled in string skip instead 
  if (targetIndex == 0) {
    return 0;
  }

  // down case - always a shift
  if (targetIndex < startIndex) {
    return targetIndex - startIndex; 
  } 

  // up case
  // no shift if it's within the stretch
  if (startIndex + stretch >= targetIndex) {
    return 0;
  }

  return targetIndex - (startIndex - stretch);
}