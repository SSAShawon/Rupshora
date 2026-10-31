
import Link from "next/link";

const completedEvents = [
  {
    id: 1,
    title: "Community Tree Plantation",
    category: "Environment",
    date: "October 12, 2026",
    location: "Khulna, Bangladesh",
    participants: "45 Volunteers",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
  },
  {
    id: 2,
    title: "Clean Our City Campaign",
    category: "Cleanliness",
    date: "October 05, 2026",
    location: "Dhaka, Bangladesh",
    participants: "60 Volunteers",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15?w=800",
  },
  {
    id: 3,
    title: "Food for Everyone",
    category: "Donation",
    date: "September 25, 2026",
    location: "Khulna, Bangladesh",
    participants: "35 Volunteers",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
  },
];

export default function CompletedEvents() {
  return (
    <section className="bg-secondary/30 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Past Activities
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Stories of <span className="text-primary">Impact.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Every completed event represents people coming together
              to create positive change in their communities.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/75"
          >
            Explore All Events
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Completed Event Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {completedEvents.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              {/* Event Image */}
              <div className="relative">
                <div
                  role="img"
                  aria-label={event.title}
                  className="h-52 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${event.image}")`,
                  }}
                />

                {/* Completed Badge */}
                <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#10090D]/85 px-3 py-1.5 text-xs font-semibold text-[#E8A0B2] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8A0B2]" />
                  Completed
                </span>
              </div>

              {/* Event Information */}
              <div className="p-5">
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {event.category}
                </span>

                <h3 className="mt-3 text-lg font-semibold text-card-foreground">
                  {event.title}
                </h3>

                {/* Date and Location */}
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="text-primary">⌖</span>
                    {event.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <span className="text-primary">◷</span>
                    {event.date}
                  </p>
                </div>

                {/* Participants */}
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Participation
                    </p>

                    <p className="mt-1 text-sm font-semibold text-card-foreground">
                      {event.participants}
                    </p>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    View Details
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
