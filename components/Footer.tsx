import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("footer.taglineLine1")} {t("footer.taglineLine2")}
            </p>
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

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t("footer.product")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/#features"
                  className="transition-colors hover:text-foreground"
                >
                  {t("nav.features")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="transition-colors hover:text-foreground"
                >
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="transition-colors hover:text-foreground"
                >
                  {t("footer.faqLink")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t("footer.legal")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-foreground"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-foreground"
                >
                  {t("footer.termsOfService")}
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="transition-colors hover:text-foreground"
                >
                  {t("footer.refundPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t("footer.contact")}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              <a
                href="mailto:support@legantis.app"
                className="transition-colors hover:text-foreground"
              >
                {t("footer.supportEmail")}
              </a>
            </p>
          </div>
        </div>

        <p className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Legantis. {t("footer.rights")}.
        </p>
      </div>
    </footer>
  );
}
