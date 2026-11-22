import type { Metadata } from "next";
import Link from "next/link";
import TherapistsListClient from "./therapists-list/TherapistsListClient";
import { therapists } from "./therapists-list/therapists";
import ProviderDropdown from "./therapists-list/ProviderDropdown";

export const metadata: Metadata = {
  title: "Appi | At your service!",
  description: "Find a massage therapist on Appi.",
};

export default function Home() {
  return (
    <main className="app-page flex min-h-screen flex-1 flex-col font-sans">
        <header className="border-b border-app-border bg-app-surface">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" aria-label="Appi home" className="app-link text-2xl font-semibold tracking-tight">
            <span className="italic">App</span>i
          </Link>

          <ProviderDropdown />
        </div>
      </header>

      <div className="app-page min-h-screen font-sans">
        <TherapistsListClient therapists={therapists} initialLocation="Ghana, GH" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-2 pt-4 pb-8 sm:px-8 sm:py-10">
        <div className="p-2 sm:p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-start pb-6 gap-2 p-4 flex-[0_0_92%] snap-center overflow-hidden rounded-xl border border-app-border bg-app-surface shadow-sm sm:min-w-68.75 sm:max-w-73.75 sm:flex-1">
            <p className="text-2xl">Need help finding a therapist?</p>
            <p className="text-sm mt-1 text-app-ink-muted">Tell us what you're looking for and we'll help you find an available massage therapist.</p>
            <div className="flex flex-col items-center gap-2">
              <Link
                href="https://wa.me/233551584980"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-bold text-white hover:bg-green-600"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347Z" />
                  <path d="M12.004 2.003a9.93 9.93 0 0 0-8.494 15.073L2 22l5.049-1.488A9.93 9.93 0 1 0 12.004 2.003Zm0 17.873a7.9 7.9 0 0 1-4.027-1.101l-.289-.171-2.996.883.891-2.95-.188-.303A7.904 7.904 0 1 1 12.004 19.876Z" />
                </svg>
                Chat on WhatsApp
              </Link>
              {/* <p className="text-xl">Or call</p>
              <Link
                href="tel:0551584980"
                className="rounded bg-none px-4 py-2 font-bold text-app-primary hover:text-app-primary/80"
              >
                +233 55 158 4980
              </Link> */}

            </div>
          </div>
        </div>
      </div>
      
       {/* <div className="mx-auto w-full max-w-6xl px-2 pt-4 pb-8 sm:px-8 sm:py-10">
        <div className="p-2 sm:p-4 md:p-6 lg:p-8">
          <div className="flex flex-col items-start pb-6 gap-2 p-4 flex-[0_0_92%] snap-center overflow-hidden rounded-xl border border-app-border bg-app-surface shadow-sm sm:min-w-68.75 sm:max-w-73.75 sm:flex-1">
            <p className="text-sm">You may book via WhatsApp instead</p>
            <div className="flex flex-col items-center gap-2">
              <Link
                href="https://wa.me/233551584980"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-bold text-white hover:bg-green-600"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347Z" />
                  <path d="M12.004 2.003a9.93 9.93 0 0 0-8.494 15.073L2 22l5.049-1.488A9.93 9.93 0 1 0 12.004 2.003Zm0 17.873a7.9 7.9 0 0 1-4.027-1.101l-.289-.171-2.996.883.891-2.95-.188-.303A7.904 7.904 0 1 1 12.004 19.876Z" />
                </svg>
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </main>
  );
}
