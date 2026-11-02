
import Link from "next/link";
import {
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fff9f8] px-6 py-16 text-[#351b27] dark:bg-[#151116] dark:text-[#f8edf1] md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-[#e9c8d4] bg-[#fcecf1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#842e50] dark:border-[#553044] dark:bg-[#291c25] dark:text-[#e8a8c0]">
            Get In Touch
          </span>

          <h1 className="mt-6 text-4xl font-bold md:text-5xl">
            Lets Talk.
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#795f6a] dark:text-[#c5b3bc]">
            Have a question, suggestion or idea?
            We would love to hear from you.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid gap-7 md:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-3xl bg-[#70233f] p-8 text-white dark:border dark:border-[#513344] dark:bg-[#291c25] md:p-10">
            <h2 className="text-2xl font-bold">
              Contact Information
            </h2>

            <p className="mt-3 leading-7 text-[#f3dce5] dark:text-[#d5bdc8]">
              Reach out to us. We are always happy to
              connect with our community.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <Mail size={22} />
                </div>

                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href="mailto:samsul261103@gmail.com"
                    className="mt-1 block break-all text-sm text-[#f3dce5] hover:text-white dark:text-[#d5bdc8]"
                  >
                    samsul261103@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <MapPin size={22} />
                </div>

                <div>
                  <p className="font-semibold">Location</p>
                  <p className="mt-1 text-sm text-[#f3dce5] dark:text-[#d5bdc8]">
                    Khulna, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <MessageCircle size={22} />
                </div>

                <div>
                  <p className="font-semibold">Community</p>
                  <p className="mt-1 text-sm text-[#f3dce5] dark:text-[#d5bdc8]">
                    Lets make a positive impact together.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-[#efd9e1] bg-white p-8 dark:border-[#382833] dark:bg-[#201921] md:p-10">
            <h2 className="text-2xl font-bold">
              Send a Message
            </h2>

            <p className="mt-2 text-sm text-[#795f6a] dark:text-[#c5b3bc]">
              We would love to hear from you.
            </p>

            <form
              action="mailto:samsul261103@gmail.com"
              method="post"
              encType="text/plain"
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="Name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#ead5dd] bg-[#fff9f8] px-4 py-3 text-sm text-[#351b27] outline-none placeholder:text-[#a58c96] focus:border-[#a04467] dark:border-[#493441] dark:bg-[#181319] dark:text-[#f8edf1] dark:placeholder:text-[#887782] dark:focus:border-[#d18aa5]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="Email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#ead5dd] bg-[#fff9f8] px-4 py-3 text-sm text-[#351b27] outline-none placeholder:text-[#a58c96] focus:border-[#a04467] dark:border-[#493441] dark:bg-[#181319] dark:text-[#f8edf1] dark:placeholder:text-[#887782] dark:focus:border-[#d18aa5]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="Message"
                  required
                  rows={4}
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-[#ead5dd] bg-[#fff9f8] px-4 py-3 text-sm text-[#351b27] outline-none placeholder:text-[#a58c96] focus:border-[#a04467] dark:border-[#493441] dark:bg-[#181319] dark:text-[#f8edf1] dark:placeholder:text-[#887782] dark:focus:border-[#d18aa5]"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#762746] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#5b1935] dark:bg-[#d18aa5] dark:text-[#21131a] dark:hover:bg-[#e5a0b9]"
              >
                Send Message
                <ArrowUpRight size={18} />
              </button>

              <p className="text-xs leading-5 text-[#927c86] dark:text-[#a997a1]">
                Your email application will open to send the message.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#842e50] hover:underline dark:text-[#e5a0b9]"
          >
            Explore our community events
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
