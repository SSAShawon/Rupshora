
import CompletedEvents from "@/components/home/completed-events";
import FeaturedEvents from "@/components/home/featured-events";
import HowItWorks from "@/components/home/how-it-works";
import ImpactStats from "@/components/home/impact-stats";
import Newsletter from "@/components/home/newsletter";
import PlatformFeatures from "@/components/home/platform-features";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#10090D] md:min-h-[720px]">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-background.jpg')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10090D] via-[#10090D]/85 to-[#10090D]/25" />

        {/* Additional Bottom Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10090D]/60 via-transparent to-[#10090D]/20" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 md:px-8">

          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E8A0B2]/40 bg-[#512536]/40 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#E8A0B2]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F3C5D1]">
                Together, We Make a Difference
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-[1.12] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Small Acts,
              <br />
              <span className="text-[#E8A0B2]">
                Greater Impact.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-8 text-white/75 md:text-lg">
              Real change begins with small acts of kindness. Join a
              community of passionate people and make a meaningful
              difference, one action at a time.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#B85F79] px-7 py-4 text-sm font-semibold text-white hover:bg-[#A64E69]"
              >
                Explore Events
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-white/10 px-7 py-4 text-sm font-semibold text-white hover:bg-white/20"
              >
                Become a Volunteer
              </Link>

            </div>

            {/* Trust Indicator */}
            <div className="mt-12 flex items-center gap-4">

              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#29151E] bg-[#873C56] text-sm font-semibold text-white">
                  V
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#29151E] bg-[#B85F79] text-sm font-semibold text-white">
                  C
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#29151E] bg-[#E8A0B2] text-sm font-semibold text-[#29151E]">
                  +
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Be Part of Something Meaningful
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Every small action counts.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

          <ImpactStats/>
          <PlatformFeatures/>
          <FeaturedEvents/>
          <CompletedEvents/>
          <Newsletter/>
          <HowItWorks/>
    </main>
  );
}
