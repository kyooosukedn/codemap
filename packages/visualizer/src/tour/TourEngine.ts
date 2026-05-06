import type { TourDefinition, TourStep } from "../types.js";

export type TourEventType = "stepChange" | "complete" | "play" | "stop";

export interface TourState {
  steps: TourStep[];
  currentIndex: number;
  isPlaying: boolean;
  currentStep: TourStep | null;
}

type Listener = (state: TourState) => void;

/**
 * TourEngine — plain JS controller for guided tours.
 *
 * Not a React component. Emits events that React subscribes to.
 * Manages step navigation, camera, highlights.
 */
export class TourEngine {
  private steps: TourStep[];
  private currentIndex = -1;
  private isPlaying = false;
  private listeners = new Map<TourEventType, Set<Listener>>();

  constructor(tour: TourDefinition) {
    this.steps = tour.steps;
  }

  get state(): TourState {
    return {
      steps: this.steps,
      currentIndex: this.currentIndex,
      isPlaying: this.isPlaying,
      currentStep: this.steps[this.currentIndex] ?? null,
    };
  }

  // ─── Navigation ────────────────────────────────────────────

  start(): void {
    if (this.steps.length === 0) return;
    this.isPlaying = true;
    this.currentIndex = 0;
    this.emit("play");
    this.emit("stepChange");
  }

  stop(): void {
    this.isPlaying = false;
    this.currentIndex = -1;
    this.emit("stop");
  }

  next(): void {
    if (!this.isPlaying) return;
    if (this.currentIndex >= this.steps.length - 1) {
      this.isPlaying = false;
      this.emit("complete");
      return;
    }
    this.currentIndex++;
    this.emit("stepChange");
  }

  previous(): void {
    if (!this.isPlaying) return;
    if (this.currentIndex <= 0) return;
    this.currentIndex--;
    this.emit("stepChange");
  }

  goTo(index: number): void {
    if (index < 0 || index >= this.steps.length) return;
    this.currentIndex = index;
    this.emit("stepChange");
  }

  // ─── Events ────────────────────────────────────────────────

  on(event: TourEventType, listener: Listener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);

    // Return unsubscribe function
    return () => this.listeners.get(event)?.delete(listener);
  }

  private emit(event: TourEventType): void {
    const state = this.state;
    this.listeners.get(event)?.forEach((fn) => fn(state));
  }
}
