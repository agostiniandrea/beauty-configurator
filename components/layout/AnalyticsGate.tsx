"use client";

import { useSyncExternalStore } from "react";
import { Analytics } from "@vercel/analytics/next";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return readConsent() === "accepted";
}

// Server (and the pre-hydration client pass) never has consent yet — the
// real value is read from localStorage once mounted, same approach as
// lib/ClientOnly.tsx.
function getServerSnapshot() {
  return false;
}

/**
 * Mounts Vercel Analytics only after the visitor has actively accepted it
 * via ConsentBanner (components/layout/ConsentBanner.tsx). The two
 * components live in different parts of the tree (this one is rendered
 * from the root layout, outside next-intl's provider) so they coordinate
 * through localStorage + a CustomEvent rather than React props/context.
 */
export default function AnalyticsGate() {
  const accepted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!accepted) return null;
  return <Analytics />;
}
