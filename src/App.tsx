import React, { FC, useState, useRef, useEffect } from 'react';
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
  const [selectedItems, setSelectedItems] = useState<any[]>([...itemsRank1]);
  const [autoStop, setAutoStop] = useState(true);
  const stopButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>("1位");
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [history, setHistory] = useState<{ date: string, result: string, template: string }[]>([]);

  const itemDescriptions: { [key: string]: string } = {
    "キノコ": "次の評価1を上げる",
    "金キノコ": "次の評価1を上げる ×2",
    "緑コウラ": "ランダムな班に-30pt",
    "赤コウラ": "指定班に-30pt",
    "トゲゾーこうら": "1位: -80pt, 2位: -40pt, 3位: -20pt",
    "バナナ": "行ったことのあるのチェックポイントに-30pt設置(永続、ジュゲムで行ったところもOK)",
    "ボムへい": "指定班と、その±1位の合計3班に-20pt",
    "キラー": "次回確定「秀」",
    "サンダー": "自分以外のアイテム全削除(ミラクル８, コイン, スターコイン, ジュゲムは除く)",
    "スター": "20分間どのアイテムの効果も効かない & 次の評価1を上げる",
    "ゲッソー": "自分の班以外の次の評価を1下げる",
    "テレサ": "ランダムな班のアイテムを奪う(ミラクル８, コイン, スターコイン, ジュゲムは除く)",
    "パックンフラワー": "ひとつ上の順位のコインを1枚奪う & 次の評価を1上げる",
    "クラクション": "指定した攻撃アイテムを一度だけ防御する。攻撃をくらった後「使用します」と宣言することでその攻撃を防げる。",
    "ミラクル8": "幹事に電話することができる",
    "ジュゲム": "任意の1か所のチェックポイントを行ったことにできる",
    "コイン": "コイン+1",
    "スターコイン": "コイン+10",
  };

  const { roulette, onStart, onStop, result } = useRoulette({
    items: selectedItems,
    options: {
      deceleration: 0.08,
      maxSpeed: 20,
      determineAngle: 90,
      style: {
        arrow: {
          bg: "#ff7b1d",
          size: 13,
        },
      },
    },
  });

  const totalWeight = selectedItems.reduce((total, item) => total + item.weight, 0);

  const handleStart = () => {
    onStart();
    if (autoStop && stopButtonRef.current) {
      setTimeout(() => {
        stopButtonRef.current?.click();
      }, 1000);
    }
  };

  const handleAddItem = () => {
    const newItem = { name: "新アイテム", weight: 10 };
    setSelectedItems([...selectedItems, newItem]);
    setIsModified(true);
    setSelectedTemplate("編集済み");
  };

  const handleDeleteItem = (index: number) => {
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
    setIsModified(true);
    setSelectedTemplate("編集済み");
  };

  const handleChangeItem = (index: number, name: string, weight: number) => {
    const newItems = [...selectedItems];
    newItems[index] = { name, weight };
    setSelectedItems(newItems);
    setIsModified(true);
    setSelectedTemplate("編集済み");
  };

  const handleTemplateSelection = (items: any[], templateName: string) => {
    setSelectedItems([...items]);
    setSelectedTemplate(templateName);
    setIsEditing(false);
    setIsModified(false);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setSelectedTemplate(isEditing || !isModified ? null : "編集済み");
  };

  const copyToClipboard = () => {
    if (result && itemDescriptions[result]) {
      const textToCopy = `${result}\n${itemDescriptions[result]}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000); // Revert after 5 seconds
      });
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('rouletteHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('rouletteHistory', JSON.stringify(history));
  }, [history]);

  const saveHistory = () => {
    if (result) {
      const newEntry = {
        date: new Date().toLocaleString(),
        result,
        template: selectedTemplate || "編集済み",
      };
      setHistory([newEntry, ...history]);
    }
  };
  
  useEffect(() => {
    if (result) {
      saveHistory();
    }
  }, [result]);

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

      <div className="result">
        <h1>Result: {result || 'ルーレットを回してください'}</h1>

        {result && itemDescriptions[result] && (
          <div>
            <p className="item-description">
              {itemDescriptions[result]}
            </p>
            <button 
              onClick={copyToClipboard} 
              style={{
                borderColor: isCopied ? 'green' : 'initial',
                color: isCopied ? 'green' : 'initial',
              }}
            >
              結果と説明をコピー
            </button>
          </div>
        )}
      </div>
      
      <div className="template-buttons">
        <h2>テンプレート</h2>
        <button 
          className={selectedTemplate === "1位" ? "selected" : ""} 
          onClick={() => handleTemplateSelection(itemsRank1, "1位")}>
          1位
        </button>
        <button 
          className={selectedTemplate === "2位" ? "selected" : ""} 
          onClick={() => handleTemplateSelection(itemsRank2, "2位")}>
          2位
        </button>
        <button 
          className={selectedTemplate === "3位" ? "selected" : ""} 
          onClick={() => handleTemplateSelection(itemsRank3, "3位")}>
          3位
        </button>
        <button 
          className={selectedTemplate === "4-5位" ? "selected" : ""} 
          onClick={() => handleTemplateSelection(itemsRank4To5, "4-5位")}>
          4-5位
        </button>
        <button 
          className={selectedTemplate === "6位" ? "selected" : ""} 
          onClick={() => handleTemplateSelection(itemsRank6, "6位")}>
          6位
        </button>
        <button 
          className={selectedTemplate === "編集" || isModified ? "selected" : ""} 
          onClick={toggleEditing}>
          編集
        </button>
      </div>

      <div className="selected-items">
        <h2>アイテムと重み</h2>
        <p className='percentageSum'>合計: {totalWeight}</p>
        {isEditing ? (
          <>
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleChangeItem(index, e.target.value, item.weight)}
                  />
                  <input
                    type="number"
                    value={item.weight}
                    onChange={(e) => handleChangeItem(index, item.name, parseInt(e.target.value))}
                  />
                  <button onClick={() => handleDeleteItem(index)}>削除</button>
                </li>
              ))}
            </ul>
            <button onClick={handleAddItem}>アイテムを追加</button>
            <button onClick={toggleEditing}>完了</button>
          </>
        ) : (
          <>
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  {item.name}: {item.weight}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="history">
        <h2>履歴</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                {entry.date}: {entry.result}（{entry.template}）
              </li>
            ))}
          </ul>
        ) : (
          <p>履歴がありません。</p>
        )}
        <button onClick={() => setHistory([])}>履歴を削除</button>
      </div>
    </div>
  );
};
