"use client";

import React, { useEffect, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());
  const [mounted, setMounted] = useState(false);

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // After hydration, switch to a plain fragment so styled-components uses its
  // own client-side injection instead of the SSR sheet.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount: render StyleSheetManager on both server and initial client
  // render so the React tree matches and hydration succeeds.
  if (!mounted) {
    return (
      <StyleSheetManager sheet={sheet.instance}>
        {children}
      </StyleSheetManager>
    );
  }

  return <>{children}</>;
}
