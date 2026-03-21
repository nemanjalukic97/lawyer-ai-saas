import { cn } from "@/lib/utils"

export function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-[18px] w-5" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out",
          open ? "top-2 rotate-45" : "top-0 rotate-0"
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ease-out",
          open ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out",
          open ? "top-2 -rotate-45" : "top-4 rotate-0"
        )}
      />
    </span>
  )
}
