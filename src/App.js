import React, { useEffect, useState } from 'react';

// autoclicker
// 1. price to buy
// 2. score per second

const grandma = {
  price: 5,
  cps: 10,
};

const AutoClicker = () => {
  return;
};

function App() {
  const clickModifier = 1.15;
  const costModifier = 1.15;
  const [score, setScore] = useState(100000);
  const [cursor, setCursor] = useState({ price: 10, cps: 1 });
  const [grandma, setGrandma] = useState({ price: 100, cps: 5 });

  const [CPS, setCPS] = useState(0);

  const onManualClick = () => {
    setScore((score) => score + 1);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const clicks = CPS / 100;
      setScore((score) => score + clicks);
    }, 10);
    return () => clearInterval(interval);
  }, [CPS]);

  // 1. run every 1 second
  // 2. add to score clicksPerSecond

  const buyItem = (price) => {
    const newScore = Math.round(score - price);
    setScore(newScore);
  };
  const upgradeItem = (item, setItem) => {
    const newCps = Math.round(item.cps * clickModifier);
    const newPrice = Math.round(item.price * costModifier);
    setItem({ ...item, cps: newCps, price: newPrice });
  };
  const autoClickItem = (item) => {
    setInterval(() => {
      setScore((score) => score + item.cps);
    }, 1000);
  };

  const onBuyItem = (item, setItem) => {
    if (score >= item.price) {
      buyItem(item.price);
      upgradeItem(item, setItem);
      // autoClickItem(item);
      addToCPS();
      // setAutoClick(autoClick => )

      // 1. set global autoclick number
      // 2. add up to score from global autoclick number
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
