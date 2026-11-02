
import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const communityLinks = [
  { name: "Create Event", href: "/create-event" },
  { name: "Manage Events", href: "/manage-events" },
  { name: "Joined Events", href: "/joined-events" },
  { name: "Login / Register", href: "/login" },
];

const socialLinks = [
  { name: "Facebook", label: "f", href: "https://facebook.com/" },
  { name: "Instagram", label: "ig", href: "https://instagram.com/" },
  { name: "YouTube", label: "▶", href: "https://youtube.com/" },
  { name: "X", label: "𝕏", href: "https://x.com/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="Rupshora Logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl object-cover"
              />

              <div>
                <h2 className="text-2xl font-extrabold text-foreground">
                  Rupshora<span className="text-primary">.</span>
                </h2>
                <p className="text-xs font-medium tracking-widest text-muted-foreground">
                  SMALL ACTS, GREATER IMPACT
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              Every small act of kindness can create a meaningful change.
              Join Rupshora and become part of a community that believes
              in making the world a better place.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-sm font-bold text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground">
              Explore
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground">
              Community
            </h3>

            <ul className="space-y-4">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground">
              Get In Touch
            </h3>

            <p className="text-sm leading-7 text-muted-foreground">
              Have an idea or want to make a difference?
              Explore upcoming events and become an active
              part of your community.
            </p>

            <p className="mt-5 text-sm text-muted-foreground">
              <span className="mr-2 text-primary">●</span>
              Khulna, Bangladesh
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Contact Us <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <p className="text-xs text-muted-foreground">
            © 2026 Rupshora. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Small Acts, Greater Impact. ❤️
          </p>

        </div>
      </div>
    </footer>
  );
}
