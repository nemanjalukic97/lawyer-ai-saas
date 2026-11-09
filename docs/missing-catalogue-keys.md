# Catalogue keys

The six catalogues (`en`, `sr`, `bs`, `hr`, `sl`, `me`) are required to carry the same key set.

`lib/i18n/catalogueKeys.test.ts` is the gate. A missing key is no longer printed as itself: lookup tries the requested language, then Serbian, then English, and only then the dotted key.

Run: `npx tsx --test lib/i18n/catalogueKeys.test.ts`
