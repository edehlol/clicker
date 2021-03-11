import React, { useEffect, useState } from 'react';

function App() {
  const clickModifier = 1.15;
  const costModifier = 1.15;
  const [score, setScore] = useState(100000);
  const [CPS, setCPS] = useState(0);
  const [cursor, setCursor] = useState({ price: 10, cps: 1 });
  const [grandma, setGrandma] = useState({ price: 100, cps: 5 });

  useEffect(() => {
    const interval = setInterval(() => {
      const clicks = CPS / 100;
      setScore((score) => score + clicks);
    }, 10);
    return () => clearInterval(interval);
  }, [CPS]);

  const onManualClick = () => {
    setScore((score) => score + 1);
  };

  const buyItem = (price) => {
    const newScore = Math.round(score - price);
    setScore(newScore);
  };
  const upgradeItem = (item, setItem) => {
    const newCps = Math.round(item.cps * clickModifier);
    const newPrice = Math.round(item.price * costModifier);
    setItem({ ...item, cps: newCps, price: newPrice });
  };

  const onBuyItem = (item, setItem) => {
    if (score >= item.price) {
      buyItem(item.price);
      upgradeItem(item, setItem);
      addToCPS();
    }
  };
  const addToCPS = () => {
    setCPS([cursor, grandma].reduce((total, current) => total.cps + current.cps));
  };

  return (
    <div>
      <button onClick={onManualClick}>click</button>
      <button onClick={() => onBuyItem(cursor, setCursor)}>Cursor: {cursor.price}</button>
      <button onClick={() => onBuyItem(grandma, setGrandma)}>Grandma: {grandma.price}</button>
      <p>{Math.round(score)}</p>
      <p>clicks per second: {CPS}</p>
    </div>
  );
}

export default App;
