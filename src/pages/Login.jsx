import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import SipLogo from "../components/SipLogo";
import { useTable } from "../context/TableContext";

// Floating logo with slow drift animation
function FloatingLogo({ size, x, y, delay = 0, duration = 6 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -12, 0, 8, 0],
        x: [0, 6, -4, 2, 0],
        rotate: [0, 2, -1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <SipLogo size={size} className="opacity-80" />
    </motion.div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { selectTable } = useTable();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login — go to table selection
    navigate("/welcome");
  };

  const handleGoogleSignIn = () => {
    navigate("/welcome");
  };

  const handleGuestContinue = () => {
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-dark relative overflow-hidden flex">
      {/* Floating logos background */}
      <div className="absolute inset-0">
        <FloatingLogo size={100} x="5%" y="8%" delay={0} duration={7} />
        <FloatingLogo size={48} x="70%" y="5%" delay={1} duration={5} />
        <FloatingLogo size={64} x="80%" y="60%" delay={0.5} duration={8} />
        <FloatingLogo size={36} x="15%" y="75%" delay={2} duration={6} />
        <FloatingLogo size={56} x="50%" y="85%" delay={1.5} duration={7} />

        {/* Center hero logo with rings */}
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
          <motion.div
            className="absolute w-[280px] h-[280px] rounded-[60px] border border-sip/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-[44px] border border-sip/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SipLogo size={120} />
          </motion.div>
        </div>
      </div>

      {/* Left side — branding (visible on larger screens) */}
      <div className="hidden md:flex flex-1 flex-col justify-end p-10 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <SipLogo size={40} />
          <div>
            <p className="text-white font-semibold text-sm">SiP</p>
            <p className="text-white/40 text-xs">Table ordering</p>
          </div>
        </div>
        <h2 className="font-[var(--font-display)] text-4xl font-bold text-white mt-4 mb-6">
          Sign in and order.
        </h2>
        <div className="flex gap-3">
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/70 text-xs px-3 py-1.5 rounded-full">
            <MapPin size={11} />
            F-8/3, Islamabad
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/70 text-xs px-3 py-1.5 rounded-full">
            <Clock size={11} />
            House service: 8 AM - 1 AM
          </span>
        </div>
      </div>

      {/* Right side — sign in card */}
      <div className="flex items-center justify-center w-full md:w-[420px] md:shrink-0 p-4 sm:p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm bg-dark-soft/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8"
        >
          {/* Mobile logo */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sip text-[10px] font-bold uppercase tracking-[0.15em] mb-1">
                Guest Sign In
              </p>
              <h1 className="font-[var(--font-display)] text-2xl font-bold text-white">
                {isSignUp ? "Create account" : "Welcome back"}
              </h1>
              <p className="text-white/40 text-sm mt-1">
                {isSignUp
                  ? "Sign up to place orders."
                  : "Use your account to view the menu and place an order."}
              </p>
            </div>
            <SipLogo size={40} className="md:hidden" />
          </div>

          {/* Google sign in */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-dark py-3 rounded-full font-semibold text-sm transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-[10px] font-semibold uppercase tracking-widest">
              or continue
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sip/50 focus:ring-1 focus:ring-sip/30 transition-all"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sip/50 focus:ring-1 focus:ring-sip/30 transition-all"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-sip/50 focus:ring-1 focus:ring-sip/30 transition-all pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-sip hover:bg-sip-dark text-dark font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer mt-1"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-white/40 text-xs mt-5">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sip hover:text-sip-light font-semibold transition-colors cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Register"}
            </button>
          </p>

          {/* Guest option */}
          <div className="border-t border-white/5 mt-5 pt-4">
            <button
              onClick={handleGuestContinue}
              className="w-full text-white/40 hover:text-white/60 text-xs font-medium transition-colors cursor-pointer"
            >
              Continue as Guest
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
