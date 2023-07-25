import React from "react";

import { useState, useEffect, useRef } from "react";

export default function Clicker({ keyName, colorName, globalCount }) {
  // Renders twice so to optimize it further the getItem is stored in the state variable
  // const [count, setCount] = useState(0);
  // console.log("render");
  // useEffect(() => {
  //   const countData = parseInt(localStorage.getItem("count") ?? 0);
  //   setCount(countData);
  // }, []);

  const buttonRef = useRef();
  console.log(buttonRef);

  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0),
  );

  useEffect(() => {
    buttonRef.current.style.backgroundColor = "lavender";
    buttonRef.current.style.color = "black";

    return () => {
      localStorage.removeItem(keyName);
    };
  });

  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  const buttonClick = () => {
    setCount(count + 1);
    globalCount();
  };

  return (
    <div>
      <button ref={buttonRef} onClick={buttonClick}>
        Click
      </button>
      <h2 style={{ color: colorName }}>{`Hello ${count}`}</h2>
    </div>
  );
}
