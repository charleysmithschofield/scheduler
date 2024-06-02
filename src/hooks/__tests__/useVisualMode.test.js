// src/hooks/__tests__/useVisualMode.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";

// Test data for modes
const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

// Test to ensure useVisualMode initializes with the default value
test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});


// Test to ensure useVisualMode transitions to another mode
test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});


// Test to ensure useVisualMode returns to the previous mode
test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});


// Test to ensure useVisualMode does not return to previous mode if already at initial
test("useVisualMode should not return to previous mode if already at initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Since we're already at the initial mode, calling back should not change the mode
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});
