"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"

import DashboardMockup from "@/components/DashboardMockup"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { useLanguage, type LanguageCode } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"

import {
  HERO_GRID_BACKGROUND,
  HERO_REVEAL_TRANSITION,
  HOME_ENTRANCE_HERO_DELAY_MS,
  HOME_ENTRANCE_MOCKUP_DELAY_AFTER_HERO_MS,
  HOME_ENTRANCE_NAV_DELAY_MS,
  HOME_HEADING_CLASS,
  HOME_SUBTITLE_CLASS,
  NAV_REVEAL_TRANSITION,
} from "@/components/home/home-styles"

const SignupSuccessToast = dynamic(
  () => import("@/components/SignupSuccessToast").then((m) => ({ default: m.SignupSuccessToast })),
  { ssr: false }
)

type Props = {
  children?: ReactNode
  signupStatus?: string
  initialSignedIn?: boolean
}

function renderHeroTitle(title: string, language: LanguageCode) {
  if (language === "en") return title

  const sentenceBreak = title.indexOf(". ")
  if (sentenceBreak === -1) return title

  return (
    <>
      {title.slice(0, sentenceBreak + 1)}
      <br />
      {title.slice(sentenceBreak + 2)}
    </>
  )
}

export function HomeClient({ children, signupStatus, initialSignedIn }: Props) {
  const { t, language } = useLanguage()
  const [signedIn, setSignedIn] = useState(() => Boolean(initialSignedIn))
  const [navRevealed, setNavRevealed] = useState(false)
  const [heroRevealed, setHeroRevealed] = useState(false)
  const [heroAnimating, setHeroAnimating] = useState(false)
  const [mockupRevealed, setMockupRevealed] = useState(false)
  const [mockupVisible, setMockupVisible] = useState(false)
  const heroSectionRef = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const [heroZoneHeight, setHeroZoneHeight] = useState(0)

  const measureHeroZone = useCallback(() => {
    const hero = heroSectionRef.current
    const main = mainRef.current
    if (!hero || !main) return

    const mainTop = main.getBoundingClientRect().top + window.scrollY
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY
    setHeroZoneHeight(Math.ceil(heroBottom - mainTop))
  }, [])

  useLayoutEffect(() => {
    measureHeroZone()
  }, [measureHeroZone, mockupRevealed])

  useEffect(() => {
    const hero = heroSectionRef.current
    if (!hero) return

    const resizeObserver = new ResizeObserver(measureHeroZone)
    resizeObserver.observe(hero)
    window.addEventListener("resize", measureHeroZone)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", measureHeroZone)
    }
  }, [measureHeroZone])

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    void import("@/lib/supabase/client").then(({ createClient }) => {
      const supabase = createClient()
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSignedIn(Boolean(session?.user))
      })
      unsubscribe = () => subscription.unsubscribe()
    })

    return () => unsubscribe?.()
  }, [])

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setNavRevealed(true)
      setHeroRevealed(true)
      setMockupRevealed(true)
      setMockupVisible(true)
      return
    }

    const navTimer = window.setTimeout(() => setNavRevealed(true), HOME_ENTRANCE_NAV_DELAY_MS)

    const heroTimer = window.setTimeout(() => {
      setHeroRevealed(true)
      setHeroAnimating(true)
    }, HOME_ENTRANCE_HERO_DELAY_MS)

    return () => {
      window.clearTimeout(navTimer)
      window.clearTimeout(heroTimer)
    }
  }, [])

  useEffect(() => {
    if (!heroRevealed) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setMockupRevealed(true)
      return
    }

    const mockupTimer = window.setTimeout(
      () => setMockupRevealed(true),
      HOME_ENTRANCE_MOCKUP_DELAY_AFTER_HERO_MS
    )

    return () => window.clearTimeout(mockupTimer)
  }, [heroRevealed])

  useEffect(() => {
    if (!mockupRevealed) {
      setMockupVisible(false)
      return
    }

    const frame = requestAnimationFrame(() => setMockupVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [mockupRevealed])

  return (
    <div className="relative flex flex-col overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute" style={{ left: "-180px", top: "1800px", zIndex: 0 }}>
        <div
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: "1px solid rgba(27,79,216,0.20)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div
          style={{
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            border: "1px solid rgba(27,79,216,0.14)",
            position: "absolute",
            top: "80px",
            left: "80px",
          }}
        />
        <div
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(27,79,216,0.07) 0%, transparent 70%)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute" style={{ right: "-150px", top: "2800px", zIndex: 0 }}>
        <div
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            border: "1px solid rgba(27,79,216,0.17)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div
          style={{
            width: "270px",
            height: "270px",
            borderRadius: "50%",
            border: "1px solid rgba(27,79,216,0.12)",
            position: "absolute",
            top: "65px",
            left: "65px",
          }}
        />
        <div
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(27,79,216,0.06) 0%, transparent 70%)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute" style={{ left: "-100px", top: "3800px", zIndex: 0 }}>
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "1px solid rgba(27,79,216,0.14)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: "1px solid rgba(27,79,216,0.10)",
            position: "absolute",
            top: "50px",
            left: "50px",
          }}
        />
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(27,79,216,0.05) 0%, transparent 70%)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "200px",
          transform: "translateX(-50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(27,79,216,0.12) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <main ref={mainRef} className="relative z-10 flex-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 bg-background min-[992px]:bg-muted/20"
          style={{ height: heroZoneHeight > 0 ? heroZoneHeight : "100dvh" }}
        >
          <div className="absolute inset-0 max-md:opacity-40" style={HERO_GRID_BACKGROUND} />
        </div>

        <div
          className={cn(
            "sticky top-0 z-50 isolate bg-background px-3 pt-3 sm:px-6 min-[992px]:bg-transparent",
            NAV_REVEAL_TRANSITION,
            !navRevealed && "motion-safe:-translate-y-2 motion-safe:opacity-0",
            navRevealed && "motion-safe:translate-y-0 motion-safe:opacity-100"
          )}
        >
          <Header initialSignedIn={initialSignedIn} />
        </div>

        <section
          ref={heroSectionRef}
          className="relative z-10 flex min-h-[calc(100dvh-4.25rem)] flex-col overflow-hidden border-b border-border max-md:[contain:paint]"
        >
          <div className="relative z-10 flex flex-1 flex-col justify-center py-16 sm:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-[50px] md:block"
            />
            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
              <div
                className={cn(
                  HERO_REVEAL_TRANSITION,
                  !heroRevealed && "motion-safe:translate-y-6 motion-safe:opacity-0",
                  heroRevealed && "motion-safe:translate-y-0 motion-safe:opacity-100",
                  heroAnimating && "motion-safe:will-change-[opacity,transform]"
                )}
                onTransitionEnd={(event) => {
                  if (event.target !== event.currentTarget) return
                  if (event.propertyName === "opacity" || event.propertyName === "transform") {
                    setHeroAnimating(false)
                  }
                }}
              >
                <div className="flex justify-center">
                  <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                    {t("home.hero.trustBadge")}
                  </span>
                </div>
                <h1 className={cn(HOME_HEADING_CLASS, "text-foreground")}>
                  {renderHeroTitle(t("home.hero.title"), language)}
                </h1>
                <p className={HOME_SUBTITLE_CLASS}>
                  {t("home.hero.subtitle")}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Button asChild size="lg" className="h-11 min-w-[200px] text-base sm:h-11 sm:text-sm">
                    {signedIn ? (
                      <Link href="/dashboard">{t("nav.dashboard")}</Link>
                    ) : (
                      <Link href="/signup">{t("home.hero.getStartedFree")}</Link>
                    )}
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-11 min-w-[200px] text-base sm:h-11 sm:text-sm"
                  >
                    <Link href="#pricing">{t("home.hero.pricingCta")}</Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{t("home.hero.noCreditCard")}</p>
              </div>

              <div
                className="mt-[68px] mx-auto max-w-4xl rotate-0 sm:rotate-1"
                style={{
                  transformOrigin: "center center",
                  transition: "transform 0.08s ease-out",
                }}
                onMouseMove={(e) => {
                  if (!mockupVisible || window.innerWidth < 768) return
                  const el = e.currentTarget
                  el.style.transition = "transform 0.08s ease-out"
                  const rect = el.getBoundingClientRect()
                  const x = (e.clientX - rect.left) / rect.width - 0.5
                  const y = (e.clientY - rect.top) / rect.height - 0.5
                  el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) rotate(1deg)`
                }}
                onMouseLeave={(e) => {
                  if (!mockupVisible || window.innerWidth < 768) return
                  const el = e.currentTarget
                  el.style.transition = "transform 0.4s ease-out"
                  el.style.transform = ""
                }}
              >
                <div className="relative aspect-[16/10] w-full">
                  {mockupRevealed && (
                    <div
                      className={cn(
                        HERO_REVEAL_TRANSITION,
                        !mockupVisible && "motion-safe:translate-y-8 motion-safe:opacity-0",
                        mockupVisible && "motion-safe:translate-y-0 motion-safe:opacity-100"
                      )}
                    >
                      <DashboardMockup />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {children}
      </main>

      {signupStatus === "success" && <SignupSuccessToast />}
    </div>
  )
}
