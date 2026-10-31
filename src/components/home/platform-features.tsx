const features = [
  {
    number: "01",
    title: "Discover Events",
    description:
      "Find upcoming volunteering events and discover opportunities to make a difference.",
    icon: "⌕",
  },
  {
    number: "02",
    title: "Join Community",
    description:
      "Connect with passionate people and participate in meaningful activities.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Create Events",
    description:
      "Organize your own community events and bring people together for a good cause.",
    icon: "+",
  },
  {
    number: "04",
    title: "Manage Activities",
    description:
      "View and manage the events you have created or joined.",
    icon: "◎",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="bg-secondary/40 px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Platform Features
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything You Need to{" "}
            <span className="text-primary">Make an Impact.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            A simple platform to discover opportunities, connect with people,
            and create positive change in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-7 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl font-semibold text-primary">
                  {feature.icon}
                </div>

                <span className="text-xs font-semibold text-muted-foreground">
                  {feature.number}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}