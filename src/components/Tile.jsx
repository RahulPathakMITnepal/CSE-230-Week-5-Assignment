export default function Tile({ letter = '', status = '' }) {
  const stateClass = status
    ? `tile--${status}`
    : letter
      ? 'tile--filled'
      : 'tile--empty';

  return (
    <div
      className={`tile ${stateClass}`}
      aria-label={letter ? `${letter}${status ? `, ${status}` : ''}` : 'empty'}
    >
      {letter}
    </div>
  );
}
