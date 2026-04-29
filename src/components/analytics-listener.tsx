"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track, trackPageView } from "@/lib/analytics";

export function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const qs = searchParams?.toString();
    const path = qs ? `${pathname}?${qs}` : pathname;
    if (!path || lastPath.current === path) return;
    lastPath.current = path;

    void trackPageView({
      page_path: path,
      page_location: typeof window !== "undefined" ? window.location.href : undefined,
      page_title: typeof document !== "undefined" ? document.title : undefined,
    });

    if (pathname === "/") {
      void track("landing_page_viewed", { source: "landing", page_path: path });
    }
  }, [pathname, searchParams]);

  return null;
}

