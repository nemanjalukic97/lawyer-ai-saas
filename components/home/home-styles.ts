export const SCROLL_REVEAL_TRANSITION =
  "motion-safe:transition-[opacity,transform] motion-safe:duration-[550ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]"

export const HERO_REVEAL_TRANSITION =
  "motion-safe:transition-[opacity,transform] motion-safe:duration-[900ms] motion-safe:ease-out"

export const NAV_REVEAL_TRANSITION =
  "motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-out"

export const HOME_ENTRANCE_NAV_DELAY_MS = 100
export const HOME_ENTRANCE_HERO_DELAY_MS = 150
export const HOME_ENTRANCE_MOCKUP_DELAY_AFTER_HERO_MS = 400

export const STAGGER_MS_10 = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

export const STAGGER_MS_3 = [0, 100, 200] as const

export const HOME_SECTION_H2_CLASS =
  "text-3xl font-bold tracking-tight sm:text-4xl"

export const HOME_HEADING_CLASS =
  "mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"

export const HOME_SUBTITLE_CLASS = "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"

export const HERO_GRID_BACKGROUND = {
  backgroundImage: `linear-gradient(rgba(27,79,216,0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(27,79,216,0.10) 1px, transparent 1px)`,
  backgroundSize: "60px 60px",
} as const
