import { GraphCanvas } from "./graph/index.js";

/**
 * App shell — full viewport, dark canvas.
 */
export function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GraphCanvas />
    </div>
  );
}
