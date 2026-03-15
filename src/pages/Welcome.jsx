import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Hash, ArrowRight, Coffee } from "lucide-react";
import { useTable } from "../context/TableContext";

export default function Welcome() {
  const [mode, setMode] = useState(null); // 'qr' | 'manual'
  const [selectedTable, setSelectedTable] = useState(null);
  const [scanning, setScanning] = useState(false);
  const { selectTable } = useTable();
  const navigate = useNavigate();

  const tables = Array.from({ length: 16 }, (_, i) => i + 1);

  const handleQrScan = () => {
    setScanning(true);
    // Simulate QR scan — in production this would use a camera API
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
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-sip/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Coffee size={32} className="text-sip" />
          </div>
          <h1 className="font-[var(--font-display)] text-3xl font-bold text-white">
            Welcome to <span className="text-sip">SIP</span>
          </h1>
          <p className="text-white/40 text-sm mt-2">
            How would you like to get started?
          </p>
        </div>

        {/* Mode Selection */}
        {!mode && (
          <div className="space-y-3">
            <button
              onClick={() => {
                setMode("qr");
                handleQrScan();
              }}
              className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sip/30 rounded-2xl p-5 text-left transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-sip/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sip/30 transition-colors">
                <QrCode size={22} className="text-sip" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  Scan QR Code
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  Scan the code on your table
                </p>
              </div>
              <ArrowRight size={16} className="text-white/30 group-hover:text-sip transition-colors" />
            </button>

            <button
              onClick={() => setMode("manual")}
              className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sip/30 rounded-2xl p-5 text-left transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                <Hash size={22} className="text-white/60" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  Enter Table Number
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  Select your table manually
                </p>
              </div>
              <ArrowRight size={16} className="text-white/30 group-hover:text-sip transition-colors" />
            </button>
          </div>
        )}

        {/* QR Scanning State */}
        {mode === "qr" && scanning && (
          <div className="text-center py-10">
            <div className="w-48 h-48 mx-auto border-2 border-dashed border-sip/40 rounded-3xl flex items-center justify-center mb-6 relative">
              <QrCode size={64} className="text-sip/30" />
              <div className="absolute inset-0 border-2 border-sip rounded-3xl animate-pulse" />
            </div>
            <p className="text-white/60 text-sm">Scanning...</p>
            <p className="text-white/30 text-xs mt-1">
              Point your camera at the QR code
            </p>
            <button
              onClick={() => {
                setMode(null);
                setScanning(false);
              }}
              className="mt-6 text-white/40 hover:text-white/60 text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Manual Table Selection */}
        {mode === "manual" && (
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">
              Select your table
            </p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {tables.map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedTable(num)}
                  className={`aspect-square rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                    selectedTable === num
                      ? "bg-sip text-white shadow-lg shadow-sip/30 scale-105"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={handleManualSelect}
              disabled={!selectedTable}
              className="w-full flex items-center justify-center gap-2 bg-sip hover:bg-sip-dark disabled:opacity-30 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer"
            >
              Continue to Menu
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => {
                setMode(null);
                setSelectedTable(null);
              }}
              className="w-full mt-3 text-white/40 hover:text-white/60 text-xs transition-colors cursor-pointer"
            >
              Go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
