"use client";

import { useSyncExternalStore } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";
import { mq } from "@/lib/breakpoints";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// Server (and the pre-hydration client pass) can't know the stored choice —
// treat that as "not decided yet" and resolve once mounted, same approach
// as lib/ClientOnly.tsx.
function getServerSnapshot() {
  return null;
}

/**
 * Deliberately NOT position: fixed/absolute. Every configurator step has
 * its "Next" / "Review my order" control at the bottom of the content
 * column, and the category tabs sit right at the top — there's no edge of
 * the viewport a floating overlay could occupy without risking covering one
 * of them (confirmed by e2e: a fixed bottom bar intercepted clicks on
 * "Next" on narrow viewports). Rendering the banner in normal document
 * flow, above the Header (see app/[locale]/layout.tsx), makes it push the
 * rest of the page down instead of floating over it — no overlap is
 * possible because nothing else ever renders underneath it.
 */
const Bar = styled.div`
  background: var(--color-surface-alt);
  border-bottom: 1px solid var(--color-border-strong);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);

  ${mq.md} {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--space-5);
    padding: var(--space-3) var(--space-6);
  }
`;

const Message = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
  text-align: center;

  ${mq.md} {
    text-align: left;
  }
`;

const LearnMore = styled(Link)`
  color: var(--color-text-primary);
  text-decoration: underline;
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  gap: var(--space-3);
  flex-shrink: 0;
  justify-content: center;
`;

/**
 * Both buttons are styled with equal visual weight (same size, same border
 * treatment) so "Decline" is never a faint afterthought next to a bold
 * "Accept" — CJEU Planet49 requires rejecting to be as easy as accepting.
 */
const Button = styled.button<{ $primary?: boolean }>`
  padding: var(--space-2) var(--space-4);
  border-radius: 0.75rem;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  border: 1px solid ${(p) => (p.$primary ? "var(--color-action-bg)" : "var(--color-border-strong)")};
  background: ${(p) => (p.$primary ? "var(--color-action-bg)" : "transparent")};
  color: ${(p) => (p.$primary ? "var(--color-action-text)" : "var(--color-text-primary)")};
  transition: opacity var(--transition-base);

  &:hover {
    opacity: 0.85;
  }
`;

export default function ConsentBanner() {
  const t = useTranslations("consent");
  const consent = useSyncExternalStore(subscribe, readConsent, getServerSnapshot);

  if (consent !== null) return null;

  return (
    <Bar
      role="dialog"
      aria-live="polite"
      aria-label={t("message")}
      className="cookie-consent-banner"
    >
      <Message>
        {t("message")} <LearnMore href="/cookies">{t("learnMore")}</LearnMore>
      </Message>
      <Actions>
        <Button type="button" onClick={() => writeConsent("rejected")}>
          {t("reject")}
        </Button>
        <Button type="button" $primary onClick={() => writeConsent("accepted")}>
          {t("accept")}
        </Button>
      </Actions>
    </Bar>
  );
}
