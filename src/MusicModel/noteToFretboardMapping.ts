import { Note, noteHash } from "./note";
import { FretboardMapping, FretboardNote, StringPosition } from "./instrument";
import { NotePattern, PatternMapping, PatternMappingContext, UserPatternPreferences } from "./pattern";


export const getPatternMapping = (pattern: NotePattern, ctx: PatternMappingContext): PatternMapping => {
  const result: FretboardNote[][] = [];
  // TODO - consider should this be list of positions when we're doing chords?
  // - then can calculate difference for moving each voice? 
  // - or if moving from chord to single note can go from closest position or other
  var handStartPos: StringPosition | null = null;

  // TODO - this is greedy
  // - proposal - run with A* with highest cumulative score as the distance
  //  - could try making new nodes on both string position and hand start
  //  - initial fringe nodes could be all hand starts avaiable from the stretch setting 
  for (const noteList of pattern) {
    const bestListMapping = noteList.length === 1
      ? mapSingleNote(noteList[0], handStartPos, ctx)
      : mapPoly(noteList, handStartPos, ctx)
      
    result.push(bestListMapping);
    handStartPos = updateHandStart(handStartPos, bestListMapping.map(m => m.stringPos), ctx.settings);
  }

  return result;
}

const mapSingleNote = (
  note: Note, 
  prevHandStart: StringPosition | null, 
  ctx: PatternMappingContext
): FretboardNote[] => {
  const candidatePositions = stringPositionsForNote(note, ctx.fretboardMapping);
  if (!candidatePositions) {
    return [{ note: note, stringPos: null }] // empty mapping if no candidates
  }
  const bestPosition = getBestPostion(note, candidatePositions!, prevHandStart, ctx.settings)
  const fretboardNote = { note: note, stringPos: bestPosition };

  return [fretboardNote]
}

const mapPoly = (
  notes: Note[], 
  prevHandStart: StringPosition | null, 
  ctx: PatternMappingContext
): FretboardNote[] => {
  // TODO implement
  // - find out if voicing can be played
  // - get candidate positions for each voice 
  // - figure out how to rank voicings compared to each other
  return []
}

const updateHandStart = (
  previousHandStart: StringPosition | null, 
  nextPositions: (StringPosition | null)[],
  settings: UserPatternPreferences
): StringPosition | null => {

  const mappedPositions = nextPositions
    .filter(p => p !== null)
    .sort((p1, p2) => p1.index < p2.index ? -1 : 1);

  if (mappedPositions.length === 0) {
    return null;
  }

  const nextPosition = mappedPositions[0]

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