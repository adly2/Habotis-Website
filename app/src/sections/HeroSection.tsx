import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        portraitRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.1 }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.6 }
      );

      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power3.out", delay: 1.5 }
      );

      gsap.to(portraitRef.current, {
        y: -8,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToMessages = () => {
    const messagesSection = document.getElementById("messages-section");
    if (messagesSection) {
      messagesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-sacred px-6 pt-20 pb-28 sm:pb-32 lg:pt-20 lg:pb-36 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/20 blur-3xl" />
      </div>

      <div
        ref={badgeRef}
        className="relative z-10 mb-8 px-8 py-3 rounded-full border border-sand/20 bg-sacred/60 backdrop-blur-sm opacity-0"
      >
        <span className="font-display text-xl text-sand/90 tracking-wide">In Loving Memory</span>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-6xl w-full">
        {/* Left: Obituary Text */}
        <div
          ref={textRef}
          className="flex-1 max-w-xl text-center lg:text-left opacity-0 order-2 lg:order-1"
        >
          <h1 className="font-display text-4xl lg:text-5xl text-sand mb-2 leading-tight">
            Professor Naila (Neela) Lamki
          </h1>
          <p className="font-display text-xl text-sand/60 mb-6">(1941-2026)</p>

          <p className="font-serif text-lg text-sand/80 leading-relaxed mb-6 italic">
            &ldquo;Indeed, to Allah we belong and to Him we shall return&rdquo; (Surah Al-Baqarah 2:156)
          </p>

          <div className="font-serif text-xl text-sand/70 leading-relaxed space-y-4 text-left">
            <p>
              It is with great sadness that the family of Naila Lamki announce her passing on
              Tuesday May 5<sup>th</sup>, 2026, after a sudden illness. She was surrounded by her
              husband and children as she passed peacefully from this life.
            </p>
            <p>
              Naila led a tremendously full and productive life. Following her early education in
              Uganda, she attended the Royal College of Surgeons of Ireland, where she received
              her medical degree. Here, she met her life-partner, Dr Lamk Lamki, with whom she
              would spend 60 years of inseparable love and marriage.
            </p>
            <p>
              The young couple started their professional careers and family in Toronto, Canada
              where Naila became a Consultant Radiologist.
            </p>
            <p>
              The next phase of her career took her to Houston, Texas where she served for 20
              years at Baylor College of Medicine, as the Program Director for the Radiology
              residency training program, and as an Attending Radiologist at Ben Taub General
              Hospital.
            </p>
            <p>
              The couple then moved to Muscat, Oman where Naila was instrumental in establishing
              nineteen ACGME-accredited residency training programs through the Oman Medical
              Specialty Board, in which she served as the Vice President for Academic Affairs.
            </p>
            <p>
              Naila published extensively, and was the recipient of numerous honors, awards and
              fellowships from various departments and universities internationally. Throughout
              her life and career, she exhibited humility, compassion, quiet persistence, hard
              work and unending dedication to her family, patients and students. Her legacy
              continues through the many physicians who were impacted by her guidance and
              mentorship.
            </p>
            <p>
              Naila is survived by her loving husband of 60 years, 3 children and 12 grandchildren.
            </p>
          </div>
        </div>

        {/* Right: Portrait */}
        <div
          ref={portraitRef}
          className="flex-shrink-0 order-1 lg:order-2 opacity-0"
        >
          <div className="relative">
            <div className="absolute -inset-3 border border-sand/10 rounded-lg" />
            <div className="absolute -inset-6 border border-sand/5 rounded-lg" />

            <img
              src="/naila-portrait.jpg"
              alt="Portrait of Professor Naila Lamki"
              className="relative w-80 lg:w-96 rounded-lg shadow-2xl shadow-black/30"
            />

            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-sacred/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer opacity-0"
        onClick={handleScrollToMessages}
      >
        <span className="font-serif text-sm text-sand/50 tracking-wider">
          Share your memories
        </span>
        <div className="mt-2 flex justify-center">
          <div className="w-px h-8 bg-gradient-to-b from-sand/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
