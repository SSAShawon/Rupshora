"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

interface EventForm {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

const API_URL = "http://localhost:5000/api/events";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Healthcare",
  "Community Service",
  "Other",
];

const emptyForm: EventForm = {
  title: "",
  description: "",
  eventType: "",
  thumbnail: "",
  location: "",
  eventDate: "",
};

function getLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventForm>(emptyForm);
  const [editError, setEditError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  // Fetch user's events
  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      return;
    }

    let active = true;

    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/my-events`, {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load events.");
        }

        if (active) {
          setEvents(result.events || []);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Something went wrong.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      active = false;
    };
  }, [isPending, session?.user?.id]);

  // Open edit form
  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setEditError("");
    setSuccess("");

    setFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: event.eventDate.slice(0, 10),
    });
  };

  // Form input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update event
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingEvent) return;

    setEditError("");

    if (formData.title.trim().length < 5) {
      setEditError("Title must contain at least 5 characters.");
      return;
    }

    if (formData.description.trim().length < 20) {
      setEditError("Description must contain at least 20 characters.");
      return;
    }

    if (!formData.eventType) {
      setEditError("Please select an event category.");
      return;
    }

    if (formData.eventDate <= getLocalDate()) {
      setEditError("Please select a future event date.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/${editingEvent._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          eventType: formData.eventType,
          thumbnail: formData.thumbnail.trim(),
          location: formData.location.trim(),
          eventDate: formData.eventDate,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event.");
      }

      setEvents((previous) =>
        previous.map((event) =>
          event._id === editingEvent._id ? { ...event, ...formData } : event,
        ),
      );

      setEditingEvent(null);
      setFormData(emptyForm);
      setSuccess("Event updated successfully!");
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : "Failed to update event.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete event
  const handleDelete = async (event: Event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(event._id);
      setSuccess("");
      setError("");

      const response = await fetch(`${API_URL}/${event._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event.");
      }

      setEvents((previous) =>
        previous.filter((item) => item._id !== event._id),
      );

      setSuccess("Event deleted successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event.");
    } finally {
      setDeletingId("");
    }
  };

  // Loading state
  if (isPending || (session?.user && loading)) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            Loading your events...
          </p>
        </div>
      </main>
    );
  }

  // Login required
  if (!session?.user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-5">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-foreground">Login Required</h1>
          <p className="mt-3 text-muted-foreground">
            Please login to manage your events.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-white"
          >
            Login Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Your Activities
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">Manage Events</h1>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Manage the community events you have created.
            </p>
          </div>

          <Link
            href="/create-event"
            className="w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            + Create New Event
          </Link>
        </div>

        {/* Success */}
        {success && (
          <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Event Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Your created events</p>

          <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold">
            {events.length} Events
          </span>
        </div>

        {/* Empty State */}
        {events.length === 0 && !error && (
          <div className="rounded-3xl border border-border bg-card px-6 py-20 text-center">
            <div className="mb-5 text-5xl">◎</div>

            <h2 className="text-2xl font-bold">No Events Yet</h2>

            <p className="mt-3 text-muted-foreground">
              You have not created any events yet.
            </p>

            <Link
              href="/create-event"
              className="mt-7 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-white"
            >
              Create Your First Event
            </Link>
          </div>
        )}

        {/* Events Grid */}
        {events.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-52 w-full bg-secondary">
                  {event.thumbnail ? (
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      No Image Available
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-primary">
                    {event.eventType}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold">{event.title}</h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm text-muted-foreground">
                    <p>
                      <span className="mr-2 text-primary">⌖</span>
                      {event.location}
                    </p>

                    <p>
                      <span className="mr-2 text-primary">◷</span>
                      {formatDate(event.eventDate)}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(event)}
                      className="flex-1 rounded-full border border-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
                    >
                      Edit Event
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(event)}
                      disabled={deletingId === event._id}
                      className="flex-1 rounded-full border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50"
                    >
                      {deletingId === event._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-4 block text-center text-sm font-semibold text-muted-foreground hover:text-primary"
                  >
                    View Event Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
          <div className="my-auto w-full max-w-2xl rounded-3xl border border-border bg-background p-6 shadow-2xl sm:p-8">
            <div className="mb-7 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Update Information
                </p>
                <h2 className="mt-2 text-2xl font-bold">Edit Event</h2>
              </div>

              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xl"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Event Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  minLength={5}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  minLength={20}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Event Category
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary"
                  >
                    <option value="">Select category</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    min={getLocalDate()}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Location
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              {editError && (
                <p className="rounded-xl bg-red-500/5 p-3 text-sm text-red-600">
                  {editError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
