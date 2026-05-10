import { cn } from "@/lib/utils";

interface RollingTextProps {
  text: string;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
}

export default function RollingText({
  text,
  className,
  onClick,
  as = "button",
  href,
}: RollingTextProps) {
  const letters = text.split("");

  const content = (
    <span className={cn("rolling-text", className)}>
      <span className="block">
        {letters.map((letter, index) => (
          <span
            key={`top-${index}`}
            className="letter"
            style={{ transitionDelay: `${index * 0.015}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
      <span className="block">
        {letters.map((letter, index) => (
          <span
            key={`bot-${index}`}
            className="letter"
            style={{ transitionDelay: `${index * 0.015}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </span>
  );

  if (as === "a" && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button className="inline-block cursor-pointer" onClick={onClick}>
      {content}
    </button>
  );
}
