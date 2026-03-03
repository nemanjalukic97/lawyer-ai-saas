import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { PricingCard } from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import { FEATURES, PRICING_TIERS } from "@/types";
import { SignupSuccessToast } from "@/components/SignupSuccessToast";

type HomePageProps = {
  searchParams?: {
    signup?: string;
  };
};

export default function Home({ searchParams }: HomePageProps) {
  const signupStatus = searchParams?.signup;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Legantis – AI legal assistant for Balkan lawyers
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Draft contracts, predict case outcomes, analyze documents, and
              manage clients—built for Bosnia & Herzegovina, Serbia, Croatia,
              Montenegro, and Slovenia.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Get started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-14 py-16 sm:py-24"
          aria-labelledby="features-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              id="features-heading"
              className="text-center text-2xl font-bold text-foreground sm:text-3xl"
            >
              Everything you need to work smarter
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              One platform for drafting, prediction, analysis, time tracking,
              and client collaboration.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <FeatureCard
                  key={f.id}
                  title={f.title}
                  description={f.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="scroll-mt-14 border-t border-border bg-muted/20 py-16 sm:py-24"
          aria-labelledby="pricing-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              id="pricing-heading"
              className="text-center text-2xl font-bold text-foreground sm:text-3xl"
            >
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              Choose the plan that fits your practice. All plans include core AI
              features.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PRICING_TIERS.map((tier) => (
                <PricingCard
                  key={tier.id}
                  name={tier.name}
                  price={tier.price}
                  features={tier.features}
                  ctaLabel="Get started"
                  recommended={tier.recommended}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {signupStatus === "success" && <SignupSuccessToast />}
    </div>
  );
}
