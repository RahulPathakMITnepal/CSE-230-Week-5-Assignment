/**
 * Renders a single letter tile on the Wordle board.
 * Supports dynamic status classes: 'correct' (green), 'present' (yellow),
 * 'absent' (gray), or 'filled' when typed in the active row.
 */
export default function Tile({ letter = '', status = '', index = 0 }) {
  const stateClass = status
    ? `tile--${status}`
    : letter
      ? 'tile--filled'
      : 'tile--empty';

  const style = status ? { animationDelay: `${index * 90}ms` } : undefined;

  return (
    <div
      className={`tile ${stateClass}`}
      style={style}
      aria-label={letter ? `${letter}${status ? `, ${status}` : ''}` : 'empty'}
    >
      {letter}
    </div>
  );
}
