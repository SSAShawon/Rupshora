"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./theme-toggle";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isLoggedIn = !!user;

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      closeMenus();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link href="/" onClick={closeMenus} className="flex items-center gap-2">
          <Image
            src="/images/logo.jpg"
            alt="Rupshora Logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Rupshora
            </h1>
            <p className="text-[10px] tracking-wider text-muted-foreground">
              SMALL ACTS, GREATER IMPACT.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Controls */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          {!isPending && !isLoggedIn && (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Join Now
              </Link>
            </>
          )}

          {isLoggedIn && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                title={user.name}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                className="flex items-center gap-2 rounded-full border border-border p-1 pr-3 hover:bg-secondary"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-secondary text-sm font-bold text-primary">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile"}
                      width={40}
                      height={40}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>

                <span className="max-w-28 truncate text-sm font-semibold text-foreground">
                  {user.name}
                </span>

                <span className="text-xs text-muted-foreground">
                  {profileOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Desktop Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl">
                  <div className="border-b border-border px-3 py-3">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {user.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="space-y-1 py-2">
                    <Link
                      href="/create-event"
                      onClick={closeMenus}
                      className="block rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary"
                    >
                      Create Event
                    </Link>

                    <Link
                      href="/manage-events"
                      onClick={closeMenus}
                      className="block rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary"
                    >
                      Manage Events
                    </Link>

                    <Link
                      href="/joined-events"
                      onClick={closeMenus}
                      className="block rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary"
                    >
                      Joined Events
                    </Link>
                  </div>

                  <div className="border-t border-border pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-500 hover:bg-red-500/10 disabled:opacity-50"
                    >
                      {loggingOut ? "Logging Out..." : "Logout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isPending && <div className="h-10 w-10 rounded-full bg-secondary" />}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-border px-3 py-2 text-foreground"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-border pt-4">
              {!isPending && !isLoggedIn && (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    className="flex-1 rounded-lg border border-border py-3 text-center text-sm font-semibold"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenus}
                    className="flex-1 rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
                  >
                    Join Now
                  </Link>
                </div>
              )}

              {isLoggedIn && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-secondary p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-background text-sm font-bold text-primary">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "Profile"}
                          width={40}
                          height={40}
                          unoptimized
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        user.name?.charAt(0).toUpperCase() || "U"
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Link
                      href="/create-event"
                      onClick={closeMenus}
                      className="rounded-lg px-3 py-3 text-sm hover:bg-secondary"
                    >
                      Create Event
                    </Link>

                    <Link
                      href="/manage-events"
                      onClick={closeMenus}
                      className="rounded-lg px-3 py-3 text-sm hover:bg-secondary"
                    >
                      Manage Events
                    </Link>

                    <Link
                      href="/joined-events"
                      onClick={closeMenus}
                      className="rounded-lg px-3 py-3 text-sm hover:bg-secondary"
                    >
                      Joined Events
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full rounded-lg border border-red-500/30 py-3 text-sm font-semibold text-red-500 hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {loggingOut ? "Logging Out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
