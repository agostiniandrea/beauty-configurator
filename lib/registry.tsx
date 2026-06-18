"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // On the server the sheet captures styles for SSR injection.
  // On the client we pass no sheet so styled-components uses its normal
  // browser injection — but both renders return <StyleSheetManager> so
  // React sees the same tree structure and hydration succeeds.
  return (
    <StyleSheetManager sheet={typeof window === "undefined" ? sheet.instance : undefined}>
      {children}
    </StyleSheetManager>
  );
}
