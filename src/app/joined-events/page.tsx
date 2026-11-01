"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface JoinedEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorName: string;
  joinedAt?: string;
}

export default function JoinedEventsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionLoading) return;

    if (!session?.user) {
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.RUPSHORA_BACKEND_URL}/api/events/joined-events`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch joined events");
        }

        const data = await response.json();

        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch (error) {
        console.error("Joined events error:", error);
        setError("Unable to load your joined events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [session, sessionLoading]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (sessionLoading || (session?.user && loading)) {
    return (
      <main className="min-h-screen bg-background px-5 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <p className="mt-5 text-sm text-muted-foreground">
            Loading your joined events...
          </p>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-4xl">♡</p>

          <h1 className="mt-5 text-2xl font-bold text-card-foreground">
            Login Required
          </h1>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Please login to see the events you have joined.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/85"
          >
            Login Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Your Community Journey
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Joined <span className="text-primary">Events.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Keep track of the volunteering events you have joined and continue
            making a positive impact in your community.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-border bg-card px-5 py-12 text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && events.length === 0 && (
          <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center">
            <p className="text-5xl">♡</p>

            <h2 className="mt-5 text-xl font-semibold text-card-foreground">
              No Joined Events Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              You have not joined any volunteering events yet. Explore upcoming
              opportunities and become part of something meaningful.
            </p>

            <Link
              href="/events"
              className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/85"
            >
              Explore Events →
            </Link>
          </div>
        )}

        {/* Events Grid */}
        {!error && events.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                You have joined{" "}
                <span className="font-semibold text-foreground">
                  {events.length}
                </span>{" "}
                events
              </p>

              <Link
                href="/events"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Explore More →
              </Link>
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

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
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
                          Organized by
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-card-foreground">
                          {event.creatorName}
                        </p>
                      </div>

                      <Link
                        href={`/events/${event._id}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/85"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
