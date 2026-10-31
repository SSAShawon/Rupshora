const statistics = [
  {
    number: "120+",
    label: "Events Organized",
    detail: "Making change happen",
    symbol: "01",
  },
  {
    number: "850+",
    label: "Active Volunteers",
    detail: "People making a difference",
    symbol: "02",
  },
  {
    number: "25+",
    label: "Communities",
    detail: "Growing stronger together",
    symbol: "03",
  },
  {
    number: "2K+",
    label: "Lives Impacted",
    detail: "Small acts, lasting impact",
    symbol: "04",
  },
];

export default function ImpactStats() {
  return (
    <section className="bg-background px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              The Difference We Make
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Impact in <span className="text-primary">Numbers.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Every contribution matters. Together, our community is turning
            small acts of kindness into meaningful change.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/40"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                  {item.symbol}
                </span>

                <span className="h-2 w-2 rounded-full bg-primary/50" />
              </div>

              <h3 className="text-4xl font-bold tracking-tight text-primary">
                {item.number}
              </h3>

              <p className="mt-3 text-base font-semibold text-card-foreground">
                {item.label}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}