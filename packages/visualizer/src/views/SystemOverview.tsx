import { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCodeMap } from "../data/context.js";
import { DefaultNode } from "../graph/nodes/DefaultNode.tsx";
import { treeToGraph } from "./layout.js";

const nodeTypes = { "codemap-default": DefaultNode };

export function SystemOverview() {
  const { data, loading, error } = useCodeMap();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (!data?.fileTree) return;
    treeToGraph(data.fileTree).then(({ nodes: n, edges: e }) => {
      setNodes(n);
      setEdges(e);
    });
  }, [data]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  if (loading) {
    return (
      <div style={centerStyle}>
        Mapping your architecture...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...centerStyle, flexDirection: "column", gap: 8 }}>
        <span style={{ color: "var(--accent-route)" }}>⚠️ Failed to load codemap.json</span>
        <span style={{ color: "var(--text-dim)", fontSize: 13 }}>{error}</span>
      </div>
    );
  }

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
      style={{ background: "var(--bg)", width: "100%", height: "100%" }}
      defaultEdgeOptions={{
        type: "smoothstep",
        style: { stroke: "var(--border-active)", strokeWidth: 1.5 },
      }}
    >
      <Background gap={20} size={1} color="var(--border)" />
      <Controls showInteractive={false} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8 }} />
      <MiniMap nodeColor={() => "var(--accent-primary)"} maskColor="rgba(10, 10, 15, 0.85)" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8 }} />
    </ReactFlow>
  );
}

const centerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--bg-deep)",
  color: "var(--text-muted)",
  fontFamily: "var(--font-body)",
  fontSize: 16,
};
