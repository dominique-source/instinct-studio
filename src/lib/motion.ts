import { useSyncExternalStore } from "react";

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * useSyncExternalStore instead of useState+useEffect: reading matchMedia is
 * a subscription to external state, and setting state synchronously inside
 * an effect body triggers an extra cascading render (and the
 * react-hooks/set-state-in-effect lint rule) for no benefit here.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
}
