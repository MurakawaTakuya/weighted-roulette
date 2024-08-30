import React, { FC } from 'react';
import './style.css';
import { Roulette, useRoulette } from 'react-hook-roulette';

const items = [
  { name: 'label1', weight: 1 },
  { name: 'label2', weight: 2 },
  { name: 'label3', weight: 3 },
  { name: 'label4', weight: 4 },
  { name: 'label5', weight: 5 },
  { name: 'label6', weight: 10 },
];

export const App: FC<{ name: string }> = ({ name }) => {
  const { roulette, onStart, onStop, result } = useRoulette({
    items,
    options: {
      deceleration: 0.05,
      maxSpeed: 20,
      determineAngle: 90,
    },
  });

  return (
    <div className="mt-2 vstack items-center">
      <Roulette roulette={roulette} />
      <div className="hstack">
        <button type="button" onClick={onStart}>
          Start
        </button>
        <button type="button" onClick={onStop}>
          Stop
        </button>
      </div>
      <p>Result: {result || 'No result yet'}</p>
    </div>
  );
};
