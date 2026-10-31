
"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Thank you for your interest in Rupshora!");
    setEmail("");
  };

  return (
    <section className="bg-background px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#29151E] px-6 py-14 text-[#FFF7F8] md:px-12 md:py-20">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#E8A0B2]/15" />
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-[#E8A0B2]/15" />

          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            {/* Left Content */}
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8A0B2]">
                Stay Connected
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Small Acts.
                <br />
                <span className="text-[#E8A0B2]">
                  Bigger Connections.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-[#BFAEB4] md:text-base">
                Stay inspired by meaningful stories, upcoming events, and
                opportunities to create positive change in your community.
                Let’s make a difference together.
              </p>

              <div className="mt-9 flex flex-wrap gap-8">
                <div>
                  <p className="text-2xl font-bold text-[#FFF7F8]">
                    Together
                  </p>
                  <p className="mt-1 text-xs text-[#BFAEB4]">
                    We create change
                  </p>
                </div>

                <div className="h-12 w-px bg-[#FFF7F8]/15" />

                <div>
                  <p className="text-2xl font-bold text-[#FFF7F8]">
                    Every Day
                  </p>
                  <p className="mt-1 text-xs text-[#BFAEB4]">
                    Is an opportunity
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="rounded-2xl border border-[#FFF7F8]/10 bg-[#10090D]/50 p-6 backdrop-blur-sm md:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8A0B2]">
                Newsletter
              </span>

              <h3 className="mt-4 text-2xl font-semibold text-[#FFF7F8]">
                Join Our Community
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#BFAEB4]">
                Subscribe with your email to stay updated with everything
                happening at Rupshora.
              </p>

              <form onSubmit={handleSubscribe} className="mt-7">
                <label
                  htmlFor="newsletter-email"
                  className="mb-2 block text-sm font-medium text-[#FFF7F8]"
                >
                  Email Address
                </label>

                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#FFF7F8]/15 bg-[#FFF7F8]/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-[#BFAEB4]/60 focus:border-[#E8A0B2]"
                />

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#B85F79] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#A84E69]"
                >
                  Subscribe to Newsletter
                  <span aria-hidden="true">→</span>
                </button>

                {message && (
                  <p
                    aria-live="polite"
                    className="mt-4 text-sm text-[#E8A0B2]"
                  >
                    {message}
                  </p>
                )}
              </form>

              <div className="mt-6 border-t border-[#FFF7F8]/10 pt-5">
                <p className="text-xs leading-6 text-[#BFAEB4]">
                  By subscribing, you agree to receive updates from Rupshora.
                  We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
