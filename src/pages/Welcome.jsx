import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    // In a real app this would authenticate; for now just proceed
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top section */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-12 pb-6">
        <SipLogo size={64} className="mb-5" />
        <h1 className="text-2xl font-black text-dark tracking-tight mb-1">
          Welcome to SIP
        </h1>
        <p className="text-muted text-sm mb-1">Coffee & Kitchen</p>
        <div className="inline-flex items-center gap-1.5 bg-bg rounded-full px-4 py-1.5 mt-3">
          <span className="text-xs font-medium text-dark">Table #{table}</span>
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-5 pb-8 max-w-md mx-auto w-full">
        {!showLogin ? (
          <div className="space-y-3">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full flex items-center justify-center gap-2 bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer hover:bg-dark/90 transition-colors"
            >
              <Mail size={18} />
              Sign in with email
            </button>
            <button
              onClick={handleGuest}
              className="w-full flex items-center justify-center gap-2 bg-white text-dark py-4 rounded-full font-semibold text-[15px] border border-border cursor-pointer hover:bg-bg transition-colors"
            >
              Continue as guest
              <ArrowRight size={16} />
            </button>
            <p className="text-center text-[11px] text-muted mt-4">
              Sign in to earn loyalty points and track your orders
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-bg border-none text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-dark/10"
            />
            <button
              type="submit"
              className="w-full bg-dark text-white py-4 rounded-full font-semibold text-[15px] cursor-pointer hover:bg-dark/90 transition-colors"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="w-full text-center text-sm text-muted cursor-pointer hover:text-dark transition-colors"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
