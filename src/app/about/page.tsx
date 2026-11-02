
import Link from "next/link";
import {
  HeartHandshake,
  Users,
  HandHeart,
  ArrowUpRight,
} from "lucide-react";

const values = [
  {
    icon: HeartHandshake,
    title: "Kindness",
    description: "Small acts can create meaningful change.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Together, we can build a stronger society.",
  },
  {
    icon: HandHeart,
    title: "Impact",
    description: "Every helping hand makes a difference.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fff9f8] text-[#351b27] dark:bg-[#151116] dark:text-[#f8edf1]">
      {/* Hero */}
      <section className="px-6 pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full border border-[#e9c8d4] bg-[#fcecf1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#842e50] dark:border-[#553044] dark:bg-[#291c25] dark:text-[#e8a8c0]">
            About Rupshora
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Small Acts,
            <span className="block text-[#a04467] dark:text-[#e5a0b9]">
              Greater Impact.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#795f6a] dark:text-[#c5b3bc] md:text-lg">
            Bringing people together to make the world
            a little better, one action at a time.
          </p>

          <Link
            href="/events"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#762746] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#5b1935] dark:bg-[#d18aa5] dark:text-[#21131a] dark:hover:bg-[#e5a0b9]"
          >
            Explore Events
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 rounded-3xl border border-[#efd9e1] bg-white p-7 dark:border-[#382833] dark:bg-[#201921] md:grid-cols-2 md:items-center md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a04467] dark:text-[#e5a0b9]">
              Our Purpose
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-snug">
              Making kindness a part of everyday life.
            </h2>

            <p className="mt-5 leading-7 text-[#795f6a] dark:text-[#c5b3bc]">
              Rupshora connects volunteers with meaningful
              opportunities to support people, communities
              and the environment.
            </p>
          </div>

          <div className="rounded-2xl bg-[#fcecf1] p-7 dark:bg-[#30212b]">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#9a4968] dark:text-[#e5a0b9]">
              Our Mission
            </p>

            <p className="mt-4 text-2xl font-bold leading-snug text-[#64223e] dark:text-[#f3d8e2]">
              Inspire people. Connect communities. Create impact.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a04467] dark:text-[#e5a0b9]">
              What We Believe
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Our Core Values
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-[#efd9e1] bg-white p-7 dark:border-[#382833] dark:bg-[#201921]"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#fcecf1] text-[#842e50] dark:bg-[#382432] dark:text-[#e5a0b9]">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#795f6a] dark:text-[#c5b3bc]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 pt-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#70233f] px-7 py-12 text-center text-white dark:border dark:border-[#513344] dark:bg-[#291c25] md:py-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            Be the Difference.
          </h2>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#f3dce5] dark:text-[#d5bdc8]">
            Your next small act could mean a lot to someone.
          </p>

          <Link
            href="/events"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#70233f] hover:bg-[#fcecf1] dark:bg-[#e5a0b9] dark:text-[#29131f] dark:hover:bg-[#f0b8cc]"
          >
            Join Our Community
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
