/**
 * Shared constants for the cookie-consent gate. ConsentBanner (inside the
 * locale-aware tree) and AnalyticsGate (in the root layout, outside
 * next-intl's provider) don't share a React parent, so they coordinate
 * purely through localStorage + a same-tab CustomEvent — both are read in
 * the browser only, so there's no server/client mismatch.
 */
export const CONSENT_STORAGE_KEY = "beauty-configurator-consent";
export const CONSENT_EVENT = "beauty-configurator-consent-changed";

export type ConsentValue = "accepted" | "rejected";

export function readConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    // Private browsing / storage disabled — treat as "no decision yet".
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Storage unavailable — the banner still hides for this page view via
    // component state, it just won't be remembered on the next visit.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
