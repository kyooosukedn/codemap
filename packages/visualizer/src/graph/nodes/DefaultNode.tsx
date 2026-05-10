import { Handle, Position, type NodeProps } from "@xyflow/react";

/**
 * Node type → color mapping from DESIGN.md
 */
const TYPE_COLORS: Record<string, string> = {
  page: "#FF6B6B",
  api: "#FF8A5C",
  component: "#A8E6CF",
  database: "#FFD93D",
  service: "#4ECDC4",
  library: "#74B9FF",
  config: "#A29BFE",
  middleware: "#FD79A8",
};

/**
 * Node type → icon (emoji for now, Lucide later)
 */
const TYPE_ICONS: Record<string, string> = {
  page: "📄",
  api: "🔌",
  component: "🧩",
  database: "🗄️",
  service: "☁️",
  library: "📦",
  config: "⚙️",
  middleware: "🛡️",
};

export interface CodeMapNodeData {
  label: string;
  filePath?: string;
  nodeType: string;
  [key: string]: unknown;
}

/**
 * DefaultNode — a type-colored graph node.
 *
 * Left border color = node type.
 * Hover = glow + slight scale.
 * Selected = breathing pulse.
 */
export function DefaultNode({ data, selected }: NodeProps) {
  const { label, filePath, nodeType } = data as CodeMapNodeData;
  const color = TYPE_COLORS[nodeType] ?? TYPE_COLORS.library;
  const icon = TYPE_ICONS[nodeType] ?? "📁";

  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div
        style={{
          minWidth: 180,
          padding: "10px 14px",
          background: "var(--bg-elevated)",
          border: `1px solid ${selected ? "var(--accent-primary)" : "var(--border)"}`,
          borderLeft: `3px solid ${color}`,
          borderRadius: 8,
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "var(--text)",
          boxShadow: selected
            ? `0 0 20px var(--accent-glow), 0 0 40px var(--accent-glow)`
            : "none",
          transition: "box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease",
          cursor: "grab",
          animation: selected ? "breathe 4s ease-in-out infinite" : "none",
        }}
        onMouseEnter={(e) => {
          if (!selected) {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              `0 0 12px ${color}33, 0 0 24px ${color}1A`;
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
          }
        }}
        onMouseLeave={(e) => {
          if (!selected) {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
          }
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>{icon}</span>
          <span style={{ fontWeight: 500, fontSize: 13 }}>{label}</span>
        </div>
        {filePath && (
          <div
            style={{
              marginTop: 4,
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {filePath}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  );
}
