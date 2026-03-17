import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, MessageSquare } from "lucide-react";
import SipLogo from "../components/SipLogo";

export default function OrderConfirmed() {
  const location = useLocation();
  const {
    orderNumber = 0,
    grandTotal = 0,
    yourTotal = 0,
    splitMode = "full",
    splitCount = 2,
  } = location.state || {};

  const steps = ["Order placed", "Being prepared", "Ready to serve", "Delivered"];
  const currentStep = 3; // Show as fully delivered (all steps complete)

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-lg mx-auto">
        {/* Top header with logo + Order more */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-5 pt-8 pb-4"
        >
          <SipLogo size={48} />
          <Link
            to="/menu"
            className="bg-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-dark/90 transition-colors"
          >
            Order more
          </Link>
        </motion.div>

        {/* Main content card */}
        <div className="bg-white rounded-t-3xl min-h-[calc(100vh-100px)] px-5 pt-8 pb-8">
          {/* Enjoy your meal */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl text-dark mb-2 heading-font"
          >
            Enjoy your meal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm mb-8"
          >
            Your order is #{orderNumber}
          </motion.p>

          {/* Progress bar - Sunday style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 mb-8"
          >
            {steps.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                className={`flex-1 h-1.5 rounded-full origin-left ${
                  i <= currentStep ? "bg-dark" : "bg-border"
                }`}
              />
            ))}
          </motion.div>

          {/* Status message - Sunday style bubble */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#E8E4F8] rounded-2xl p-5 mb-8 flex gap-3"
          >
            <div className="w-8 h-8 bg-[#6B5CE7]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <MessageSquare size={16} className="text-[#6B5CE7]" />
            </div>
            <p className="text-dark text-sm leading-relaxed">
              Your order has been already delivered to your table. If you have any problem, do not hesitate to contact the staff.
            </p>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-border my-6" />

          {/* Total */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-between items-center mb-4"
          >
            <span className="text-2xl text-dark price-font">Total</span>
            <span className="text-2xl text-dark price-font">
              Rs.{splitMode === "full" ? grandTotal : yourTotal}/-
            </span>
          </motion.div>

          {splitMode !== "full" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="text-muted text-sm mb-4"
            >
              {splitMode === "even" ? `Split ${splitCount} ways` : "Your items only"}
            </motion.p>
          )}

          {/* Order details expandable */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-between w-full py-3 cursor-pointer"
          >
            <span className="text-sm text-dark font-medium">Order details</span>
            <ChevronRight size={16} className="text-muted" />
          </motion.button>
        </div>
      </div>

      {/* Push notification style toast */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-4 right-4 z-50"
      >
        <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl shadow-dark/10 flex items-start gap-3">
          <div className="w-10 h-10 bg-[#F5F0E8] border border-[#E8E0D0] rounded-xl flex items-center justify-center shrink-0">
            <span className="text-dark text-xs font-bold">SiP</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-dark">Your order is ready, enjoy your meal!</p>
            <p className="text-xs text-muted mt-0.5">
              Hey, your order is on its way, the waiter will bring to you.
            </p>
          </div>
          <span className="text-xs text-muted shrink-0">now</span>
        </div>
      </motion.div>
    </div>
  );
}
