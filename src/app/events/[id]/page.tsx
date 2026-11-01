
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Suspense } from "react";

interface Participant {
  _id: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPhoto?: string;
  photoURL?: string;
  photoUrl?: string;
  image?: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorName: string;
  creatorEmail: string;
  creatorPhoto?: string;
}

interface EventResponse {
  success: boolean;
  event: Event;
  participants: Participant[];
  participantCount: number;
}

function EventDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [participantCount, setParticipantCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [joinMessage, setJoinMessage] = useState("");
  const [joinError, setJoinError] = useState("");

  // Fetch event details only after login verification.
  useEffect(() => {
    if (sessionLoading || !session?.user || !id) {
      return;
    }

    let isActive = true;

    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_RUPSHORA_BACKEND_URL}/api/events/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to load event details");
        }

        const data: EventResponse = await response.json();

        if (!isActive) return;

        setEvent(data.event);
        setParticipants(data.participants || []);
        setParticipantCount(data.participantCount || 0);
      } catch (error) {
        if (!isActive) return;

        console.error("Event details error:", error);
        setError("Unable to load this event. Please try again later.");
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchEventDetails();

    return () => {
      isActive = false;
    };
  }, [id, session?.user, sessionLoading]);

  const handleJoinEvent = async () => {
    setJoinMessage("");
    setJoinError("");

    if (!session?.user) {
      router.push("/login");
      return;
    }

    try {
      setJoining(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RUPSHORA_BACKEND_URL}/api/events/${id}/join`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Unable to join this event."
        );
      }

      const detailsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_RUPSHORA_BACKEND_URL}/api/events/${id}`
      );

      if (detailsResponse.ok) {
        const data: EventResponse = await detailsResponse.json();

        setEvent(data.event);
        setParticipants(data.participants || []);
        setParticipantCount(data.participantCount || 0);
      }

      setJoinMessage("You have successfully joined this event!");
    } catch (error) {
      console.error("Join event error:", error);

      setJoinError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setJoining(false);
    }
  };

  const isJoined = participants.some(
    (participant) => participant.userId === session?.user?.id
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Session Loading
  if (sessionLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <p className="text-sm text-muted-foreground">
          Checking your login session...
        </p>
      </main>
    );
  }

  // Login Required
  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Rupshora Community
          </p>

          <h1 className="mt-4 text-2xl font-bold">
            Login Required
          </h1>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Please login to view event details, discover volunteers,
            and participate in community activities.
          </p>

          <Link
            href={`/login?callbackURL=${encodeURIComponent(`/events/${id}`)}`}
            className="mt-7 inline-flex w-full justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Login Now
          </Link>

          <Link
            href="/events"
            className="mt-4 block text-sm text-muted-foreground hover:text-primary"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  // Event Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-background px-5 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-5 text-sm text-muted-foreground">
            Loading event details...
          </p>
        </div>
      </main>
    );
  }

  // Event Error
  if (error || !event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Event Not Found
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            {error || "This event does not exist."}
          </p>

          <Link
            href="/events"
            className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="mx-auto max-w-7xl px-1 pt-6 md:pt-10">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <span aria-hidden="true">←</span>
          Back to Events
        </Link>
      </div>

      {/* Hero Section */}
      <section className="px-4 pt-5 md:px-8 md:pt-6">
        <div
          className="relative mx-auto flex min-h-[420px] max-w-7xl items-end overflow-hidden rounded-3xl bg-cover bg-center md:min-h-[550px]"
          style={{
            backgroundImage: `url("${event.thumbnail}")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />

          <div className="relative z-10 w-full p-6 md:p-12">
            <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              {event.eventType}
            </span>

            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {event.title}
            </h1>

            <div className="mt-6 flex flex-col gap-4 text-sm text-white/90 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex items-center gap-2">
                <span className="text-lg">◷</span>
                <span>{formatDate(event.eventDate)}</span>
              </div>

              <div className="hidden h-5 w-px bg-white/40 sm:block" />

              <div className="flex items-center gap-2">
                <span className="text-lg">⌖</span>
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Participation Section */}
      <section className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-5 md:flex-row md:items-center md:p-7">
          <div>
            <p className="text-sm text-muted-foreground">
              Community participation
            </p>

            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-3xl font-bold text-foreground">
                {participantCount}
              </h2>

              <div>
                <p className="font-semibold text-card-foreground">
                  People Joined
                </p>
                <p className="text-xs text-muted-foreground">
                  Making a difference together
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <button
              type="button"
              onClick={handleJoinEvent}
              disabled={joining || sessionLoading || isJoined}
              className="w-full rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {joining
                ? "Joining..."
                : isJoined
                  ? "Already Joined ✓"
                  : "Join Event"}
            </button>

            <p className="text-xs text-muted-foreground">
              {isJoined
                ? "You are participating in this event."
                : "Be part of something meaningful."}
            </p>

            {joinMessage && (
              <p className="text-xs font-medium text-primary">
                {joinMessage}
              </p>
            )}

            {joinError && (
              <p className="text-xs font-medium text-destructive">
                {joinError}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* About Event */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Discover the Purpose
              </p>

              <h2 className="mt-3 text-2xl font-bold text-card-foreground">
                About This Event
              </h2>

              <p className="mt-5 whitespace-pre-line text-sm leading-8 text-muted-foreground">
                {event.description}
              </p>

              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-secondary/60 p-5">
                  <p className="text-xs text-muted-foreground">
                    Event Category
                  </p>
                  <p className="mt-2 font-semibold text-foreground">
                    {event.eventType}
                  </p>
                </div>

                <div className="rounded-xl bg-secondary/60 p-5">
                  <p className="text-xs text-muted-foreground">
                    Event Location
                  </p>
                  <p className="mt-2 font-semibold text-foreground">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Volunteer Guidelines */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Before You Participate
              </p>

              <h2 className="mt-3 text-2xl font-bold text-card-foreground">
                Volunteer Guidelines
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Help us make this event safe, organized, and meaningful for
                everyone.
              </p>

              <div className="mt-6 space-y-5">
                {[
                  {
                    number: "01",
                    title: "Be On Time",
                    description:
                      "Arrive at the event location on time and follow the organizer's instructions.",
                  },
                  {
                    number: "02",
                    title: "Respect Everyone",
                    description:
                      "Treat fellow volunteers, organizers, and community members with kindness.",
                  },
                  {
                    number: "03",
                    title: "Stay Responsible",
                    description:
                      "Follow safety instructions and take responsibility for your assigned activities.",
                  },
                  {
                    number: "04",
                    title: "Work Together",
                    description:
                      "Support other volunteers and help create a welcoming environment.",
                  },
                ].map((guideline) => (
                  <div key={guideline.number} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-bold text-primary">
                      {guideline.number}
                    </span>

                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        {guideline.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {guideline.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Organizer Profile */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The Person Behind It
              </p>

              <h2 className="mt-3 text-xl font-bold text-card-foreground">
                Event Organizer
              </h2>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-lg font-bold text-primary">
                  {event.creatorPhoto ? (
                    <div
                      role="img"
                      aria-label={event.creatorName}
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url("${event.creatorPhoto}")`,
                      }}
                    />
                  ) : (
                    getInitials(event.creatorName)
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-card-foreground">
                    {event.creatorName}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Event Creator
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">Organizer Email</p>
                <p className="mt-2 break-all text-sm text-card-foreground">
                  {event.creatorEmail}
                </p>
              </div>
            </div>

            {/* Volunteers List */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Our Community
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-card-foreground">
                    Volunteers
                  </h2>
                </div>

                <span className="rounded-full bg-secondary px-3 py-1.5 text-sm font-bold text-primary">
                  {participantCount}
                </span>
              </div>

              {participants.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {participants.map((participant, index) => {
                    const name =
                      participant.userName ||
                      participant.userEmail ||
                      "Volunteer";

                    const photo =
                      participant.userPhoto ||
                      participant.photoURL ||
                      participant.photoUrl ||
                      participant.image;

                    return (
                      <div
                        key={participant._id || index}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-xs font-bold text-primary">
                          {photo ? (
                            <div
                              role="img"
                              aria-label={name}
                              className="h-full w-full bg-cover bg-center"
                              style={{
                                backgroundImage: `url("${photo}")`,
                              }}
                            />
                          ) : (
                            getInitials(name)
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-card-foreground">
                            {name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Volunteer
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 rounded-xl bg-secondary/50 px-4 py-8 text-center">
                  <p className="text-2xl">♡</p>

                  <p className="mt-3 text-sm font-semibold text-card-foreground">
                    Be the First to Join!
                  </p>

                  <p className="mt-2 text-xs leading-6 text-muted-foreground">
                    No volunteers have joined this event yet. Be part of the
                    beginning of something meaningful.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p>Loading event details...</p>
        </main>
      }
    >
      <EventDetailsContent />
    </Suspense>
  );
}
