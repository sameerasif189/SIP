import { useNavigate, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { MapPin, Clock, Star } from "lucide-react";
import SipLogo from "../components/SipLogo";

export default function Scan() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const table = searchParams.get("table") || "1";

  const handleStart = () => {
    navigate(`/welcome?table=${table}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
      <SipLogo size={72} className="mb-6" />

      <h1 className="text-3xl font-black text-dark tracking-tight mb-1">SIP</h1>
      <p className="text-muted text-sm mb-6">Coffee & Kitchen</p>

      {/* QR Code display */}
      <div className="bg-bg rounded-2xl p-6 mb-6">
        <QRCodeSVG
          value={`${window.location.origin}/scan?table=${table}`}
          size={180}
          bgColor="transparent"
          fgColor="#1A1D1F"
          level="M"
        />
      </div>

      <p className="text-xs text-muted mb-1">Scan to order from</p>
      <p className="text-lg font-bold text-dark mb-1">Table #{table}</p>

      <div className="flex items-center gap-3 text-xs text-muted mt-2 mb-8">
        <span className="flex items-center gap-1">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          4.8
        </span>
        <span className="text-border">·</span>
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          F-8/3, Islamabad
        </span>
        <span className="text-border">·</span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          8 AM - 1 AM
        </span>
      </div>

      <button
        onClick={handleStart}
        className="w-full max-w-xs bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer hover:bg-dark/90 transition-colors"
      >
        Start ordering
      </button>
    </div>
  );
}
