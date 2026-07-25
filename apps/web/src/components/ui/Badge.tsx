import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "new" | "live" | "urgent" | "soft";
const map: Record<Variant, string> = {
  new: "badge-new",
  live: "badge-live",
  urgent: "badge-urgent",
  soft: "badge-soft",
};

export function Badge({
  children,
  variant = "soft",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return <span className={cn(map[variant], className)}>{children}</span>;
}
