import { useCallback, useEffect, useRef } from "react";
import {
  useReactFlow,
  type Node,
} from "@xyflow/react";
import type { TourState } from "../tour/TourEngine.js";

/**
 * Hook that handles tour transitions:
 * - Smooth camera pan/zoom to focused nodes
 * - Highlight/dim nodes based on tour step
 * - Animate edges
 */
export function useTourTransitions(state: TourState | null) {
  const { fitView, setViewport, setNodes } = useReactFlow();
  const prevStateRef = useRef<string>("");

  const applyTransition = useCallback(() => {
    if (!state?.currentStep) return;

    const stepKey = `${state.currentIndex}-${state.currentStep.id}`;
    if (stepKey === prevStateRef.current) return;
    prevStateRef.current = stepKey;

    const { focusNodeIds, cameraPosition } = state.currentStep;

    // Camera movement
    if (cameraPosition) {
      setViewport(
        {
          x: cameraPosition.x,
          y: cameraPosition.y,
          zoom: cameraPosition.zoom,
        },
        { duration: 600 },
      );
    } else if (focusNodeIds.length > 0) {
      // Auto-fit to show focused nodes
      fitView({
        nodes: focusNodeIds.map((id) => ({ id })),
        duration: 600,
        padding: 0.3,
      });
    }

    // Dim non-relevant nodes, highlight focused ones
    setNodes((nodes: Node[]) =>
      nodes.map((node) => {
        const isFocused = focusNodeIds.includes(node.id);
        return {
          ...node,
          style: {
            ...node.style,
            opacity: isFocused ? 1 : 0.3,
            transition: "opacity 300ms ease",
          },
        };
      }),
    );
  }, [state, fitView, setViewport, setNodes]);

  useEffect(() => {
    if (state?.isPlaying) {
      applyTransition();
    } else if (state && !state.isPlaying && state.currentIndex === -1) {
      // Tour stopped — restore all nodes
      prevStateRef.current = "";
      setNodes((nodes: Node[]) =>
        nodes.map((node) => ({
          ...node,
          style: {
            ...node.style,
            opacity: 1,
            transition: "opacity 300ms ease",
          },
        })),
      );
      fitView({ duration: 400 });
    }
  }, [state, applyTransition, setNodes, fitView]);
}
