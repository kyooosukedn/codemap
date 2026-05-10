import { ChevronLeft } from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  if (collapsed) {
    return (
      <div
        style={{
          width: 40,
          background: "var(--bg-elevated)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 8,
        }}
      >
        <button onClick={onToggle} style={collapseBtnStyle}>
          <ChevronLeft size={14} style={{ transform: "rotate(180deg)" }} />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: 280,
        background: "var(--bg-elevated)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Inspector
        </span>
        <button onClick={onToggle} style={collapseBtnStyle}>
          <ChevronLeft size={14} />
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-dim)",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          textAlign: "center",
        }}
      >
        Select a node to inspect
      </div>
    </div>
  );
}

const collapseBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: 4,
  border: "none",
  background: "transparent",
  color: "var(--text-muted)",
  cursor: "pointer",
  transition: "all 150ms ease",
};
