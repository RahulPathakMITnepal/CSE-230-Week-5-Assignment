const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export default function Keyboard({ keyStatuses, onKeyPress, disabled }) {
  return (
    <div className="keyboard" role="group" aria-label="On-screen Keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard__row">
          {row.map((key) => {
            const isAction = key === 'ENTER' || key === 'BACKSPACE';
            const status = keyStatuses[key];
            const statusClass = status ? `key--${status}` : '';
            const actionClass = isAction ? 'key--wide' : '';

            return (
              <button
                key={key}
                type="button"
                className={`key ${actionClass} ${statusClass}`.trim()}
                onClick={() => onKeyPress(key)}
                disabled={disabled}
                aria-label={key === 'BACKSPACE' ? 'Backspace' : key}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
