export function LogoMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-lg font-semibold text-brand shadow-[0_0_30px_rgba(225,29,72,0.35)]">
      SM
      <span className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-brand-glow animate-pulse-glow" />
    </div>
  );
}
