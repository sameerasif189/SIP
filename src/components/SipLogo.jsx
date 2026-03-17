export default function SipLogo({ size = 48, className = "" }) {
  const fontSize = size * 0.28;

  return (
    <div
      className={`bg-[#F5F0E8] border-2 border-[#E8E0D0] rounded-full flex items-center justify-center shrink-0 shadow-md ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="font-bold text-dark leading-none select-none tracking-tight"
        style={{ fontSize }}
      >
        SiP
      </span>
    </div>
  );
}
