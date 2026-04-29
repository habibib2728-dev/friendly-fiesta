import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { AnimatedSection } from "@/components/AnimatedSection";

const highlights = [
  {
    title: "Performance Builds",
    description:
      "Dial in power for Ford, Chevy, and Dodge platforms with race-proven parts and calibration.",
  },
  {
    title: "Dyno & Data",
    description:
      "In-house dyno tuning with data-driven adjustments to deliver consistent gains.",
  },
  {
    title: "Transmission Support",
    description:
      "Built transmissions and troubleshooting to keep torque where it belongs.",
  },
];

const services = [
  "Custom tunes and ECU calibration",
  "Forced induction upgrades",
  "Turbo and supercharger installs",
  "Transmission diagnostics and rebuilds",
  "Track prep and safety checks",
  "Performance consultations",
];

const schedule = [
  { day: "Monday - Friday", hours: "8:30 AM - 5:30 PM" },
  { day: "Saturday", hours: "9:00 AM - 12:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const gallery = [
  { title: "Track-ready Ford build", tag: "Ford" },
  { title: "Chevy dyno session", tag: "Chevy" },
  { title: "Dodge transmission upgrade", tag: "Dodge" },
  { title: "Turbo install & tuning", tag: "Dyno" },
  { title: "Shop floor in action", tag: "Shop" },
  { title: "Customer delivery day", tag: "Delivery" },
];

export default function Home() {
  return (
    <main className="gradient-ring min-h-screen bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-8 pt-10 lg:px-12">
        <div className="flex items-center gap-4">
          <LogoMark />
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">
              Sniper Motorsports
            </p>
            <p className="text-sm text-muted">Performance & Tuning Studio</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#services" className="transition hover:text-foreground">
            Services
          </a>
          <a href="#gallery" className="transition hover:text-foreground">
            Gallery
          </a>
          <a href="#contact" className="transition hover:text-foreground">
            Contact
          </a>
          <Link
            href="/affirmative"
            className="rounded-full border border-brand/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-brand transition hover:bg-brand hover:text-white"
          >
            Affirm Portal
          </Link>
        </nav>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pb-24 pt-4 lg:flex-row lg:items-center lg:px-12">
        <AnimatedSection className="flex flex-1 flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">
            Ford • Chevy • Dodge
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Precision tuning, dyno power, and transmission support for serious
            street and track builds.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Sniper Motorsports delivers bespoke builds, data-backed dyno tuning,
            and gearbox solutions that keep horsepower reliable and repeatable.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-brand/30 transition hover:translate-y-[-1px] hover:bg-brand-glow"
            >
              Book a consult
            </a>
            <Link
              href="/affirmative"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted transition hover:border-brand hover:text-brand"
            >
              Financing options
            </Link>
          </div>
          <div className="grid gap-3 text-sm text-muted sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Dyno verified gains
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Calibrated horsepower
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Transmission support
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Built to hold torque
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="flex flex-1 flex-col gap-4" delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-card/80 p-8 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">
              Shop spotlight
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Known for clean power delivery and reliable drivetrains.
            </h2>
            <p className="mt-4 text-sm text-muted">
              Add photos and videos of the shop, builds, dyno pulls, and customer
              deliveries here. This panel animates in to highlight your best
              work.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-muted">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Turbo builds
              </p>
              <p className="mt-3 text-lg font-semibold text-foreground">
                Boosted to perfection
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-muted">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Dyno sessions
              </p>
              <p className="mt-3 text-lg font-semibold text-foreground">
                Verified on the rollers
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <AnimatedSection
        className="mx-auto w-full max-w-6xl px-6 pb-20 lg:px-12"
        delay={0.1}
      >
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-black/40 p-8 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection
        className="mx-auto w-full max-w-6xl px-6 pb-20 lg:px-12"
        delay={0.2}
      >
        <div
          id="services"
          className="grid gap-8 rounded-3xl border border-white/10 bg-card/70 p-8 md:grid-cols-[1.1fr_1fr]"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Specializing in Ford, Chevy, and Dodge performance.
            </h2>
            <p className="mt-4 text-sm text-muted">
              From dyno pulls to transmission support, every build is tuned for
              reliability and real-world performance.
            </p>
          </div>
          <ul className="grid gap-3 text-sm text-muted sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service}
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection
        className="mx-auto w-full max-w-6xl px-6 pb-20 lg:px-12"
        delay={0.2}
      >
        <div
          id="gallery"
          className="grid gap-6 rounded-3xl border border-white/10 bg-black/40 p-8"
        >
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Gallery & Builds
            </p>
            <h2 className="text-3xl font-semibold">
              Drop in photos & videos of your work.
            </h2>
            <p className="text-sm text-muted">
              Replace these placeholders with real shots of Sniper Motorsports
              builds, dyno runs, and customer deliveries.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
              <div
                key={item.title}
                className="group flex min-h-[160px] flex-col justify-between rounded-2xl border border-white/10 bg-card/60 p-4 transition hover:-translate-y-1 hover:border-brand/60"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-muted">
                  {item.tag}
                </span>
                <span className="text-base font-semibold">{item.title}</span>
                <span className="text-xs text-muted">Image/video slot</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        className="mx-auto w-full max-w-6xl px-6 pb-20 lg:px-12"
        delay={0.2}
      >
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-card/70 p-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Hours
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Shop schedule & availability
            </h2>
            <p className="mt-4 text-sm text-muted">
              Appointments are recommended for dyno sessions and transmission
              diagnostics.
            </p>
          </div>
          <div className="grid gap-3">
            {schedule.map((slot) => (
              <div
                key={slot.day}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-muted"
              >
                <span>{slot.day}</span>
                <span className="text-foreground">{slot.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        className="mx-auto w-full max-w-6xl px-6 pb-24 lg:px-12"
        delay={0.3}
      >
        <div
          id="contact"
          className="grid gap-6 rounded-3xl border border-white/10 bg-black/40 p-8 md:grid-cols-[1.1fr_1fr]"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Ready to plan your next build?
            </h2>
            <p className="mt-4 text-sm text-muted">
              Share your goals and we will map out the right parts, tuning, and
              timeline.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-muted">
            <div className="rounded-2xl border border-white/10 bg-card/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Phone
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                (555) 014-8305
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Email
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                sniper@snpmsports.com
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Location
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                123 Dyno Drive, Track City
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
