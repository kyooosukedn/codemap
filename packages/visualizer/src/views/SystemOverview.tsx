import { useState, useEffect } from "react";
import type { Node, Edge } from "@xyflow/react";
import { useCodeMap } from "../data/context.js";
import { GraphCanvas } from "../graph/index.js";
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
    <GraphCanvas nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
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
