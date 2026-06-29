"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale, localizeHref } from "@/lib/i18n/use-locale";

// Drop-in replacement for next/link inside client components. App-internal hrefs
// are automatically prefixed with the active locale so navigation keeps the
// visitor's chosen language; external links pass straight through.
type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function LocaleLink({ href, ...props }: Props) {
  const locale = useLocale();
  return <Link href={localizeHref(href, locale)} {...props} />;
}
