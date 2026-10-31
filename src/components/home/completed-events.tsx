
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface CompletedEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  participantsCount?: number;
}

interface EventsResponse {
  success: boolean;
  events: CompletedEvent[];
}

export default function CompletedEvents() {
  const [completedEvents, setCompletedEvents] = useState<CompletedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompletedEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/events/completed"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch completed events");
        }

        const data: EventsResponse = await response.json();

        if (data.success) {
          setCompletedEvents(data.events);
        } else {
          throw new Error("Could not load completed events");
        }
      } catch (err) {
        console.error("Completed Events Error:", err);
        setError("Unable to load completed events.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedEvents();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            Loading completed events...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-border bg-card px-5 py-10 text-center">
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && completedEvents.length === 0 && (
          <div className="rounded-xl border border-border bg-card px-5 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              No completed events available yet.
            </p>
          </div>
        )}

        {/* Completed Event Cards */}
        {!loading && !error && completedEvents.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {completedEvents.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* Event Image */}
                <div className="relative">
                  <div
                    role="img"
                    aria-label={event.title}
                    className="h-52 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${event.thumbnail}")`,
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
                    {event.eventType}
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
                      {formatDate(event.eventDate)}
                    </p>
                  </div>

                  {/* Participants */}
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Participation
                      </p>

                      <p className="mt-1 text-sm font-semibold text-card-foreground">
                        {event.participantsCount ?? 0} Volunteers
                      </p>
                    </div>

                    
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
