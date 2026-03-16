import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, MapPin, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import SipLogo from "../components/SipLogo";

// Floating logo with slow drift
function FloatingLogo({ size, x, y, delay = 0, duration = 6, opacity = 0.7 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity,
        scale: 1,
        y: [0, -14, 0, 10, 0],
        x: [0, 8, -5, 3, 0],
        rotate: [0, 3, -2, 1, 0],
      }}
      transition={{
        opacity: { duration: 1.2, delay },
        scale: { duration: 1.2, delay },
        y: { duration, delay, repeat: Infinity, ease: "easeInOut" },
        x: { duration: duration * 0.8, delay, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: duration * 1.2, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <SipLogo size={size} />
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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/welcome");
  };

  const handleGoogleSignIn = () => navigate("/welcome");
  const handleGuestContinue = () => navigate("/welcome");

  return (
    <div className="min-h-screen min-h-[100dvh] bg-dark relative overflow-hidden">
      {/* Floating logos */}
      <div className="absolute inset-0">
        <FloatingLogo size={110} x="2%" y="5%" delay={0} duration={8} opacity={0.55} />
        <FloatingLogo size={54} x="68%" y="2%" delay={0.8} duration={5.5} opacity={0.45} />
        <FloatingLogo size={74} x="80%" y="52%" delay={0.3} duration={9} opacity={0.5} />
        <FloatingLogo size={40} x="10%" y="68%" delay={1.5} duration={6.5} opacity={0.4} />
        <FloatingLogo size={48} x="42%" y="80%" delay={2} duration={7} opacity={0.35} />
        <FloatingLogo size={34} x="90%" y="12%" delay={1} duration={6} opacity={0.3} />

        {/* Glow */}
        <div className="absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sip/4 rounded-full blur-3xl hidden md:block" />

        {/* Center hero logo with rings — desktop */}
        <div className="absolute left-[42%] top-[38%] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
          <motion.div
            className="absolute w-[380px] h-[380px] rounded-[80px] border border-sip/6"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[290px] h-[290px] rounded-[62px] border border-sip/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-[44px] border border-sip/16"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SipLogo size={140} glow />
          </motion.div>
        </div>
      </div>

      {/* Layout */}
      <div className="relative z-10 min-h-screen min-h-[100dvh] flex flex-col md:flex-row">
        {/* Left branding — desktop */}
        <div className="hidden md:flex flex-1 flex-col justify-between p-10 lg:p-14">
          <div className="flex items-center gap-3">
            <SipLogo size={44} />
            <div>
              <p className="text-white font-bold text-sm tracking-wide">SiP</p>
              <p className="text-white/40 text-xs">Table ordering</p>
            </div>
          </div>

          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-[var(--font-display)] text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8"
            >
              Sign in<br />and order.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <span className="flex items-center gap-1.5 bg-white/8 backdrop-blur-sm text-white/70 text-xs px-4 py-2 rounded-full border border-white/5">
                <MapPin size={12} />
                F-8/3, Islamabad
              </span>
              <span className="flex items-center gap-1.5 bg-white/8 backdrop-blur-sm text-white/70 text-xs px-4 py-2 rounded-full border border-white/5">
                <Clock size={12} />
                8 AM - 1 AM
              </span>
              <span className="flex items-center gap-1.5 bg-sip/15 text-sip-light text-xs px-4 py-2 rounded-full border border-sip/20">
                <Star size={12} />
                4.8 · 2,729 reviews
              </span>
            </motion.div>
          </div>
        </div>

        {/* Mobile: big hero + card stacked */}
        <div className="flex-1 md:flex-none md:w-[470px] lg:w-[490px] flex flex-col md:justify-center p-5 sm:p-6 md:p-10">
          {/* Mobile hero */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden flex flex-col items-center pt-6 pb-8"
          >
            {/* Mobile center logo with rings */}
            <div className="relative flex items-center justify-center mb-6">
              <motion.div
                className="absolute w-[180px] h-[180px] rounded-[40px] border border-sip/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-[130px] h-[130px] rounded-[30px] border border-sip/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <SipLogo size={80} glow />
              </motion.div>
            </div>

            <h2 className="font-[var(--font-display)] text-3xl font-bold text-white text-center">
              Sign in and order.
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-white/40 text-xs">
                <MapPin size={10} />
                F-8/3, Islamabad
              </span>
              <span className="text-white/15">·</span>
              <span className="flex items-center gap-1 text-white/40 text-xs">
                <Clock size={10} />
                8 AM - 1 AM
              </span>
            </div>
          </motion.div>

          {/* Sign-in card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="w-full max-w-md mx-auto bg-dark-soft/60 backdrop-blur-2xl border border-white/8 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sip text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">
                  Guest Sign In
                </p>
                <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white">
                  {isSignUp ? "Create account" : "Welcome back"}
                </h1>
                <p className="text-white/40 text-sm mt-1.5 leading-relaxed max-w-[280px]">
                  {isSignUp
                    ? "Sign up to place orders and track them."
                    : "Use your account to view the menu and place an order."}
                </p>
              </div>
              <SipLogo size={44} className="hidden sm:flex mt-1" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-dark py-3.5 rounded-2xl font-semibold text-sm transition-colors cursor-pointer shadow-sm"
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
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-white/25 text-[10px] font-semibold uppercase tracking-[0.2em]">
                or continue
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-sip/50 focus:ring-1 focus:ring-sip/20 transition-all"
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-sip/50 focus:ring-1 focus:ring-sip/20 transition-all"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/8 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-sip/50 focus:ring-1 focus:ring-sip/20 transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-sip hover:bg-sip-dark text-dark font-bold py-3.5 rounded-xl text-sm transition-colors cursor-pointer mt-1 shadow-lg shadow-sip/20"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>

            <p className="text-center text-white/35 text-sm mt-6">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sip hover:text-sip-light font-semibold transition-colors cursor-pointer"
              >
                {isSignUp ? "Sign In" : "Register"}
              </button>
            </p>

            <div className="border-t border-white/5 mt-6 pt-5">
              <button
                onClick={handleGuestContinue}
                className="w-full py-3 rounded-xl border border-white/8 text-white/50 hover:text-white/70 hover:border-white/15 text-sm font-medium transition-all cursor-pointer"
              >
                Continue as Guest
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
