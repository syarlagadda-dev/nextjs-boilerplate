"use client";

import { useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [number, setNumber] = useState(0);
  const [isOpen] = useState(true); // Just a state piece I used to test conditional rendering

  async function getAdvice() {
    const response = await fetch(
      `https://api.adviceslip.com/advice?ts=${Date.now()}`
    );
    const data = await response.json();
    setAdvice(data.slip.advice);
    setNumber((number) => number + 1);
  }

  const progressMessage = // Conditional progress messages
    number >= 10
      ? number >= 20
        ? "You are a sage!"
        : "You are getting wiser!"
      : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(59,130,246,0.20), transparent 60%), linear-gradient(180deg, #0b1220, #070b14)",
        color: "#e5e7eb",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
      }}
    >
      {isOpen && (
        <div
          style={{
            width: "100%",
            maxWidth: "720px",
            borderRadius: "16px",
            padding: "24px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                letterSpacing: "0.2px",
              }}
            >
              Advice Center
            </h1>
            <p style={{ margin: "6px 0 0", color: "rgba(229,231,235,0.75)" }}>
              Tap the button to receive a piece of advice.
            </p>
          </div>

          {/* Advice box */}
          <div style={{ marginTop: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "13px",
                color: "rgba(229,231,235,0.8)",
              }}
            >
              Your advice
            </label>

            <textarea
              readOnly
              value={advice}
              placeholder="Click “Get Advice” to display your first message…"
              style={{
                width: "100%",
                minHeight: "120px",
                resize: "none",
                padding: "14px 14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,0,0,0.25)",
                color: "#f9fafb",
                outline: "none",
                lineHeight: 1.5,
                fontSize: "15px",
                marginLeft: "-15px", // Adjust for padding
              }}
            />
          </div>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginTop: "16px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={getAdvice}
              style={{
                cursor: "pointer",
                border: "none",
                padding: "10px 14px",
                borderRadius: "12px",
                fontWeight: 600,
                background:
                  "linear-gradient(180deg, rgba(59,130,246,1), rgba(37,99,235,1))",
                color: "white",
                boxShadow: "0 10px 18px rgba(37,99,235,0.25)",
                transition: "transform 0.08s ease, box-shadow 0.08s ease",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(1px)"; // This translate makes the button "jump" as feedback
                e.currentTarget.style.boxShadow =
                  "0 6px 12px rgba(37,99,235,0.25)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 18px rgba(37,99,235,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 18px rgba(37,99,235,0.25)";
              }}
            >
              Get Advice
            </button>

            <div
              style={{
                padding: "10px 12px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(229,231,235,0.9)",
                fontSize: "14px",
              }}
            >
              Pieces of advice read:{" "}
              <strong style={{ color: "#fff" }}>{number}</strong>
            </div>
          </div>

          {/* Progress message */}
          {progressMessage && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "#f3f4f6",
              }}
            >
              {progressMessage}
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: "16px",
              color: "rgba(229,231,235,0.55)",
              fontSize: "12px",
            }}
          >
            Tip: The API fetches can be quite slow, so please give us a second!
          </div>
        </div>
      )}
    </div>
  );
}
