"use client";

import { useSyncExternalStore, useState, useEffect } from "react";
import styled from "styled-components";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe() {
  return () => {};
}

const TogglePlaceholder = styled.div`
  width: 32px;
  height: 32px;
`;

const ToggleButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color var(--transition-base),
    background var(--transition-base);
  font-size: var(--font-size-md);

  &:hover {
    color: var(--color-text-primary);
    background: var(--color-surface-alt);
  }
`;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  // Runs on mount too, not just on toggle — otherwise a returning visitor
  // whose stored preference disagrees with their current system preference
  // gets a toggle button that already reads correctly (state is right from
  // getInitialTheme) while the page itself renders in the *other* theme,
  // since nothing had applied the class for this fresh load yet.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  }

  if (!mounted) return <TogglePlaceholder aria-hidden />;

  return (
    <ToggleButton
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? "☀" : "☾"}
    </ToggleButton>
  );
}
