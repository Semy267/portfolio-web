import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide border-2 border-border transition-colors focus:outline-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-hard",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground shadow-hard",
        outline: "text-foreground bg-transparent",
        lime: "bg-accent text-accent-foreground shadow-hard",
        yellow: "bg-accent-yellow text-foreground shadow-hard",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
