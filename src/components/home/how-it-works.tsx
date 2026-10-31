
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Discover Opportunities",
    description:
      "Explore upcoming volunteering events and find opportunities that match your interests.",
    icon: "⌕",
  },
  {
    number: "02",
    title: "Join an Event",
    description:
      "Choose an event that inspires you and become part of a community working for change.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Take Action",
    description:
      "Show up, contribute your time and skills, and make a meaningful difference.",
    icon: "✳",
  },
  {
    number: "04",
    title: "Create Impact",
    description:
      "Celebrate your contribution and inspire others to make their communities better.",
    icon: "♡",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-background px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Your Journey Starts Here
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            How It <span className="text-primary">Works.</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
            Making a difference does not have to be complicated.
            Follow four simple steps and become a part of something meaningful.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="relative rounded-2xl border border-border bg-card p-7"
            >
              {/* Step Number */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-widest text-primary">
                  STEP {step.number}
                </span>

                <span className="text-sm text-muted-foreground">
                  0{index + 1} / 04
                </span>
              </div>

              {/* Icon */}
              <div className="mt-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl text-primary">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="mt-7 text-lg font-semibold text-card-foreground">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-8 h-1 w-12 rounded-full bg-primary/70" />
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl bg-secondary/60 px-6 py-10 text-center md:px-10">
          <h3 className="text-2xl font-bold text-foreground md:text-3xl">
            Ready to Make a Difference?
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            Your time, kindness, and effort can create a positive impact.
            Start your volunteering journey with Rupshora today.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Explore Events
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl border border-primary px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Join Rupshora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
