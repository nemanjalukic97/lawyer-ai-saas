import type { LanguageCode, Messages } from '@/lib/i18n/types'
import { enMessages } from './en'
import { srMessages } from './sr'
import { bsMessages } from './bs'
import { hrMessages } from './hr'
import { slMessages } from './sl'
import { meMessages } from './me'

export const MESSAGES: Record<LanguageCode, Messages> = {
  en: enMessages,
  sr: srMessages,
  bs: bsMessages,
  hr: hrMessages,
  sl: slMessages,
  me: meMessages,
}
