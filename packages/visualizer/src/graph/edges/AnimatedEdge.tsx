import {
  BaseEdge,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";

/**
 * AnimatedEdge — custom React Flow edge with animated dashes.
 * Default: thin gray line. Active: flowing dashes. Hover: glow.
 */
export function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  selected,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <g className="codemap-edge">
      {/* Glow layer (visible on hover/selected) */}
      <path
        d={edgePath}
        fill="none"
        stroke={selected ? "var(--accent-primary)" : "transparent"}
        strokeWidth={selected ? 4 : 0}
        opacity={0.3}
        style={{ transition: "all 200ms ease" }}
      />

      {/* Main edge */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          stroke: selected ? "var(--accent-primary)" : "var(--border-active)",
          strokeWidth: selected ? 2 : 1.5,
          strokeDasharray: selected ? "6 3" : "none",
          animation: selected ? "dash 0.6s linear infinite" : "none",
          transition: "stroke 200ms ease, stroke-width 200ms ease",
        }}
      />

      {/* Arrow marker */}
      <circle
        r={3}
        fill={selected ? "var(--accent-primary)" : "var(--border-active)"}
        style={{ transition: "fill 200ms ease" }}
      >
        <animateMotion dur="1.5s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </g>
  );
}
