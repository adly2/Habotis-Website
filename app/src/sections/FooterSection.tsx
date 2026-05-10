export default function FooterSection() {
  return (
    <section className="relative w-full bg-terracotta py-20 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand/30 to-transparent" />

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl lg:text-5xl text-sand mb-6">
          Donate Sadaqah Jariyah
        </h2>

        <p className="font-serif text-lg text-sand/80 leading-relaxed mb-8 max-w-xl mx-auto">
          Sadaqah Jariyah is a continuous charity that benefits the deceased even
          after they have passed. By donating to breast cancer research in
          Neela&apos;s name, you create a lasting legacy of goodness that will
          continue to reward her soul.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://athar.thawani.om/donate/he68WWB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 rounded-full bg-sacred/30 border border-sand/20 hover:bg-sacred/50 transition-all duration-500 font-display text-xl text-sand tracking-widest text-center"
          >
            Donate from Oman
          </a>
          <a
            href="https://fundraise.givesmart.com/form/NtMMfA?vid=1qehp2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 rounded-full bg-sacred/30 border border-sand/20 hover:bg-sacred/50 transition-all duration-500 font-display text-xl text-sand tracking-widest text-center"
          >
            Donate from Abroad
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-sand/10">
          <p className="font-serif text-base text-sand/60 italic leading-relaxed">
            &ldquo;Indeed, it is We who bring the dead to life and record what
            they have put forth and what they left behind, and all things We have
            enumerated in a clear register.&rdquo;
          </p>
          <p className="font-display text-lg text-sand/40 mt-3">
            — Surah Ya-Sin, Verse 12
          </p>
        </div>

        <div className="mt-12">
          <p className="font-display text-2xl text-sand/70">
            May Allah grant her Jannah
          </p>
        </div>
      </div>
    </section>
  );
}
