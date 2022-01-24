import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import Confetti from "react-confetti";

function App() {
  const [number, setNumber] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numbersOfRolls, setNumbersOfRolls] = useState(0);

  useEffect(() => {
    const allHeld = number.every((die) => die.isHeld);
    const firstValue = number[0].value;
    const allSameValue = number.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("won");
    }
  }, [number]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function holdDice(id) {
    setNumber((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function reset() {
    if (!tenzies) {
      setNumbersOfRolls(numbersOfRolls + 1);
      setNumber((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setNumbersOfRolls(0);
      setNumber(allNewDice());
    }
  }

  const diceElements = number.map((die) => {
    return (
      <Die
        value={die.value}
        key={die.id}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  return (
    <div className="center">
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all the dice are the same. Click each die to freeze it at
          its current value between rolls.
        </p>
        <div className="container">{diceElements}</div>
        {<p className="rolls">Numbers of rolls {numbersOfRolls} </p>}
        <button onClick={reset}> {tenzies ? "Reset game" : "Roll"}</button>
        {tenzies && <Confetti className="confetti" />}
      </main>
    </div>
  );
}

export default App;
