import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "h-full transition-colors dark:border-primary/40 dark:bg-[linear-gradient(155deg,rgba(88,123,198,0.14)_0%,rgba(47,69,114,0.56)_2.5%,rgba(26,38,61,0.96)_24%,rgba(14,21,36,1)_100%)] dark:shadow-md dark:hover:border-primary/60",
        className
      )}
    >
      <CardHeader className="gap-4">
        {icon && (
          <CardAction>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
              aria-hidden
            >
              {icon}
            </span>
          </CardAction>
        )}
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-foreground/90">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
