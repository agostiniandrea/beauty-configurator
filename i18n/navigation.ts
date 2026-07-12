import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware wrappers around the Next.js navigation APIs.
 * Use these (not next/link or next/navigation) whenever a URL points to
 * a page under app/[locale]/ — they add the locale prefix only when needed.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
