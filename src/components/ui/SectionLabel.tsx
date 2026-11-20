type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export function SectionLabel({
  index,
  children,
  className = "",
  dark = false,
}: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 font-mono-label ${dark ? "text-ink/60" : "text-bone/55"} ${className}`}>
      <span className={dark ? "text-ink" : "text-gold"}>{index}</span>
      <span className={`h-px w-7 ${dark ? "bg-ink/40" : "bg-bone/30"}`} />
      <span>{children}</span>
    </div>
  );
}
