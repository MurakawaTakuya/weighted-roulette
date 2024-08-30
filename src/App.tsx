import React, { FC, useState, useRef } from 'react';
import './style.scss';
import { Roulette, useRoulette } from 'react-hook-roulette';

const templateItems = [
  {name: 'キノコ', weight: 10},
  {name: '金キノコ', weight: 20},
  {name: 'スター', weight: 30},
  {name: 'テレサ', weight: 40},
];

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
  const [selectedItems, setSelectedItems] = useState<any[]>(templateItems);
  const [autoStop, setAutoStop] = useState(true);
  const stopButtonRef = useRef<HTMLButtonElement>(null);

  const { roulette, onStart, onStop, result } = useRoulette({
    items: selectedItems,
    options: {
      deceleration: 0.2,
      maxSpeed: 20,
      determineAngle: 90,
    },
  });

  const totalWeight = selectedItems.reduce((total, item) => total + item.weight, 0);

  const handleStart = () => {
    onStart();
    if (autoStop && stopButtonRef.current) {
      setTimeout(() => {
        stopButtonRef.current?.click();
      }, 2000);
    }
  };

  return (
    <div className="mt-2 vstack items-center">
      <Roulette roulette={roulette} />
      <div className="hstack">
        <button type="button" onClick={handleStart} disabled={selectedItems.length === 0}>
          Start
        </button>
        <button ref={stopButtonRef} type="button" onClick={onStop}>
          Stop
        </button>
      </div>

      <div className="auto-stop-toggle">
        <label>
          <input
            type="checkbox"
            checked={autoStop}
            onChange={() => setAutoStop(!autoStop)}
          />
          自動でストップする
        </label>
      </div>

      <h1>Result: {result || 'ルーレットを回してください'}</h1>
      
      <div className="template-buttons">
        <h2>テンプレート</h2>
        <button onClick={() => setSelectedItems(itemsRank1)}>1位</button>
        <button onClick={() => setSelectedItems(itemsRank2)}>2位</button>
        <button onClick={() => setSelectedItems(itemsRank3)}>3位</button>
        <button onClick={() => setSelectedItems(itemsRank4To5)}>4-5位</button>
        <button onClick={() => setSelectedItems(itemsRank6)}>6位</button>
      </div>

      <div className="selected-items">
        <h2>アイテムと確率</h2>
        {selectedItems.length > 0 ? (
          <>
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  {item.name}: {item.weight}%
                </li>
              ))}
            </ul>
            <p>合計: {totalWeight}%</p>
          </>
        ) : (
          <p>アイテムが選択されていません。</p>
        )}
      </div>
    </div>
  );
};
