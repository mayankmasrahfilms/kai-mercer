"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useExperience } from "./Experience";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Internal link that plays the lime page transition before navigating. */
export function TLink({ href, onClick, children, ...rest }: Props) {
  const { navigate } = useExperience();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (rest.target && rest.target !== "_self") return;
    e.preventDefault();
    navigate(href);
  };
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
