import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("footer.terms")}
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("footer.contact")}
            </Link>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Legantis. {t("footer.rights")}.
        </p>
      </div>
    </footer>
  );
}
