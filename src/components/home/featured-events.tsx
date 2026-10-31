
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Community Tree Plantation",
    category: "Environment",
    date: "November 08, 2026",
    location: "Khulna, Bangladesh",
    creator: "Sarder Shawon",
    description:
      "Join us in planting trees and creating a greener, healthier environment for our community.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
  },
  {
    id: 2,
    title: "Clean Our City Campaign",
    category: "Cleanliness",
    date: "November 12, 2026",
    location: "Dhaka, Bangladesh",
    creator: "Rahim Ahmed",
    description:
      "Come together to clean public spaces and make our city a better place to live.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15?w=800",
  },
  {
    id: 3,
    title: "Food for Everyone",
    category: "Donation",
    date: "November 15, 2026",
    location: "Khulna, Bangladesh",
    creator: "Nusrat Jahan",
    description:
      "Help distribute food packages to families who need support in our community.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
  },
  {
    id: 4,
    title: "Help the Community",
    category: "Community",
    date: "November 19, 2026",
    location: "Jessore, Bangladesh",
    creator: "Tanvir Hasan",
    description:
      "Support local families through a day of volunteering and community service.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
  },
  {
    id: 5,
    title: "Save the Green Earth",
    category: "Environment",
    date: "November 23, 2026",
    location: "Dhaka, Bangladesh",
    creator: "Ayesha Rahman",
    description:
      "Take part in protecting nature and spreading environmental awareness.",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
  },
  {
    id: 6,
    title: "Support Those in Need",
    category: "Social Support",
    date: "November 28, 2026",
    location: "Khulna, Bangladesh",
    creator: "Imran Hossain",
    description:
      "Make a difference by supporting people facing difficult circumstances.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
  },
];

export default function FeaturedEvents() {
  return (
    <section className="bg-background px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Make an Impact
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Upcoming{" "}
              <span className="text-primary">Opportunities.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Find an opportunity to make a difference. Join an event
              and become part of something meaningful.
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

        {/* Event Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              {/* Event Image */}
              <div
                role="img"
                aria-label={event.title}
                className="h-52 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${event.image}")`,
                }}
              />

              {/* Event Information */}
              <div className="p-5">
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {event.category}
                </span>

                <h3 className="mt-3 text-lg font-semibold text-card-foreground">
                  {event.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {event.description}
                </p>

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

                {/* Creator and Details Button */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Created by
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-card-foreground">
                      {event.creator}
                    </p>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/85"
                  >
                    View Details
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Explore All Button */}
        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-lg border border-primary px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Explore All Events
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
