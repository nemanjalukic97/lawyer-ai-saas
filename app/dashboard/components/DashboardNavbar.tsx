"use client"

import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/components/LanguageProvider"
import { HamburgerIcon } from "@/components/HamburgerIcon"
import { NavbarBrand } from "@/components/NavbarBrand"
import { useSidebar } from "./SidebarProvider"

const pillButtonClass = "rounded-full"

export function DashboardNavbar() {
  const { t } = useLanguage()
  const { open, toggle } = useSidebar()

  return (
    <nav className="relative mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between rounded-full border border-border bg-card px-4 py-1 shadow-md sm:px-6 max-[479px]:px-3">
      <NavbarBrand href="/" />

      <div className="hidden items-center gap-3 min-[992px]:flex">
        <LanguageSwitcher />
        <form action="/auth/signout" method="post">
          <Button type="submit" variant="outline" size="sm" className={pillButtonClass}>
            {t("nav.logout")}
          </Button>
        </form>
      </div>

      <div className="flex items-center gap-2 min-[992px]:hidden">
        <LanguageSwitcher />
        <form action="/auth/signout" method="post">
          <Button type="submit" variant="outline" size="sm" className={pillButtonClass}>
            {t("nav.logout")}
          </Button>
        </form>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={pillButtonClass}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggle}
        >
          <HamburgerIcon open={open} />
        </Button>
      </div>
    </nav>
  )
}
