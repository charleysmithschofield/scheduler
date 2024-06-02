// src/hooks/useVisualMode.js
import { useState } from "react";

// Custom hook for managing visual modes in components
export default function useVisualMode(initial) {
  // State to keep track of the mode history
  const [history, setHistory] = useState([initial]); 

  // Function to transition to a new mode
  function transition(mode, replace = false) {
    // If replace is true, replace the lasst mode in history with the new mode
    // Otherwise, add the new mode to history
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]);
  }

  // Function to go back to the previous mode
  function back() {
    // Check if there's more than one more in history to ensure it does not go back to the initial mode
    if (history.length > 1) {
      // Remove the last mode from history
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
  }

  // Return the current mode and functions for transitioning and going back
  return { mode: history[history.length - 1], transition, back };
}
