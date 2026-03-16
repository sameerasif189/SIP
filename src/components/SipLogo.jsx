export default function SipLogo({ size = 40, className = "" }) {
  const fontSize = size * 0.38;
  const radius = size * 0.28;

  return (
    <div
      className={`bg-sip rounded-[${radius}px] flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
      }}
    >
      <span
        className="font-[var(--font-display)] font-bold text-dark leading-none"
        style={{ fontSize }}
      >
        SiP
      </span>
    </div>
  );
}
