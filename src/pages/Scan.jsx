import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { MapPin, Clock } from "lucide-react";
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-5"
        >
          <SipLogo size={72} className="shadow-xl shadow-sip/20" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black text-dark tracking-tight mb-0.5"
        >
          SIP
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-muted text-sm mb-8"
        >
          Coffee & Kitchen
        </motion.p>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
          className="bg-sip-light rounded-3xl p-8 mb-6 inline-block"
        >
          <QRCodeSVG
            value={`${window.location.origin}/scan?table=${table}`}
            size={180}
            bgColor="transparent"
            fgColor="#1A1D1F"
            level="M"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs text-muted mb-1">Scan to order from</p>
          <div className="inline-flex items-center bg-sip-light text-sip rounded-full px-4 py-2 text-sm font-bold mb-4">
            Table #{table}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex items-center justify-center gap-3 text-xs text-muted mb-8"
        >
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            F-8/3, Islamabad
          </span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            8 AM – 1 AM
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="w-full max-w-xs bg-sip text-white py-4 rounded-2xl font-semibold text-[15px] cursor-pointer shadow-lg shadow-sip/30 hover:shadow-xl hover:shadow-sip/40 transition-shadow"
        >
          Start ordering
        </motion.button>
      </motion.div>
    </div>
  );
}
