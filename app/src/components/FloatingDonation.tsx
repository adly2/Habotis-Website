import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FloatingDonation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed right-5 top-5 z-40">
      <div
        className="relative flex flex-col items-end"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Donate button - always visible */}
        <a
          href="https://athar.thawani.om/donate/he68WWB"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative flex items-center justify-center px-6 py-3 rounded-2xl shadow-lg transition-all duration-500",
            "bg-terracotta hover:bg-terracotta/90 shadow-terracotta/30",
            isHovered && "scale-105 shadow-xl"
          )}
          title="Donate Sadaqah Jariyah"
        >
          <span className="font-display text-sm text-sand tracking-widest uppercase">
            Donate
          </span>

          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-2xl bg-terracotta/30 animate-ping"
            style={{ animationDuration: "3s" }}
          />
        </a>

        {/* Expanded content - drops down on hover */}
        <div
          className={cn(
            "absolute top-full mt-2 right-0 w-64 p-5 rounded-2xl bg-sacred border border-sand/10 shadow-2xl transition-all duration-500 ease-out origin-top-right z-50",
            isHovered
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <h4 className="font-display text-lg text-sand mb-2 leading-snug">
            Donate Sadaqah Jariyah
          </h4>
          <p className="font-serif text-sm text-sand/60 leading-relaxed mb-4">
            Continuous charity that benefits the deceased. Your donation to
            breast cancer research rewards Naila&apos;s soul.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://athar.thawani.om/donate/he68WWB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center py-3 rounded-full bg-terracotta text-sand font-serif text-sm tracking-wider hover:bg-terracotta/80 transition-colors duration-300"
            >
              Donate from Oman
            </a>
            <a
              href="https://fundraise.givesmart.com/form/NtMMfA?vid=1qehp2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center py-3 rounded-full bg-terracotta text-sand font-serif text-sm tracking-wider hover:bg-terracotta/80 transition-colors duration-300"
            >
              Donate from Abroad
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
