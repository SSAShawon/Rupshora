
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function CreateEventPage() {
  const router = useRouter();

  const { data: session, isPending: sessionPending } =
    authClient.useSession();

  const [minEventDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return [
      tomorrow.getFullYear(),
      String(tomorrow.getMonth() + 1).padStart(2, "0"),
      String(tomorrow.getDate()).padStart(2, "0"),
    ].join("-");
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnail: "",
    location: "",
    eventDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "error"
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerMessage("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Event description is required.";
    }

    if (!formData.eventType) {
      newErrors.eventType = "Please select an event category.";
    }

    if (!formData.thumbnail.trim()) {
      newErrors.thumbnail = "Event image URL is required.";
    } else {
      try {
        const imageUrl = new URL(formData.thumbnail);

        if (
          imageUrl.protocol !== "http:" &&
          imageUrl.protocol !== "https:"
        ) {
          newErrors.thumbnail = "Please enter a valid image URL.";
        }
      } catch {
        newErrors.thumbnail = "Please enter a valid image URL.";
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = "Event location is required.";
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required.";
    } else if (formData.eventDate < minEventDate) {
      newErrors.eventDate = "Please select a future date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit Event to Backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setServerMessage("");

    if (!validateForm()) return;

    if (sessionPending) {
      setMessageType("error");
      setServerMessage("Please wait while your login session is loading.");
      return;
    }

    if (!session?.user) {
      setMessageType("error");
      setServerMessage("Please login before creating an event.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      setMessageType("success");
      setServerMessage("Your event has been created successfully!");

      setFormData({
        title: "",
        description: "",
        eventType: "",
        thumbnail: "",
        location: "",
        eventDate: "",
      });

      setErrors({});

      if (result.eventId) {
        router.push(`/events/${result.eventId}`);
      } else {
        router.push("/events");
      }

      router.refresh();
    } catch (error) {
      console.error("Create Event Error:", error);

      setMessageType("error");

      setServerMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      eventType: "",
      thumbnail: "",
      location: "",
      eventDate: "",
    });

    setErrors({});
    setServerMessage("");
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

  const labelClass =
    "mb-2 block text-sm font-semibold text-foreground";

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Heading */}
        <div className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            ← Back to Home
          </Link>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Make a Difference
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create a New Event
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Bring people together and turn small acts into meaningful
            community impact. Create an event and invite others to join.
          </p>
        </div>

        {/* Login Check */}
        {!sessionPending && !session?.user && (
          <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
            Please login before creating an event.{" "}
            <Link
              href="/login"
              className="font-bold text-primary underline"
            >
              Login Now
            </Link>
          </div>
        )}

        {/* Form Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8"
          >
            <div className="mb-8 border-b border-border pb-5">
              <h2 className="text-xl font-bold">
                Event Information
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Provide the details about your volunteering event.
              </p>
            </div>

            <div className="space-y-6">

              {/* Event Title */}
              <div>
                <label htmlFor="title" className={labelClass}>
                  Event Title <span className="text-primary">*</span>
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Community Beach Cleanup"
                  className={inputClass}
                />

                {errors.title && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className={labelClass}>
                  Event Description <span className="text-primary">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the purpose and activities of your event..."
                  className={`${inputClass} resize-none`}
                />

                {errors.description && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Event Type */}
              <div>
                <label htmlFor="eventType" className={labelClass}>
                  Event Category <span className="text-primary">*</span>
                </label>

                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">
                    Select an event category
                  </option>

                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Tree Plantation</option>
                  <option value="Donation">Donation</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Other">Other</option>
                </select>

                {errors.eventType && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.eventType}
                  </p>
                )}
              </div>

              {/* Thumbnail */}
              <div>
                <label htmlFor="thumbnail" className={labelClass}>
                  Event Image URL <span className="text-primary">*</span>
                </label>

                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/event-image.jpg"
                  className={inputClass}
                />

                {errors.thumbnail && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.thumbnail}
                  </p>
                )}

                {formData.thumbnail && !errors.thumbnail && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.thumbnail}
                      alt="Event preview"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Location and Date */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label htmlFor="location" className={labelClass}>
                    Event Location <span className="text-primary">*</span>
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Khulna, Bangladesh"
                    className={inputClass}
                  />

                  {errors.location && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="eventDate" className={labelClass}>
                    Event Date <span className="text-primary">*</span>
                  </label>

                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    min={minEventDate}
                    value={formData.eventDate}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  {errors.eventDate && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.eventDate}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Server Message */}
            {serverMessage && (
              <div
                role="alert"
                className={`mt-6 rounded-xl border p-4 text-sm ${
                  messageType === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-600"
                    : "border-red-500/30 bg-red-500/10 text-red-500"
                }`}
              >
                {serverMessage}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">

              <button
                type="reset"
                onClick={handleReset}
                disabled={isSubmitting}
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting || sessionPending || !session?.user}
                className="rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "Creating Event..."
                  : "Create Event →"}
              </button>

            </div>
          </form>

          {/* Sidebar */}
          <aside className="space-y-5">

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Event Guidelines
              </p>

              <h3 className="mt-3 text-lg font-bold">
                Make Your Event Meaningful
              </h3>

              <ul className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
                <li>
                  01. Choose a clear and meaningful event title.
                </li>

                <li>
                  02. Explain the purpose of your event.
                </li>

                <li>
                  03. Provide an accurate location and future date.
                </li>

                <li>
                  04. Use a relevant, high-quality event image.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm font-bold text-primary">
                Small Acts, Greater Impact.
              </p>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Every meaningful change starts with someone willing
                to take the first step.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}
