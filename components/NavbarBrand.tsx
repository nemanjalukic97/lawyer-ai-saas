import Link from "next/link"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import { LegantisLogo } from "@/components/LegantisLogo"

const linkClassName =
  "flex min-w-0 items-center gap-0 rounded-md py-1 pr-1 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"

const logoClassName = "h-[52px] w-[52px] shrink-0 text-white sm:h-14 sm:w-14"

type NavbarBrandProps = {
  href: string
  onClick?: ComponentProps<typeof Link>["onClick"]
  className?: string
}

export function NavbarBrand({ href, onClick, className }: NavbarBrandProps) {
  return (
    <Link
      href={href}
      aria-label="Legantis - AI Legal Assistant"
      className={cn(linkClassName, className)}
      onClick={onClick}
    >
      <LegantisLogo className={logoClassName} />
      <span className="-ml-2 flex min-w-0 flex-col leading-none">
        <span className="text-xs font-semibold tracking-tight text-white sm:text-[13px]">
          Legantis
        </span>
        <span className="mt-0.5 text-[10px] font-light tracking-normal text-white/85 sm:text-[11px]">
          AI Legal Assistant
        </span>
      </span>
    </Link>
  )
}
