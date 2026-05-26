"use client";

import styled from "styled-components";

export type PlaceholderSize = "sm" | "md" | "lg";

const GRADIENTS = [
  "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-rose-light) 65%, var(--color-surface)), color-mix(in srgb, var(--color-brand-gold) 18%, var(--color-surface)))",
  "linear-gradient(150deg, color-mix(in srgb, var(--color-brand-gold) 32%, var(--color-surface)), color-mix(in srgb, var(--color-brand-rose-light) 45%, var(--color-surface)))",
  "linear-gradient(120deg, color-mix(in srgb, var(--color-brand-mauve) 22%, var(--color-surface)), color-mix(in srgb, var(--color-brand-rose-light) 55%, var(--color-surface)))",
  "linear-gradient(160deg, var(--color-surface-alt), color-mix(in srgb, var(--color-brand-rose-light) 40%, var(--color-surface)))",
] as const;

const Wrap = styled.div<{ $bg: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg};
  gap: 6px;
  user-select: none;
`;

const Glyph = styled.span<{ $size: PlaceholderSize }>`
  font-family: var(--font-heading);
  font-style: italic;
  color: color-mix(in srgb, var(--color-brand-rose) 45%, transparent);
  line-height: 1;
  font-size: ${({ $size }) =>
    $size === "lg" ? "44px" : $size === "md" ? "28px" : "13px"};
`;

const Label = styled.p<{ $size: PlaceholderSize }>`
  font-family: var(--font-heading);
  font-weight: 300;
  font-style: italic;
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 12px;
  max-width: 100%;
  font-size: ${({ $size }) => ($size === "lg" ? "20px" : "12px")};
`;

function gradientIndex(label: string): number {
  return label.charCodeAt(0) % GRADIENTS.length;
}

type Props = {
  label?: string;
  colorSeed?: string;
  size?: PlaceholderSize;
};

export default function ImagePlaceholder({ label, colorSeed, size = "md" }: Props) {
  const bg = GRADIENTS[gradientIndex(colorSeed ?? label ?? "")];
  return (
    <Wrap $bg={bg} aria-hidden="true">
      <Glyph $size={size}>✦</Glyph>
      {label && size !== "sm" && <Label $size={size}>{label}</Label>}
    </Wrap>
  );
}
