"use client";

import { useState } from "react";

export function HoneypotField() {
  const [value, setValue] = useState("");

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-10000px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label htmlFor="website-honeypot">
        Website (leave blank)
      </label>
      <input
        id="website-honeypot"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
