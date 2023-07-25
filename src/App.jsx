import { useState, useMemo } from "react";
import "./App.css";
import Clicker from "./Clicker.jsx";

function App() {
  const [hasClicker, setHasClicker] = useState(true);
  const [count, setCount] = useState(0);

  const globalCounter = () => {
    setCount(count + 1);
  };

  const clickersCount = 10;

  const tempArray = [...Array(clickersCount)];

  const colors = useMemo(() => {
    const colors = [];

    for (let i = 0; i < clickersCount; i++) {
      colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
    }
    return colors;
  }, [clickersCount]);

  return (
    <>
      <div>{`The total Count is: ${count}`}</div>
      <button
        style={{ marginBottom: "20px" }}
        onClick={() => setHasClicker(!hasClicker)}
      >
        {hasClicker ? "Hide" : "Show"} Clicker
      </button>
      {hasClicker && (
        <div>
          {tempArray.map((item, index) => (
            <Clicker
              key={index}
              keyName={`count${index}`}
              colorName={colors[index]}
              globalCount={globalCounter}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
