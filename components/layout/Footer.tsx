"use client";

import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import siteConfig from "@/site.config";
import { mq } from "@/lib/breakpoints";

const FooterBar = styled.footer`
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-alt);
`;

const Inner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  text-align: center;

  ${mq.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    padding: var(--space-6);
  }
`;

const Legal = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: center;

  ${mq.md} {
    justify-content: flex-end;
  }
`;

const FooterLink = styled(Link)`
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-base);

  &:hover {
    color: var(--color-text-primary);
  }
`;

const Rights = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  margin: 0;
`;

const DemoNotice = styled.p`
  font-size: var(--font-size-caption);
  color: var(--color-text-muted);
  margin: 0;
  max-width: 60ch;
`;

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <FooterBar>
      <Inner>
        <div>
          <Rights>{t("rights", { year, name: siteConfig.name })}</Rights>
          <DemoNotice>{t("demoNotice")}</DemoNotice>
        </div>
        <Legal aria-label={t("legalNavLabel")}>
          <FooterLink href="/privacy">{t("privacy")}</FooterLink>
          <FooterLink href="/cookies">{t("cookies")}</FooterLink>
        </Legal>
      </Inner>
    </FooterBar>
  );
}
