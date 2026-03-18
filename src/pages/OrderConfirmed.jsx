import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MessageSquare, X, Star } from "lucide-react";
import SipLogo from "../components/SipLogo";

const EMOJI_FACES = ["😞", "😕", "😐", "🙂", "😍"];

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

  const steps = ["Order placed", "Being prepared", "Ready to serve", "Delivered"];
  const currentStep = 3;

  const [showDetails, setShowDetails] = useState(false);

  // Review state
  const [showReview, setShowReview] = useState(false);
  const [reviewStep, setReviewStep] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState({
    food: 0,
    service: 0,
    ambiance: 0,
    value: 0,
  });
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Auto-show review after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!submitted) setShowReview(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [submitted]);

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
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl text-dark mb-1.5 heading-font"
          >
            Enjoy your meal
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
              Your order has been delivered to your table. If you have any problem, do not hesitate to contact the staff.
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

          {/* Review CTA Card */}
          {!submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-6"
            >
              <button
                onClick={() => setShowReview(true)}
                className="w-full bg-[#3D4F3D] text-white rounded-2xl p-6 cursor-pointer text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <SipLogo size={40} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 heading-font">
                  Share your experience at SiP
                </h3>
                <p className="text-white/60 text-sm mb-4">Click on stars to leave a review.</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={32}
                      className="text-[#C5B97A]"
                      fill="#C5B97A"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </button>
            </motion.div>
          )}

          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 bg-[#3D4F3D] text-white rounded-2xl p-6 text-center"
            >
              <p className="text-lg font-semibold mb-1">Thank you for your feedback!</p>
              <p className="text-white/60 text-sm">We appreciate your review.</p>
            </motion.div>
          )}
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

      {/* ── Review Modal ── */}
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
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 shrink-0">
                <button onClick={() => {
                  if (reviewStep === 1) setReviewStep(0);
                  else setShowReview(false);
                }} className="cursor-pointer text-white/60">
                  <span className="text-sm">Back</span>
                </button>
                <button onClick={() => setShowReview(false)} className="cursor-pointer">
                  <X size={20} className="text-white/60" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 pb-8">
                <AnimatePresence mode="wait">
                  {/* Step 0: Overall star rating */}
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
                          <button
                            key={star}
                            onClick={() => handleStarClick(star)}
                            className="cursor-pointer transition-transform hover:scale-110"
                          >
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

                  {/* Step 1: Detailed feedback */}
                  {reviewStep === 1 && (
                    <motion.div
                      key="detailed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="flex justify-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setOverallRating(star)}
                            className="cursor-pointer"
                          >
                            <Star
                              size={28}
                              className={star <= overallRating ? "text-[#C5B97A]" : "text-[#6B7B6B]"}
                              fill={star <= overallRating ? "#C5B97A" : "none"}
                              strokeWidth={star <= overallRating ? 0 : 1.5}
                            />
                          </button>
                        ))}
                      </div>

                      <h2 className="text-xl font-bold text-white text-center mb-1 heading-font">
                        Can you tell us more?
                      </h2>
                      <p className="text-white/50 text-sm text-center mb-8">
                        You've been served by our team.
                      </p>

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
                                    categoryRatings[key] === i + 1
                                      ? "bg-white/20 scale-110"
                                      : "bg-white/5 opacity-50 hover:opacity-80"
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
