
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorName: string;
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_RUPSHORA_BACKEND_URL}/api/events/featured`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching featured events:", error);
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvents();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">
              Loading upcoming events...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center">
            <h3 className="text-lg font-semibold text-card-foreground">
              No Upcoming Events
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              There are no upcoming events at the moment. Please check back
              later.
            </p>
          </div>
        )}

        {/* Event Cards */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* Event Image */}
                <div
                  role="img"
                  aria-label={event.title}
                  className="h-52 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${event.thumbnail}")`,
                  }}
                />

                {/* Event Information */}
                <div className="p-5">
                  <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                    {event.eventType}
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
                      {formatDate(event.eventDate)}
                    </p>
                  </div>

                  {/* Creator and Details Button */}
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Created by
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-card-foreground">
                        {event.creatorName}
                      </p>
                    </div>

                    <Link
                      href={`/events/${event._id}`}
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
        )}

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
