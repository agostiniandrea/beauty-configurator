"use client";

import { useState, useEffect, type ReactNode } from "react";

/**
 * Renders children only after the component has mounted on the client.
 * Server renders nothing, so there is no server HTML to mismatch against.
 *
 * Use this to wrap components that are modified by browser extensions before
 * React hydrates — those modifications produce structural mismatches that
 * suppressHydrationWarning cannot suppress.
 */
export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <>{children}</>;
}
