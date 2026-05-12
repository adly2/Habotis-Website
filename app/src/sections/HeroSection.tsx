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

      <div className="relative z-10 flex flex-col items-center justify-center gap-10 max-w-5xl w-full">
        {/* Title */}
        <div ref={textRef} className="w-full text-center opacity-0">
          <h1 className="font-display text-4xl lg:text-5xl text-sand mb-2 leading-tight">
            Professor Naila (Neela) Lamki
          </h1>
          <p className="font-display text-xl text-sand/60">(1941-2026)<br />(Hijri Year 1360-1447)</p>
        </div>

        {/* Portrait */}
        <div ref={portraitRef} className="flex-shrink-0 opacity-0">
          <div className="relative">
            <div className="absolute -inset-3 border border-sand/10 rounded-lg" />
            <div className="absolute -inset-6 border border-sand/5 rounded-lg" />
            <img
              src="/naila-portrait.jpg"
              alt="Portrait of Professor Naila Lamki"
              className="relative w-96 sm:w-120 rounded-lg shadow-2xl shadow-black/30"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-sacred/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Obituary Text */}
        <div className="w-full">
          <div className="font-serif text-2xl font-bold text-sand/70 leading-relaxed space-y-4 text-left">
            <p>
              On May 5th, 2026, Naila departed from this world the same way she lived in it: Quietly,
              gracefully, and surrounded by those she loved most. Her husband, children, siblings, and
              grandchildren were at her side, holding the woman who had held them all for so long.
            </p>
            <p>
              She spent her youth in Uganda before graduating from the Royal College of Surgeons in
              Ireland and building a distinguished career as a Professor in Radiology that carried her
              from Toronto to Houston to Muscat. Wherever she went, she accomplished more than only
              practicing medicine; she built futures, broke barriers, and opened doors for those who
              believed they couldn&apos;t. Naila shaped lives with her brilliance, warmth, and
              unwavering confidence in others. She guided generations of physicians, first at Baylor
              College of Medicine, and later in Oman, where she helped build the future of medical
              education by founding 19 medical residencies that continue to pass her influence forward.
              Prof Naila&apos;s name appears on many publications, fellowships, and honors from around
              the world. Yet, the people who loved her will remember something far greater; her truest
              legacy lives in the countless hearts she touched through her unwavering kindness and
              generosity toward everyone she met.
            </p>
            <p>
              What made Naila was the way she walked into a room and made it feel like home. Strangers
              became family in her presence. She was a second mother to many, and a first to the three
              children she raised with steadfast grace and resolute love. When her children married,
              she did not gain in-laws. She gained three more children whom she loved and claimed with
              the same fierce tenderness she gave her own.
            </p>
            <p>
              She and her husband, Lamk, built a love that lasted nearly sixty years, planning their
              sixtieth anniversary this July. A love so enduring, so tender, and so certain that even
              time seemed unable to wear it. To witness them was to understand that real love is not
              something that fades into routine. Rather, it deepens, matures, and becomes woven into
              the fabric of a life shared. The family of six children and twelve grandchildren, which
              resulted from their love, was to be her greatest pride.
            </p>
            <p>
              Her faith ran deep, though she carried it sincerely and without spectacle, as she did
              everything else. She lived by the principle of niyyah, the belief that actions are
              weighed by the intention behind them.{" "}
              <span dir="rtl" lang="ar" className="font-serif">إنّما الأعمال بالنّيّات</span>{" "}
              Every act of hers, large or small, was rooted in pure intention. To heal, to teach,
              to lift, to love. Her goodness revealed itself to everyone in the way she lived, her
              intentions speaking for themselves, and Allah knowing her heart.
            </p>
            <p>
              Naila is survived by her beloved husband, three children and their spouses, twelve
              grandchildren, as well as her brothers and their families. Additionally, the myriad of
              friends, students, colleagues, confidantes and loved ones who were changed by simply
              having known her, spending the rest of their lives trying to live up to the standard
              she set just by being herself.
            </p>
            <p dir="rtl" lang="ar" className="font-serif text-center text-sand/90">
              إنّا لله و إنّا إليه راجعون
            </p>
            <p className="italic text-sand/80">
              &ldquo;Indeed, to Allah we belong and to Him we shall return&rdquo; (Surah Al-Baqarah 2:156)
            </p>
            <p className="border-t border-sand/20 pt-4">
              <span className="font-display text-sand not-italic">To Honor Naila:</span>{" "}
              Naila devoted herself to many charitable causes, though closest to her heart were
              promoting education, elevating others &amp; improving care for breast cancer patients,
              especially those underserved. In honor of her life, you are invited to share a message,
              a photo and/or a donation to breast cancer care &amp; research (Sadaqa Jariya / ongoing
              charity in her name). Every word, every gift, every memory shared allows her love and
              legacy to continue touching others.
            </p>
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
