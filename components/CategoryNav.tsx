"use client";

import styled, { css } from "styled-components";
import { useLocale } from "next-intl";
import type { Category } from "@/lib/types";
import type { Locale } from "@/site.config";

const List = styled.ol`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavButton = styled.button<{
  $isActive: boolean;
  $isDone: boolean;
  $isAccessible: boolean;
}>`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  border: none;
  transition: background var(--transition-fast), color var(--transition-fast);
  cursor: ${({ $isAccessible }) => ($isAccessible ? "pointer" : "not-allowed")};
  opacity: ${({ $isAccessible }) => ($isAccessible ? 1 : 0.5)};

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: var(--color-action-bg);
      color: var(--color-action-text);
    `}

  ${({ $isActive, $isDone, $isAccessible }) =>
    !$isActive &&
    ($isDone || $isAccessible) &&
    css`
      background: transparent;
      color: var(--color-text-secondary);
      &:hover { background: var(--color-surface-alt); }
    `}

  ${({ $isActive, $isAccessible }) =>
    !$isActive &&
    !$isAccessible &&
    css`
      background: transparent;
      color: var(--color-text-muted);
    `}
`;

const StepBadge = styled.span<{ $isActive: boolean; $isDone: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  flex-shrink: 0;

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: var(--color-brand-rose);
      color: white;
    `}

  ${({ $isActive, $isDone }) =>
    !$isActive &&
    $isDone &&
    css`
      background: color-mix(in srgb, var(--color-brand-rose) 20%, transparent);
      color: var(--color-brand-rose);
    `}

  ${({ $isActive, $isDone }) =>
    !$isActive &&
    !$isDone &&
    css`
      background: var(--color-border);
      color: var(--color-text-muted);
    `}
`;

const StepLabel = styled.span`
  font-weight: var(--font-weight-medium);
`;

type Props = {
  categories: Category[];
  currentStep: number;
  completedSteps: Set<number>;
  onSelect: (index: number) => void;
};

export default function CategoryNav({ categories, currentStep, completedSteps, onSelect }: Props) {
  const locale = useLocale() as Locale;

  return (
    <nav aria-label="Configuration steps">
      <List>
        {categories.map((cat, index) => {
          const isActive = index === currentStep;
          const isDone = completedSteps.has(index);
          const isAccessible = index <= currentStep || isDone;

          return (
            <li key={cat.id}>
              <NavButton
                onClick={() => isAccessible && onSelect(index)}
                disabled={!isAccessible}
                aria-current={isActive ? "step" : undefined}
                $isActive={isActive}
                $isDone={isDone}
                $isAccessible={isAccessible}
              >
                <StepBadge $isActive={isActive} $isDone={isDone} aria-hidden="true">
                  {isDone && !isActive ? "✓" : index + 1}
                </StepBadge>
                <StepLabel>{cat.name[locale]}</StepLabel>
              </NavButton>
            </li>
          );
        })}
      </List>
    </nav>
  );
}
