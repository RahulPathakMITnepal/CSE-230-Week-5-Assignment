/**
 * Modal displayed when the game reaches 'WON' or 'LOST' state.
 */
export default function GameOverModal({
  gameStatus,
  solutionWord,
  guessCount,
  onReset,
}) {
  if (gameStatus === 'IN_PROGRESS') return null;

  const isWin = gameStatus === 'WON';

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h2 className={`modal__title ${isWin ? 'modal__title--win' : 'modal__title--loss'}`}>
          {isWin ? 'Splendid!' : 'Game Over'}
        </h2>

        {isWin ? (
          <p className="modal__message">
            You guessed the word in <strong>{guessCount}</strong>{' '}
            {guessCount === 1 ? 'try' : 'tries'}.
          </p>
        ) : (
          <p className="modal__message">
            You ran out of guesses. Better luck next time!
          </p>
        )}

        <div className="modal__solution">
          <span className="modal__solution-label">Solution</span>
          <span className="modal__solution-word">{solutionWord}</span>
        </div>

        <button type="button" className="modal__button" onClick={onReset}>
          Play Again
        </button>
      </div>
    </div>
  );
}
