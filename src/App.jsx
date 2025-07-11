import { useState } from 'react'
import './App.css'
import dice1 from './assets/images/dice1.png';
import dice2 from './assets/images/dice2.png';
import dice3 from './assets/images/dice3.png';
import dice4 from './assets/images/dice4.png';
import dice5 from './assets/images/dice5.png';
import dice6 from './assets/images/dice6.png';

const diceImages = {
  1: dice1,
  2: dice2,
  3: dice3,
  4: dice4,
  5: dice5,
  6: dice6,
};

function App() {
  const [playerName, setPlayerName] = useState('Player 1');
  const [editingName, setEditingName] = useState(false);
  const [dice1Value, setDice1Value] = useState(1);
  const [dice2Value, setDice2Value] = useState(1);
  const [resultText, setResultText] = useState('Draw 🤝');
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling) return;

    setRolling(true);
    setResultText('Rolling... 🎲');

    const interval = setInterval(() => {
      setDice1Value(Math.floor(Math.random() * 6) + 1);
      setDice2Value(Math.floor(Math.random() * 6) + 1);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      const final1 = Math.floor(Math.random() * 6) + 1;
      const final2 = Math.floor(Math.random() * 6) + 1;

      setDice1Value(final1);
      setDice2Value(final2);

      if (final1 > final2) setResultText('🎉 You Win!');
      else if (final1 < final2) setResultText('💻 PC Wins!');
      else setResultText('Draw 🤝');

      setRolling(false);
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'sans-serif' }}>
      {/* Top Result Text */}
      <h1 style={{ marginBottom: '30px' }}>{resultText}</h1>

      {/* Dice */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', marginBottom: '10px' }}>
        <div>
          <img src={diceImages[dice1Value]} alt="Player Dice" width="100" />
          {editingName ? (
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onBlur={() => setEditingName(false)}
              autoFocus
              style={{ marginTop: '10px', fontSize: '16px' }}
            />
          ) : (
            <p
              style={{ cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' }}
              onClick={() => setEditingName(true)}
            >
              {playerName}
            </p>
          )}
        </div>

        <div>
          <img src={diceImages[dice2Value]} alt="PC Dice" width="100" />
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>PC</p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={rollDice}
        disabled={rolling}
        style={{
          marginTop: '30px',
          padding: '15px 40px',
          fontSize: '18px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: '0.3s',
        }}
      >
        🔀 Roll Dice
      </button>
    </div>
  );
}

export default App
