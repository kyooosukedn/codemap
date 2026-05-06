import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DefaultNode } from "./graph/nodes/DefaultNode.js";

const nodeTypes = { "codemap-default": DefaultNode };

/** Demo nodes showing all 8 types */
const DEMO_NODES: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, type: "codemap-default", data: { label: "Landing Page", filePath: "src/app/page.tsx", nodeType: "page" } },
  { id: "2", position: { x: 250, y: 0 }, type: "codemap-default", data: { label: "GET /api/projects", filePath: "src/app/api/projects/route.ts", nodeType: "api" } },
  { id: "3", position: { x: 500, y: 0 }, type: "codemap-default", data: { label: "ProjectCard", filePath: "src/components/ProjectCard.tsx", nodeType: "component" } },
  { id: "4", position: { x: 0, y: 150 }, type: "codemap-default", data: { label: "projects", filePath: "supabase/migrations/001.sql", nodeType: "database" } },
  { id: "5", position: { x: 250, y: 150 }, type: "codemap-default", data: { label: "OpenAI", filePath: "src/lib/ai.ts", nodeType: "service" } },
  { id: "6", position: { x: 500, y: 150 }, type: "codemap-default", data: { label: "generate-steps", filePath: "src/lib/generate-steps.ts", nodeType: "library" } },
  { id: "7", position: { x: 0, y: 300 }, type: "codemap-default", data: { label: "next.config", filePath: "next.config.ts", nodeType: "config" } },
  { id: "8", position: { x: 250, y: 300 }, type: "codemap-default", data: { label: "middleware", filePath: "src/middleware.ts", nodeType: "middleware" } },
];

const DEMO_EDGES: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e3-6", source: "3", target: "6" },
  { id: "e5-6", source: "5", target: "6" },
];

export function App() {
  const [nodes, setNodes] = useState(DEMO_NODES);
  const [edges, setEdges] = useState(DEMO_EDGES);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
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
        <Controls showInteractive={false} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8 }} />
        <MiniMap nodeColor={() => "var(--accent-primary)"} maskColor="rgba(10, 10, 15, 0.85)" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: 8 }} />
      </ReactFlow>
    </div>
  );
}
