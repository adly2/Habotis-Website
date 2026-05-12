import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import gsap from "gsap";
import { resizeImage } from "@/lib/resizeImage";

interface Message {
  id: string;
  name: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
}

interface MessageModalProps {
  message: Message | null;
  onClose: () => void;
}

function MessageModal({ message, onClose }: MessageModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (!message) {
      isClosingRef.current = false;
      return;
    }

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    ).fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.88, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
      "-=0.15"
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [message]);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        isClosingRef.current = false;
      },
    });

    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 15,
      duration: 0.25,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "-=0.1"
    );
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && message && !isClosingRef.current) handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [message, handleClose]);

  if (!message) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center"
      style={{ opacity: 0, zIndex: 2147483647 }}
      onClick={handleClose}
    >
      <div
        className="absolute inset-0 bg-sacred/80"
        style={{ backdropFilter: "blur(12px) saturate(140%)", WebkitBackdropFilter: "blur(12px) saturate(140%)" }}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-2xl mx-4 rounded-3xl bg-sand shadow-2xl overflow-hidden flex flex-col"
        style={{ opacity: 0, maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 flex items-center justify-between p-6 bg-sand border-b border-sacred/10">
          <div>
            <h3 className="font-display text-3xl text-sacred">{message.name}</h3>
            <span className="font-serif text-sm text-sacred/40">
              {new Date(message.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-sacred/10 hover:bg-sacred/20 transition-colors duration-300"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-sacred" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {message.imageUrl && (
            <div className="mb-6">
              <img
                src={message.imageUrl}
                alt={`Photo shared by ${message.name}`}
                className="w-full max-h-80 object-contain rounded-2xl"
              />
            </div>
          )}
          <p className="font-serif text-lg lg:text-xl text-sacred leading-relaxed" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {message.content}
          </p>
        </div>

        <div className="flex-shrink-0 h-6 bg-gradient-to-t from-sand to-transparent pointer-events-none" />
      </div>
    </div>,
    document.body
  );
}

function MessageCard({ message, index, onSelect }: { message: Message; index: number; onSelect: (msg: Message) => void }) {
  return (
    <div
      className={`cursor-pointer ${index % 2 === 1 ? "mt-8" : ""}`}
      onClick={() => onSelect(message)}
    >
      <div className="relative p-6 rounded-2xl border border-sacred/10 bg-sand/80 backdrop-blur-sm shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
        <div className="mb-3">
          <h3 className="font-display text-2xl text-sacred">{message.name}</h3>
          <span className="font-serif text-xs text-sacred/40">
            {new Date(message.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {message.imageUrl && (
          <div className="mb-3 overflow-hidden rounded-xl">
            <img
              src={message.imageUrl}
              alt={`Photo shared by ${message.name}`}
              className="w-full h-40 object-cover rounded-xl"
            />
          </div>
        )}

        <p className="font-serif text-base text-sacred/70 leading-relaxed line-clamp-3">
          {message.content}
        </p>

        {(message.content.length > 150 || message.imageUrl) && (
          <div className="mt-3 flex items-center gap-2">
            <span className="font-serif text-xs text-sacred/40 italic">Click to view</span>
            <div className="h-px flex-1 bg-sacred/10" />
          </div>
        )}
      </div>
    </div>
  );
}

async function fetchMessages(): Promise<Message[]> {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name as string,
    content: doc.data().content as string,
    imageUrl: (doc.data().imageUrl as string | null) ?? null,
    createdAt: (doc.data().createdAt as { toDate(): Date } | null)?.toDate() ?? new Date(),
  }));
}

export default function MessagesSection() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMessages().then(setMessages).finally(() => setIsLoading(false));
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be less than 10MB");
      return;
    }
    try {
      const resized = await resizeImage(file, 800, 800, 0.75);
      setImagePreview(resized);
    } catch {
      alert("Failed to process image. Please try another.");
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "messages"), {
        name: name.trim(),
        content: content.trim(),
        imageUrl: imagePreview ?? null,
        createdAt: serverTimestamp(),
      });
      const updated = await fetchMessages();
      setMessages(updated);
      setName("");
      setContent("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: formRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          { opacity: 0 },
          {
            opacity: 1, duration: 1, ease: "power3.out", delay: 0.4,
            scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [messages]);

  return (
    <section id="messages-section" ref={sectionRef} className="relative w-full bg-sand py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="font-display text-5xl lg:text-6xl text-sacred mb-4 opacity-0">
            Write a Message for Naila
          </h2>
          <p className="font-serif text-xl text-sacred/60 italic font-bold max-w-2xl mx-auto">
            Please feel free to add your messages of condolence on this page.
            The family request that you include any anecdotes, stories or photos
            to recount your memories of Naila.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="mb-16 p-8 rounded-[40px] bg-sacred shadow-xl shadow-sacred/20 opacity-0">
          <div className="mb-6">
            <label htmlFor="name" className="block font-display text-xl text-sand mb-3">Your Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-6 py-4 rounded-full bg-sacred border border-sand/20 text-sand font-serif text-lg placeholder:text-sand/40 focus:outline-none focus:border-sage/50 transition-colors"
              required
              maxLength={255}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block font-display text-xl text-sand mb-3">Your Message</label>
            <textarea
              id="message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message, prayer, or memory..."
              rows={4}
              className="w-full px-6 py-4 rounded-3xl bg-sacred border border-sand/20 text-sand font-serif text-lg placeholder:text-sand/40 focus:outline-none focus:border-sage/50 transition-colors resize-none"
              required
              maxLength={2000}
            />
          </div>

          <div className="mb-8">
            <label className="block font-display text-xl text-sand mb-3">Photo (optional)</label>
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded-2xl border border-sand/20" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-terracotta text-sand flex items-center justify-center text-sm hover:bg-terracotta/80 transition-colors shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border-2 border-dashed border-sand/20 text-sand/50 hover:border-sand/40 hover:text-sand/70 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-serif text-base">Add a photo</span>
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <p className="font-serif text-xs text-sand/30 mt-2">Images are resized and compressed automatically. Max upload 10MB.</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-serif text-sm text-sand/40">{content.length}/2000 characters</span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 rounded-full bg-terracotta text-sand font-serif text-lg tracking-wider hover:bg-terracotta/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-terracotta/30"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-sacred/20 border-t-sacred rounded-full animate-spin" />
            <p className="font-serif text-sacred/50 mt-4">Loading messages...</p>
          </div>
        ) : messages.length > 0 ? (
          <div>
            <h3 className="font-display text-3xl text-sacred text-center mb-10">Messages of Love</h3>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0">
              {messages.map((msg, index) => (
                <MessageCard key={msg.id} message={msg} index={index} onSelect={setSelectedMessage} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-display text-3xl text-sacred/30 mb-3">No messages yet</p>
            <p className="font-serif text-sacred/40">Be the first to share your memories of Naila</p>
          </div>
        )}
      </div>

      <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
    </section>
  );
}
