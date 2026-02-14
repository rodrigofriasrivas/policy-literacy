import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

interface RedirectProps {
  to?: string;
  toFn?: (params: Record<string, string>) => string;
}

export function RedirectToExternal({ to, toFn }: RedirectProps) {
  const params = useParams();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;
    hasRedirected.current = true;
    const target = toFn ? toFn(params as Record<string, string>) : to ?? "/";
    window.location.replace(target);
  }, [to, toFn, params]);

  return null;
}
