export default function SipLogo({ size = 48, className = "" }) {
  const fontSize = size * 0.28;

  return (
    <div
      className={`bg-[#5C8A4D] rounded-full flex items-center justify-center shrink-0 shadow-md ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="font-bold text-white leading-none select-none tracking-tight"
        style={{ fontSize }}
      >
        SiP
      </span>
    </div>
  );
}
