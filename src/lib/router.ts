import { useEffect, useState } from "react";

const NAVIGATE_EVENT = "app:navigate";

export interface AppLocation {
  pathname: string;
  search: string;
  hash: string;
}

function getLocation(): AppLocation {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

export function useLocation(): AppLocation {
  const [loc, setLoc] = useState<AppLocation>(() => getLocation());

  useEffect(() => {
    const onChange = () => setLoc(getLocation());
    window.addEventListener("popstate", onChange);
    window.addEventListener(NAVIGATE_EVENT, onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener(NAVIGATE_EVENT, onChange);
    };
  }, []);

  return loc;
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  if (url.origin !== window.location.origin) {
    window.location.href = to;
    return;
  }

  const current =
    window.location.pathname + window.location.search + window.location.hash;
  const next = url.pathname + url.search + url.hash;
  if (current === next) return;

  window.history.pushState({}, "", next);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

