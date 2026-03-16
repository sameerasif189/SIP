export default function SipLogo({ size = 40, className = "", glow = false }) {
  const fontSize = size * 0.4;
  const radius = size * 0.26;
  const innerRadius = size * 0.22;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow effect */}
      {glow && (
        <div
          className="absolute inset-0 bg-sip/30 blur-xl rounded-full"
          style={{ transform: "scale(1.5)" }}
        />
      )}
      {/* Outer shell */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-sip via-sip to-sip-dark shadow-lg"
        style={{ borderRadius: radius }}
      />
      {/* Inner face */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          inset: size * 0.06,
          borderRadius: innerRadius,
          background: "linear-gradient(135deg, #A8BF98 0%, #8DAE7C 100%)",
        }}
      >
        <span
          className="font-[var(--font-display)] font-bold leading-none select-none"
          style={{
            fontSize,
            color: "#2A3A22",
            textShadow: "0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          SiP
        </span>
      </div>
    </div>
  );
}
