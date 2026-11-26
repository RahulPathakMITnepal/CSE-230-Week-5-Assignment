import Row from './Row';
import { MAX_GUESSES, evaluateGuess } from '../utils/wordle';

export default function GameBoard({
  pastGuesses,
  currentGuess,
  solutionWord,
  shakeActiveRow,
}) {
  const rows = Array.from({ length: MAX_GUESSES }, (_, rowIndex) => {
    if (rowIndex < pastGuesses.length) {
      const guess = pastGuesses[rowIndex];
      const statuses = evaluateGuess(guess, solutionWord);
      return <Row key={rowIndex} guess={guess} statuses={statuses} />;
    }

    if (rowIndex === pastGuesses.length) {
      return (
        <Row
          key={rowIndex}
          guess={currentGuess}
          isShaking={shakeActiveRow}
        />
      );
    }

    return <Row key={rowIndex} />;
  });

  return (
    <div className="game-board" role="grid" aria-label="Wordle Game Board">
      {rows}
    </div>
  );
}
