import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t("footer.taglineLine1")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("footer.taglineLine2")}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <a
                href="https://maps.google.com/?q=Karadjordjeva%2013%2C%20Ugljevik%2C%20Bosnia%20and%20Herzegovina"
                target="_blank"
                rel="noreferrer"
                className="w-fit transition-colors hover:text-foreground"
              >
                Karadjordjeva 13, Ugljevik, Bosnia and Herzegovina
              </a>
              <a
                href="tel:+38766081218"
                className="w-fit transition-colors hover:text-foreground"
              >
                +38766081218
              </a>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/refund"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Refund Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("footer.terms")}
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
