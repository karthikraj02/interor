"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme-preference";
const listeners = new Set<() => void>();

function readTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Theme {
  return (document.documentElement.dataset.theme as Theme) ?? readTheme();
}

function getServerSnapshot(): Theme {
  return "dark";
}

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

/**
 * Theme is applied via `data-theme` on <html>. A blocking inline script in
 * `layout.tsx` sets the stored/system preference before paint (no flash);
 * this hook then reads that same DOM attribute as its source of truth via
 * useSyncExternalStore, so React state never drifts from what's rendered.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => applyTheme(next), []);
  const toggleTheme = useCallback(() => applyTheme(theme === "dark" ? "light" : "dark"), [theme]);

  return { theme, setTheme, toggleTheme };
}
