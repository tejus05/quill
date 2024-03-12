import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const HoverShine = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("group relative", className)}>
      {children}
    </div>
  );
};
