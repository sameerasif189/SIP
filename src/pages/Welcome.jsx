import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import SipLogo from "../components/SipLogo";

export default function Welcome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const table = searchParams.get("table") || "1";

  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleGuest = () => {
    navigate("/");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
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
          className="text-muted text-sm mb-3"
        >
          Coffee & Kitchen
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="inline-flex items-center bg-sip-light text-sip rounded-full px-4 py-1.5"
        >
          <span className="text-xs font-bold">Table #{table}</span>
        </motion.div>
      </div>

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
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLogin(true)}
                className="w-full flex items-center justify-center gap-2 bg-sip text-white py-4 rounded-2xl font-semibold text-[15px] cursor-pointer shadow-lg shadow-sip/30"
              >
                <Mail size={18} />
                Sign in with email
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleGuest}
                className="w-full flex items-center justify-center gap-2 bg-white text-dark py-4 rounded-2xl font-semibold text-[15px] border border-border cursor-pointer hover:bg-bg transition-colors"
              >
                Continue as guest
                <ArrowRight size={16} />
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
              onSubmit={handleLogin}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sip/20"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-2xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sip/20"
              />
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-sip text-white py-4 rounded-2xl font-semibold text-[15px] cursor-pointer shadow-lg shadow-sip/30"
              >
                Continue
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
