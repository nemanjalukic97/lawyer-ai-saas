export const SCROLL_REVEAL_TRANSITION =
  "motion-safe:transform-gpu motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out"

export const HERO_REVEAL_TRANSITION =
  "motion-safe:transform-gpu motion-safe:transition-[opacity,transform] motion-safe:duration-[900ms] motion-safe:ease-out"

export const STAGGER_MS_10 = [0, 75, 150, 225, 300, 375, 450, 525, 600, 675] as const

export const STAGGER_MS_3 = [0, 150, 300] as const

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
