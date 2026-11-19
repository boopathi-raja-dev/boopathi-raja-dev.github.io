import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const reduced = vi.hoisted(() => ({ value: false }));
vi.mock("motion/react", () => ({ useReducedMotion: () => reduced.value }));

import { useTypewriter } from "~/hooks/useTypewriter";

describe("useTypewriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    reduced.value = false;
  });
  afterEach(() => vi.useRealTimers());

  it("types one character per tick after the start delay", () => {
    const { result } = renderHook(() => useTypewriter("abc", { speed: 10, startDelay: 100 }));
    expect(result.current.output).toBe("");
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.output).toBe("a");
    act(() => vi.advanceTimersByTime(20));
    expect(result.current).toEqual({ output: "abc", done: true });
  });

  it("waits until enabled", () => {
    const { result, rerender } = renderHook(
      ({ on }) => useTypewriter("ab", { speed: 10, startDelay: 0, enabled: on }),
      {
        initialProps: { on: false },
      },
    );
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.output).toBe("");
    rerender({ on: true });
    act(() => vi.advanceTimersByTime(20));
    expect(result.current.done).toBe(true);
  });

  it("shows everything at once when reduced motion is on", () => {
    reduced.value = true;
    const { result } = renderHook(() => useTypewriter("hello"));
    expect(result.current).toEqual({ output: "hello", done: true });
  });
});
