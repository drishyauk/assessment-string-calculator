import React, { useState } from "react";
import "../index.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | string | null>(null);

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const calculateResult = () => {
    try {
      if (input.trim() === "") {
        setResult(0);
      } else {
        // Please add the delimiters here
        const numbers = input.split(/[\n,\/\/;:=%]+/);

        if (/[,|\n]$/.test(input)) {
          throw new Error("Invalid input: Trailing comma or newline");
        }

        const negativeNumbers = numbers.filter((num) => Number(num) < 0);

        if (negativeNumbers.length > 0) {
          setResult(
            `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
          );
          return;
        }
        const sum = numbers.reduce((acc, curr) => acc + Number(curr), 0);
        setResult(sum);
      }
    } catch (error) {
      setResult("Error");
    }
  };

  const resetCalculator = () => {
    setInput("");
    setResult(null); // Reset the result
  };

  return (
    <div className="calculator-container">
      <h2>String Calculator</h2>
      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Enter numbers separated by a custom delimiter or new lines/commas"
        className="input-textarea"
      />
      <div className="btn-section">
        <button onClick={calculateResult} className="calculate-button">
          Calculate
        </button>
        <button onClick={resetCalculator} className="reset-button">
          Reset
        </button>
      </div>
      {result !== null && (
        <div
          className={
            typeof result === "string" ? "result error" : "result success"
          }
        >
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}

export default Calculator;
