type Props = {
  direction: "left" | "right";
  onClick: () => void;
  accentColor?: string | null;
};

export default function ScrollArrow({ direction, onClick, accentColor }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 shrink-0"
      style={{
        borderColor: `${accentColor ?? "#ffffff"}30`,
        background: `${accentColor ?? "#ffffff"}0D`,
        color: `${accentColor ?? "#ffffff"}99`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = `${accentColor ?? "#ffffff"}26`;
        (e.currentTarget as HTMLButtonElement).style.color = accentColor ?? "#ffffff";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = `${accentColor ?? "#ffffff"}0D`;
        (e.currentTarget as HTMLButtonElement).style.color = `${accentColor ?? "#ffffff"}99`;
      }}
    >
      <svg
        className={`w-4 h-4 ${direction === "left" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
}