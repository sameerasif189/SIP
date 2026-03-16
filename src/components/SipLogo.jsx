export default function SipLogo({ size = 48, className = "" }) {
  const fontSize = size * 0.36;
  const radius = size * 0.22;

  return (
    <div
      className={`bg-sip flex items-center justify-center shrink-0 shadow-lg ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
      }}
    >
      <span
        className="font-bold text-white leading-none select-none"
        style={{ fontSize }}
      >
        SiP
      </span>
    </div>
  );
}
