import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOverModal from './components/GameOverModal';
import Keyboard from './components/Keyboard';
import {
  FIXED_WORD,
  MAX_GUESSES,
  WORD_LENGTH,
  getKeyboardStatuses,
} from './utils/wordle';
import './App.css';

export default function App() {
  const [solutionWord] = useState(FIXED_WORD);
  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS');
  const [toastMessage, setToastMessage] = useState('');
  const [shakeActiveRow, setShakeActiveRow] = useState(false);

  const feedbackTimerRef = useRef(null);

  const showInvalidFeedback = useCallback((message) => {
    setToastMessage(message);
    setShakeActiveRow(true);

    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }
    feedbackTimerRef.current = setTimeout(() => {
      setToastMessage('');
      setShakeActiveRow(false);
    }, 1200);
  }, []);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const handleKeyInput = useCallback(
    (rawKey) => {
      if (gameStatus !== 'IN_PROGRESS') return;

      const key = rawKey.toUpperCase();

      if (key === 'BACKSPACE') {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (key === 'ENTER') {
        if (currentGuess.length < WORD_LENGTH) {
          showInvalidFeedback('Not enough letters');
          return;
        }

        const nextPastGuesses = [...pastGuesses, currentGuess];
        setPastGuesses(nextPastGuesses);
        setCurrentGuess('');

        if (currentGuess === solutionWord) {
          setGameStatus('WON');
        } else if (nextPastGuesses.length >= MAX_GUESSES) {
          setGameStatus('LOST');
        }
        return;
      }

      if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess, gameStatus, pastGuesses, showInvalidFeedback, solutionWord],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (event.key === 'Enter') {
        event.preventDefault();
        handleKeyInput('ENTER');
        return;
      }

      if (event.key === 'Backspace') {
        handleKeyInput('BACKSPACE');
        return;
      }

      if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyInput(event.key);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyInput]);

  const handleReset = useCallback(() => {
    setCurrentGuess('');
    setPastGuesses([]);
    setGameStatus('IN_PROGRESS');
    setToastMessage('');
    setShakeActiveRow(false);
  }, []);

  const keyStatuses = useMemo(
    () => getKeyboardStatuses(pastGuesses, solutionWord),
    [pastGuesses, solutionWord],
  );

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">WORDLE</h1>
        <button
          type="button"
          className="header__reset"
          onClick={handleReset}
        >
          New Game
        </button>
      </header>

      <main className="main">
        <div className="toast-slot" aria-live="polite">
          {toastMessage && <div className="toast">{toastMessage}</div>}
        </div>

        <GameBoard
          pastGuesses={pastGuesses}
          currentGuess={currentGuess}
          solutionWord={solutionWord}
          shakeActiveRow={shakeActiveRow}
        />

        <Keyboard
          keyStatuses={keyStatuses}
          onKeyPress={handleKeyInput}
          disabled={gameStatus !== 'IN_PROGRESS'}
        />
      </main>

      <GameOverModal
        gameStatus={gameStatus}
        solutionWord={solutionWord}
        guessCount={pastGuesses.length}
        onReset={handleReset}
      />
    </div>
  );
}
