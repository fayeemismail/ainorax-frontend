import Link from "next/link";
import { getNavbar } from "@/lib/queries/navbarData";

export default async function ServicePage() {
  const navbarData = await getNavbar();
  const primaryCtaLabel = navbarData.ctaButton?.label || "Start a Conversation";
  const primaryCtaHref = navbarData.ctaButton?.href || "/";

  return (
    <main className="section relative min-h-screen overflow-hidden pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_60%)]" />
        <div className="absolute left-1/2 top-20 h-112 w-md -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.12),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <section className="rounded-[40px] border border-white/12 bg-[linear-gradient(180deg,rgba(10,18,34,0.9),rgba(7,12,24,0.82))] p-6 shadow-[0_30px_100px_rgba(2,6,23,0.42)] backdrop-blur-xl sm:p-8 md:p-10 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/6 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-200">
              Service Page
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[4rem]">
              Coming soon.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              We are preparing a cleaner services experience with a more
              structured, enterprise-focused presentation of our capabilities.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={primaryCtaHref}
                className="inline-flex min-w-44 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
              >
                {primaryCtaLabel}
              </Link>
              <Link
                href="/"
                className="inline-flex min-w-44 items-center justify-center rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Back to Home
              </Link>
            </div>

            <div className="mx-auto mt-12 w-full max-w-xl rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-6 py-5 shadow-[0_20px_60px_rgba(2,6,23,0.2)]">
              <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
                <span className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/12 px-3 py-1 text-xs font-medium text-emerald-200">
                  In Progress
                </span>
                <p className="text-sm leading-7 text-slate-300">
                  A refined enterprise services page is currently being
                  prepared.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
