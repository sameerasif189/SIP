import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ChevronDown } from "lucide-react";
import SipLogo from "../components/SipLogo";

export default function Welcome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const table = searchParams.get("table") || "";

  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedTable, setSelectedTable] = useState(table);
  const [showTablePicker, setShowTablePicker] = useState(!table);

  const tables = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleGoogleLogin = () => {
    if (!selectedTable) {
      setShowTablePicker(true);
      return;
    }
    navigate("/menu");
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!selectedTable) {
      setShowTablePicker(true);
      return;
    }
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top section */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-5"
        >
          <SipLogo size={64} className="shadow-xl shadow-sip/20" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl font-black text-dark tracking-tight mb-1"
        >
          Welcome to SIP
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-sm mb-5"
        >
          Coffee & Kitchen
        </motion.p>

        {/* Table Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <button
            onClick={() => setShowTablePicker(true)}
            className="inline-flex items-center gap-2 bg-dark text-white rounded-full px-5 py-2.5 cursor-pointer hover:bg-dark/90 transition-colors"
          >
            <span className="text-sm font-semibold">
              {selectedTable ? `Table #${selectedTable}` : "Select your table"}
            </span>
            <ChevronDown size={16} />
          </button>
        </motion.div>
      </div>

      {/* Table Picker Modal */}
      <AnimatePresence>
        {showTablePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => selectedTable && setShowTablePicker(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-8"
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
              <h3 className="text-xl font-bold text-dark mb-1">Select your table</h3>
              <p className="text-muted text-sm mb-5">Choose the table number you're seated at</p>
              <div className="grid grid-cols-5 gap-3 max-h-60 overflow-y-auto">
                {tables.map((t) => (
                  <motion.button
                    key={t}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedTable(String(t));
                      setShowTablePicker(false);
                    }}
                    className={`aspect-square rounded-2xl flex items-center justify-center text-lg font-bold cursor-pointer transition-all ${
                      selectedTable === String(t)
                        ? "bg-dark text-white"
                        : "bg-bg text-dark hover:bg-border"
                    }`}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="px-5 pb-8 max-w-md mx-auto w-full"
      >
        <AnimatePresence mode="wait">
          {!showLogin ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {/* Google Sign In */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white text-dark py-4 rounded-2xl font-semibold text-[15px] border border-border cursor-pointer hover:bg-bg transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </motion.button>

              {/* Email Sign In */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLogin(true)}
                className="w-full flex items-center justify-center gap-2 bg-dark text-white py-4 rounded-2xl font-semibold text-[15px] cursor-pointer"
              >
                <Mail size={18} />
                Sign in with email
              </motion.button>

              <p className="text-center text-[11px] text-muted mt-4">
                Sign in to earn loyalty points and track your orders
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleEmailLogin}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
              />
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-dark text-white py-4 rounded-2xl font-semibold text-[15px] cursor-pointer"
              >
                Continue
                <ArrowRight size={16} className="inline ml-2" />
              </motion.button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="w-full text-center text-sm text-muted cursor-pointer hover:text-dark transition-colors"
              >
                Back
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
