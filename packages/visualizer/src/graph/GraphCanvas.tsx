import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export interface GraphCanvasProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodesChange?: OnNodesChange;
  onEdgesChange?: OnEdgesChange;
  nodeTypes?: NodeTypes;
}

export function GraphCanvas({
  nodes = [],
  edges = [],
  onNodesChange,
  onEdgesChange,
  nodeTypes,
}: GraphCanvasProps) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      minZoom={0.1}
      maxZoom={4}
      proOptions={{ hideAttribution: true }}
      style={{ background: "var(--bg)" }}
      defaultEdgeOptions={{
        type: "smoothstep",
        style: { stroke: "var(--border-active)", strokeWidth: 1.5 },
      }}
    >
      <Background gap={20} size={1} color="var(--border)" />
      <Controls
        showInteractive={false}
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: 8,
        }}
      />
      <MiniMap
        nodeColor={() => "var(--accent-primary)"}
        maskColor="rgba(10, 10, 15, 0.85)"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: 8,
        }}
      />
    </ReactFlow>
  );
}
