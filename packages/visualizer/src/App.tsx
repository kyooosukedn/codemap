import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/**
 * App shell — full viewport, dark canvas, ready for nodes.
 * This is the foundation every view builds on.
 */
export function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "var(--bg)" }}>
      <ReactFlow
        nodes={[]}
        edges={[]}
        fitView
        style={{ background: "var(--bg)" }}
        defaultEdgeOptions={{ type: "smoothstep" }}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}
