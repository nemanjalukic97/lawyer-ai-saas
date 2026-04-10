import Link from "next/link"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import { LegantisLogo } from "@/components/LegantisLogo"

const linkClassName =
  "flex min-w-0 items-center gap-[1px] rounded-md py-1 pr-1 text-lg font-semibold tracking-tight text-foreground outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"

const logoClassName = "h-8 w-8 shrink-0 text-foreground"

type NavbarBrandProps = {
  href: string
  onClick?: ComponentProps<typeof Link>["onClick"]
  className?: string
}

export function NavbarBrand({ href, onClick, className }: NavbarBrandProps) {
  return (
    <Link
      href={href}
      className={cn(linkClassName, className)}
      onClick={onClick}
    >
      <LegantisLogo className={logoClassName} />
      <span className="leading-none">Legantis</span>
    </Link>
  )
}
