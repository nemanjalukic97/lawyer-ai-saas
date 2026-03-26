import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  name: string
  price: number
  features: readonly string[]
  ctaLabel: string
  recommended?: boolean
  planId: "solo" | "professional" | "firm"
}

export function PricingCard({
  name,
  price,
  features,
  ctaLabel,
  recommended = false,
  planId,
}: PricingCardProps) {
  const href = `/signup?plan=${encodeURIComponent(planId)}`

  return (
    <Card
      className={cn(
        "mx-auto w-full min-h-[382px] min-[425px]:max-[639px]:w-[90%] min-[640px]:max-[766px]:w-3/4 min-[767px]:min-h-0 min-[767px]:w-full flex flex-col transition-colors dark:border-primary/40 dark:bg-[linear-gradient(155deg,rgba(88,123,198,0.14)_0%,rgba(47,69,114,0.56)_2.5%,rgba(26,38,61,0.96)_24%,rgba(14,21,36,1)_100%)] dark:shadow-md dark:hover:border-primary/60",
        recommended && "border-primary shadow-md ring-1 ring-primary/20"
      )}
    >
      <CardHeader>
        {recommended && (
          <span className="mb-1 w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Recommended
          </span>
        )}
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <span className="text-2xl font-semibold text-foreground">
            €{price}
          </span>
          <span className="text-muted-foreground">/month</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2 text-sm text-muted-foreground dark:text-white">
          {features.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant={recommended ? "default" : "outline"}
          className="w-full"
        >
          <Link href={href}>{ctaLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
