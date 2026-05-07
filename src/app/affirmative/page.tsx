import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { LogoMark } from "@/components/LogoMark";

const steps = [
  {
    title: "Set the job price",
    description:
      "Enter the total estimate for the build, dyno session, or transmission work. We'll generate the financing plan for your customer.",
  },
  {
    title: "Add your work notes",
    description:
      "Describe the scope, parts list, and performance goals. Your notes become part of the finance request for clarity.",
  },
  {
    title: "Send the Affirm link",
    description:
      "Share the generated Affirm checkout link with your customer to apply instantly.",
  },
  {
    title: "Get paid faster",
    description:
      "Affirm pays you directly after approval. You keep the momentum on the build schedule.",
  },
];

export default function AffirmativePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="gradient-ring">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 lg:px-12">
          <AnimatedSection>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <LogoMark />
                <Link
                  href="/"
                  className="text-sm uppercase tracking-[0.3em] text-muted"
                >
                  Back to Sniper Motorsports
                </Link>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Affirm Financing Portal
              </h1>
              <p className="max-w-2xl text-lg text-muted">
                A dedicated page for Sniper Motorsports to send custom Affirm
                payment links with job notes, pricing, and scope details.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid gap-6 rounded-3xl border border-white/10 bg-card/70 p-8 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">
                Create an Affirm checkout
              </h2>
              <p className="text-muted">
                Fill in the pricing and work notes. The link is generated from
                Sniper Motorsports and sent directly to the customer.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm uppercase tracking-[0.2em] text-muted">
                    Job price (USD)
                  </label>
                  <input
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-base text-foreground outline-none ring-2 ring-transparent transition focus:ring-brand/70"
                    placeholder="e.g. 8500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm uppercase tracking-[0.2em] text-muted">
                    Customer name
                  </label>
                  <input
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-base text-foreground outline-none ring-2 ring-transparent transition focus:ring-brand/70"
                    placeholder="Customer full name"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm uppercase tracking-[0.2em] text-muted">
                    Work notes
                  </label>
                  <textarea
                    className="min-h-[140px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-base text-foreground outline-none ring-2 ring-transparent transition focus:ring-brand/70"
                    placeholder="Scope, parts, timeline, and performance goals..."
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button className="rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-brand/30 transition hover:translate-y-[-1px] hover:bg-brand-glow">
                  Generate Affirm Link
                </button>
                <p className="text-sm text-muted">
                  This is a front-end demo. Plug in your real Affirm API keys
                  when ready.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid gap-8 md:grid-cols-2">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-white/10 bg-black/40 p-6"
                >
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="rounded-3xl border border-white/10 bg-card/60 p-8">
              <h2 className="text-2xl font-semibold">
                Want full Affirm integration?
              </h2>
              <p className="mt-3 text-muted">
                We can connect your actual Affirm merchant account so Sniper
                Motorsports can set pricing, attach build notes, and send real
                checkout links.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand"
              >
                Request integration support →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
