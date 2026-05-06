import { Search, Sliders } from "lucide-react";

interface TopBarProps {
  activeView?: string;
}

export function TopBar({ activeView = "overview" }: TopBarProps) {
  return (
    <div
      style={{
        height: 48,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        background: "var(--bg-elevated)",
        borderBottom: "1px solid var(--border)",
        gap: 16,
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "var(--accent-primary)", fontSize: 18 }}>◆</span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 16,
            color: "var(--text)",
          }}
        >
          CodeMap
        </span>
      </div>

      {/* View tabs */}
      <div style={{ display: "flex", gap: 4, marginLeft: 24 }}>
        {VIEW_TABS.map((tab) => (
          <button
            key={tab.id}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              background:
                activeView === tab.id ? "var(--accent-primary)" : "transparent",
              color:
                activeView === tab.id
                  ? "#fff"
                  : "var(--text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Actions */}
      <button style={iconBtnStyle}>
        <Search size={16} />
      </button>
      <button style={iconBtnStyle}>
        <Sliders size={16} />
      </button>
    </div>
  );
}

const VIEW_TABS = [
  { id: "overview", label: "Overview" },
  { id: "routes", label: "Routes" },
  { id: "flow", label: "Data Flow" },
  { id: "database", label: "Database" },
];

const iconBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: 6,
  border: "none",
  background: "transparent",
  color: "var(--text-muted)",
  cursor: "pointer",
  transition: "all 150ms ease",
};
