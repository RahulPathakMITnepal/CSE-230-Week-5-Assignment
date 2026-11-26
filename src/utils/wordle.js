export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;
export const FIXED_WORD = 'REACT';

export function evaluateGuess(guess, solution) {
  const statuses = Array(WORD_LENGTH).fill('absent');
  const remainingCounts = {};

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === solution[i]) {
      statuses[i] = 'correct';
    } else {
      const char = solution[i];
      remainingCounts[char] = (remainingCounts[char] || 0) + 1;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (statuses[i] === 'correct') continue;
    const char = guess[i];
    if (remainingCounts[char] > 0) {
      statuses[i] = 'present';
      remainingCounts[char] -= 1;
    }
  }

  return statuses;
}

const STATUS_PRIORITY = {
  absent: 1,
  present: 2,
  correct: 3,
};

export function getKeyboardStatuses(pastGuesses, solution) {
  const keyStatuses = {};

  for (const guess of pastGuesses) {
    const rowStatuses = evaluateGuess(guess, solution);
    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guess[i];
      const nextStatus = rowStatuses[i];
      const currentStatus = keyStatuses[letter];

      if (
        !currentStatus ||
        STATUS_PRIORITY[nextStatus] > STATUS_PRIORITY[currentStatus]
      ) {
        keyStatuses[letter] = nextStatus;
      }
    }
  }

  return keyStatuses;
}
