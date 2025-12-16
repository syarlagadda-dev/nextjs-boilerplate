"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [advice, setAdvice] = useState("");
  const [number, setNumber] = useState(0);

  async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setAdvice(data.slip.advice);
    setNumber((count) => count + 1);
  }

  useEffect(() => {
    Promise.resolve().then(getAdvice);
  }, []);

  return (
    <div>
      <h1>Advice Corner</h1>
      <button onClick={getAdvice}>Get Advice</button>
      <h3>{advice || "Click the button above to get started"}</h3>
      <p>
        Pieces of advice read: <strong>{number}</strong>
      </p>
    </div>
  );
}
