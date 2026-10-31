
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

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-background px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Be Part of Something Meaningful
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Upcoming <span className="text-primary">Events.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Discover volunteering opportunities, connect with your
            community, and make a positive impact together.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
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
          <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center">
            <h2 className="text-xl font-semibold text-card-foreground">
              No Upcoming Events
            </h2>

            <p className="mt-3 text-sm text-muted-foreground">
              There are no upcoming events at the moment. Please check back
              later.
            </p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {events.length}
                </span>{" "}
                upcoming events
              </p>
            </div>

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

                    <h2 className="mt-3 text-lg font-semibold text-card-foreground">
                      {event.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {event.description}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <p>
                        <span className="mr-2 text-primary">⌖</span>
                        {event.location}
                      </p>

                      <p>
                        <span className="mr-2 text-primary">◷</span>
                        {formatDate(event.eventDate)}
                      </p>
                    </div>

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
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/85"
                      >
                        View Details
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
