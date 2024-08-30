import React, { FC, useState } from 'react';
import './style.scss';
import { Roulette, useRoulette } from 'react-hook-roulette';

const itemsRank1 = [
  { name: 'キノコ', weight: 20 },
  { name: '緑コウラ', weight: 25 },
  { name: 'バナナ', weight: 20 },
  { name: 'テレサ', weight: 5 },
  { name: 'クラクション', weight: 20 },
  { name: 'ミラクル8', weight: 5 },
  { name: 'ジュゲム', weight: 5 },
];

const itemsRank2 = [
  { name: 'キノコ', weight: 20 },
  { name: '緑コウラ', weight: 25 },
  { name: 'バナナ', weight: 15 },
  { name: 'テレサ', weight: 5 },
  { name: 'クラクション', weight: 25 },
  { name: 'ミラクル8', weight: 5 },
  { name: 'ジュゲム', weight: 5 },
];

const itemsRank3 = [
  { name: 'キノコ', weight: 15 },
  { name: '金キノコ', weight: 5 },
  { name: '緑コウラ', weight: 15 },
  { name: '赤コウラ', weight: 5 },
  { name: 'バナナ', weight: 10 },
  { name: 'ボム兵', weight: 10 },
  { name: 'ゲッソー', weight: 5 },
  { name: 'テレサ', weight: 10 },
  { name: 'パックンフラワー', weight: 5 },
  { name: 'クラクション', weight: 10 },
  { name: 'ミラクル8', weight: 5 },
  { name: 'ジュゲム', weight: 5 },
];

const itemsRank4To5 = [
  { name: 'キノコ', weight: 10 },
  { name: '金キノコ', weight: 10 },
  { name: '緑コウラ', weight: 10 },
  { name: '赤コウラ', weight: 10 },
  { name: '青コウラ', weight: 5 },
  { name: 'ボム兵', weight: 10 },
  { name: 'キラー', weight: 5 },
  { name: 'スター', weight: 5 },
  { name: 'ゲッソー', weight: 10 },
  { name: 'テレサ', weight: 10 },
  { name: 'パックンフラワー', weight: 5 },
  { name: 'ミラクル8', weight: 5 },
  { name: 'ジュゲム', weight: 5 },
];

const itemsRank6 = [
  { name: 'キノコ', weight: 10 },
  { name: '金キノコ', weight: 15 },
  { name: '赤コウラ', weight: 15 },
  { name: 'キラー', weight: 10 },
  { name: 'サンダー', weight: 10 },
  { name: 'スター', weight: 10 },
  { name: 'テレサ', weight: 10 },
  { name: 'パックンフラワー', weight: 10 },
  { name: 'ミラクル8', weight: 5 },
  { name: 'ジュゲム', weight: 5 },
];

export const App: FC<{ name: string }> = ({ name }) => {
  const [selectedItems, setSelectedItems] = useState(itemsRank1);

  const { roulette, onStart, onStop, result } = useRoulette({
    items: selectedItems,
    options: {
      deceleration: 0.2,
      maxSpeed: 20,
      determineAngle: 90,
    },
  });

  const totalWeight = selectedItems.reduce((total, item) => total + item.weight, 0);

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

      <h1>Result: {result || 'No result yet'}</h1>
      
      <div className="template-buttons">
        <button onClick={() => setSelectedItems(itemsRank1)}>1位</button>
        <button onClick={() => setSelectedItems(itemsRank2)}>2位</button>
        <button onClick={() => setSelectedItems(itemsRank3)}>3位</button>
        <button onClick={() => setSelectedItems(itemsRank4To5)}>4-5位</button>
        <button onClick={() => setSelectedItems(itemsRank6)}>6位</button>
      </div>

      <div className="selected-items">
        <h2>アイテムと確率</h2>
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>
              {item.name}: {item.weight}%
            </li>
          ))}
        </ul>
        <p>合計: {totalWeight}%</p>
      </div>
    </div>
  );
};
