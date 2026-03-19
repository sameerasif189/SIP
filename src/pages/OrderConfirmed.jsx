import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MessageSquare, Star, X } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import SipLogo from "../components/SipLogo";

const EMOJI_FACES = ["😞", "😕", "😐", "🙂", "😍"];

const STATUS_MESSAGES = [
  "Your order has been placed. The kitchen will start on it shortly!",
  "Your order is being prepared by our chefs. Sit tight!",
  "Your order is ready and on its way to your table!",
  "Your order has been delivered to your table. If you have any problem, do not hesitate to contact the staff.",
];

export default function OrderConfirmed() {
  const location = useLocation();
  const {
    orderNumber = 0,
    grandTotal = 0,
    yourTotal = 0,
    splitMode = "full",
    splitCount = 2,
    items = [],
  } = location.state || {};

  const { activeOrder, ORDER_STEPS } = useOrder();
  const steps = ORDER_STEPS;
  const currentStep = activeOrder?.step ?? 3;

  const [showDetails, setShowDetails] = useState(false);

  // Review state
  const [showReview, setShowReview] = useState(false);
  const [reviewStep, setReviewStep] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState({ food: 0, service: 0, ambiance: 0, value: 0 });
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const setCategoryRating = (category, value) => {
    setCategoryRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleStarClick = (stars) => {
    setOverallRating(stars);
    setTimeout(() => setReviewStep(1), 400);
  };

  const handleSubmitReview = () => {
    setSubmitted(true);
    setTimeout(() => setShowReview(false), 1500);
  };

  return (
    <div className="min-h-screen bg-bg pb-24">
      <div className="max-w-lg mx-auto">
        {/* Header: Order more left | SipLogo center | Leave a review right */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-5 pt-8 pb-4"
        >
          <Link
            to="/menu"
            className="bg-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-dark/90 transition-colors"
          >
            Order more
          </Link>
          <SipLogo size={48} />
          {!submitted ? (
            <button
              onClick={() => setShowReview(true)}
              className="inline-flex items-center gap-1.5 bg-white border border-border text-dark px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-bg transition-colors cursor-pointer"
            >
              <Star size={14} />
              Review
            </button>
          ) : (
            <div className="w-[88px]" />
          )}
        </motion.div>

        {/* Main content card */}
        <div className="bg-white rounded-t-3xl min-h-[calc(100vh-100px)] px-5 pt-8 pb-8">

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl text-dark mb-1.5 heading-font"
          >
            {currentStep === 0 ? "Order placed!" : currentStep === 1 ? "Getting ready..." : currentStep === 2 ? "Almost ready!" : "Enjoy your meal"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm mb-6"
          >
            Your order is #{orderNumber}
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 mb-6"
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

          {/* Status message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#E8E4F8] rounded-2xl p-5 mb-6 flex gap-3"
          >
            <div className="w-8 h-8 bg-[#6B5CE7]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <MessageSquare size={16} className="text-[#6B5CE7]" />
            </div>
            <p className="text-dark text-sm leading-relaxed">
              {STATUS_MESSAGES[currentStep] || STATUS_MESSAGES[0]}
            </p>
          </motion.div>

          <div className="border-t border-border my-5" />

          {/* Total */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-between items-center mb-1"
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
              className="text-muted text-sm mb-3"
            >
              {splitMode === "even" ? `Split ${splitCount} ways` : splitMode === "custom" ? "Custom amount" : "Your items only"}
            </motion.p>
          )}

          {/* Order details expandable */}
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full py-3 cursor-pointer"
              >
                <span className="text-sm text-dark font-medium">Order details</span>
                {showDetails ? (
                  <ChevronUp size={16} className="text-muted" />
                ) : (
                  <ChevronDown size={16} className="text-muted" />
                )}
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-dark">
                            {item.name} {item.quantity > 1 ? `x ${item.quantity}` : ""}
                          </span>
                          <span className="text-dark font-medium">
                            Rs.{item.price * item.quantity}/-
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Alaaya Chand Raat banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 rounded-2xl overflow-hidden bg-[#1C3557] relative"
          >
            {/* Decorative stars & moons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <svg className="absolute top-5 right-6 opacity-25" width="24" height="24" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="white"/></svg>
              <svg className="absolute top-10 right-20 opacity-15" width="16" height="16" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="white"/></svg>
              <svg className="absolute bottom-8 right-10 opacity-20" width="20" height="20" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="white"/></svg>
              <svg className="absolute bottom-12 right-28 opacity-10" width="14" height="14" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="white"/></svg>
              <svg className="absolute top-8 right-36 opacity-15" width="12" height="12" viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="white"/></svg>
              {/* Crescent moons */}
              <svg className="absolute top-14 right-14 opacity-20" width="28" height="28" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="white"/></svg>
              <svg className="absolute bottom-5 right-32 opacity-15" width="18" height="18" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="white"/></svg>
            </div>
            <div className="p-8 relative z-10">
              <p className="text-[#7EB8F7] text-[11px] font-semibold uppercase tracking-widest mb-2">
                Chand Raat Special
              </p>
              <h3 className="text-white text-[24px] font-bold heading-font leading-tight mb-2 max-w-[70%]">
                Alaaya Chand Raat Is Coming To SiP
              </h3>
              <p className="text-white/55 text-[15px] leading-relaxed mb-6 max-w-[75%]">
                Celebrate Eid with live music, mehndi & our special festive menu — tonight only
              </p>
              <button className="bg-white/15 hover:bg-white/25 transition-colors text-white text-sm font-semibold px-5 py-3 rounded-full cursor-pointer">
                Discover
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Push notification style toast */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-4 right-4 z-40"
      >
        <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl shadow-dark/10 flex items-start gap-3">
          <SipLogo size={40} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-dark">Your order is ready, enjoy your meal!</p>
            <p className="text-xs text-muted mt-0.5">
              Hey, your order is on its way, the waiter will bring to you.
            </p>
          </div>
          <span className="text-xs text-muted shrink-0">now</span>
        </div>
      </motion.div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
            onClick={() => setShowReview(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#3D4F3D] rounded-t-3xl w-full max-w-lg min-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 shrink-0">
                <button onClick={() => { if (reviewStep === 1) setReviewStep(0); else setShowReview(false); }} className="cursor-pointer text-white/60">
                  <span className="text-sm">Back</span>
                </button>
                <button onClick={() => setShowReview(false)} className="cursor-pointer">
                  <X size={20} className="text-white/60" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 pb-8">
                <AnimatePresence mode="wait">
                  {reviewStep === 0 && (
                    <motion.div
                      key="stars"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center pt-12"
                    >
                      <SipLogo size={56} />
                      <h2 className="text-2xl font-bold text-white mt-6 mb-2 heading-font text-center">
                        Share your experience<br />at SiP
                      </h2>
                      <p className="text-white/50 text-sm mb-8">Click on stars to leave a review.</p>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} onClick={() => handleStarClick(star)} className="cursor-pointer transition-transform hover:scale-110">
                            <Star
                              size={40}
                              className={star <= overallRating ? "text-[#C5B97A]" : "text-[#6B7B6B]"}
                              fill={star <= overallRating ? "#C5B97A" : "none"}
                              strokeWidth={star <= overallRating ? 0 : 1.5}
                            />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {reviewStep === 1 && (
                    <motion.div
                      key="detailed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="flex justify-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} onClick={() => setOverallRating(star)} className="cursor-pointer">
                            <Star
                              size={28}
                              className={star <= overallRating ? "text-[#C5B97A]" : "text-[#6B7B6B]"}
                              fill={star <= overallRating ? "#C5B97A" : "none"}
                              strokeWidth={star <= overallRating ? 0 : 1.5}
                            />
                          </button>
                        ))}
                      </div>
                      <h2 className="text-xl font-bold text-white text-center mb-1 heading-font">Can you tell us more?</h2>
                      <p className="text-white/50 text-sm text-center mb-8">You've been served by our team.</p>

                      <div className="space-y-5 mb-8">
                        {[
                          { key: "food", label: "Food & Drinks" },
                          { key: "service", label: "Service" },
                          { key: "ambiance", label: "Ambiance" },
                          { key: "value", label: "Value for money" },
                        ].map(({ key, label }) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-white text-sm font-medium">{label}</span>
                            <div className="flex gap-1.5">
                              {EMOJI_FACES.map((emoji, i) => (
                                <button
                                  key={i}
                                  onClick={() => setCategoryRating(key, i + 1)}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all text-base ${
                                    categoryRatings[key] === i + 1 ? "bg-white/20 scale-110" : "bg-white/5 opacity-50 hover:opacity-80"
                                  }`}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Thank you so much, we really enjoyed it! A little note for next time, the music was a bit loud 🥰"
                        className="w-full bg-[#4A5C4A] text-white placeholder:text-white/30 rounded-2xl p-4 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-white/20 border-none"
                      />

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmitReview}
                        className="w-full bg-white text-[#3D4F3D] py-4 rounded-full font-semibold text-[15px] cursor-pointer mt-6"
                      >
                        Submit review
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
