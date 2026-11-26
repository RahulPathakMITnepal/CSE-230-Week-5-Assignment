import Tile from './Tile';
import { WORD_LENGTH } from '../utils/wordle';

export default function Row({ guess = '', statuses = [], isShaking = false }) {
  const tiles = Array.from({ length: WORD_LENGTH }, (_, index) => {
    const letter = guess[index] || '';
    const status = statuses[index] || '';
    return <Tile key={index} letter={letter} status={status} />;
  });

  return (
    <div className={`row ${isShaking ? 'row--shake' : ''}`} role="row">
      {tiles}
    </div>
  );
}
