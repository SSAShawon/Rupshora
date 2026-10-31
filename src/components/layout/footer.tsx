
import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const supportLinks = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "Create Event", href: "/create-event" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
                R
              </div>

              <span className="text-xl font-bold text-foreground">
                Rupshora
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
              Small Acts, Greater Impact. Join a community of people who
              believe that even the smallest act of kindness can create
              meaningful change.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold text-foreground">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-5 font-semibold text-foreground">
              Get Involved
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-foreground">
              Make a Difference
            </h3>

            <p className="text-sm leading-7 text-muted-foreground">
              Every community becomes stronger when people come together.
              Find an event, volunteer your time, and be part of the change.
            </p>

            <Link
              href="/events"
              className="mt-5 inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Explore Events →
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-muted-foreground">
            © 2026 Rupshora. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Made with care for a better community.
          </p>
        </div>
      </div>
    </footer>
  );
}
