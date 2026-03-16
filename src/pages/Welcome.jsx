import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Armchair, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTable } from "../context/TableContext";
import SipLogo from "../components/SipLogo";

// Floating logo
function FloatingLogo({ size, x, y, delay = 0, duration = 6 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -10, 0, 6, 0],
        x: [0, 5, -3, 2, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <SipLogo size={size} className="opacity-60" />
    </motion.div>
  );
}

export default function Welcome() {
  const [mode, setMode] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [scanning, setScanning] = useState(false);
  const { selectTable } = useTable();
  const navigate = useNavigate();

  const tables = Array.from({ length: 16 }, (_, i) => i + 1);

  const handleQrScan = () => {
    setScanning(true);
    setTimeout(() => {
      const simulatedTable = Math.floor(Math.random() * 16) + 1;
      setScanning(false);
      selectTable(String(simulatedTable));
      navigate("/home");
    }, 2000);
  };

  const handleManualSelect = () => {
    if (!selectedTable) return;
    selectTable(String(selectedTable));
    navigate("/home");
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-dark flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Floating logos */}
      <FloatingLogo size={72} x="8%" y="10%" delay={0} duration={7} />
      <FloatingLogo size={36} x="75%" y="8%" delay={1.2} duration={5} />
      <FloatingLogo size={44} x="85%" y="70%" delay={0.5} duration={8} />
      <FloatingLogo size={28} x="10%" y="80%" delay={2} duration={6} />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto mb-5 w-fit"
          >
            <SipLogo size={80} glow />
          </motion.div>
          <h1 className="font-[var(--font-display)] text-3xl font-bold text-white">
            Select your table
          </h1>
          <p className="text-white/40 text-sm mt-2">
            How would you like to get started?
          </p>
        </motion.div>

        {/* Mode Selection */}
        <AnimatePresence mode="wait">
          {!mode && (
            <motion.div
              key="mode-select"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                onClick={() => {
                  setMode("qr");
                  handleQrScan();
                }}
                className="w-full flex items-center gap-4 glass hover:bg-white/10 rounded-2xl p-5 text-left transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-sip/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sip/30 transition-colors">
                  <QrCode size={22} className="text-sip" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">Scan QR Code</p>
                  <p className="text-white/40 text-xs mt-0.5">Scan the code on your table</p>
                </div>
                <ArrowRight size={16} className="text-white/30 group-hover:text-sip transition-colors shrink-0" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                onClick={() => setMode("manual")}
                className="w-full flex items-center gap-4 glass hover:bg-white/10 rounded-2xl p-5 text-left transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                  <Armchair size={22} className="text-white/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">Choose Your Table</p>
                  <p className="text-white/40 text-xs mt-0.5">Select your table manually</p>
                </div>
                <ArrowRight size={16} className="text-white/30 group-hover:text-sip transition-colors shrink-0" />
              </motion.button>
            </motion.div>
          )}

          {/* QR Scanning */}
          {mode === "qr" && scanning && (
            <motion.div
              key="qr-scan"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-10"
            >
              <div className="w-48 h-48 mx-auto border-2 border-dashed border-sip/40 rounded-3xl flex items-center justify-center mb-6 relative">
                <QrCode size={64} className="text-sip/30" />
                <div className="absolute inset-0 border-2 border-sip rounded-3xl animate-pulse" />
              </div>
              <p className="text-white/60 text-sm">Scanning...</p>
              <p className="text-white/30 text-xs mt-1">Point your camera at the QR code</p>
              <button
                onClick={() => { setMode(null); setScanning(false); }}
                className="mt-6 text-white/40 hover:text-white/60 text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </motion.div>
          )}

          {/* Manual Table Selection */}
          {mode === "manual" && (
            <motion.div
              key="manual-select"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Armchair size={13} className="text-sip/60" />
                Select your table
              </p>
              <div className="grid grid-cols-4 gap-2.5 mb-6">
                {tables.map((num, i) => (
                  <motion.button
                    key={num}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02, duration: 0.2 }}
                    onClick={() => setSelectedTable(num)}
                    className={`aspect-square rounded-xl text-sm font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      selectedTable === num
                        ? "bg-sip text-dark shadow-lg shadow-sip/30 scale-105"
                        : "glass text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Armchair size={14} className={selectedTable === num ? "text-dark/50" : "text-white/25"} />
                    <span>{num}</span>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={handleManualSelect}
                disabled={!selectedTable}
                className="w-full flex items-center justify-center gap-2 bg-sip hover:bg-sip-dark disabled:opacity-30 disabled:cursor-not-allowed text-dark font-bold py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-sip/20"
              >
                Continue to Menu
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => { setMode(null); setSelectedTable(null); }}
                className="w-full mt-3 text-white/40 hover:text-white/60 text-xs transition-colors cursor-pointer"
              >
                Go back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
