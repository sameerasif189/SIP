import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Splash() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => navigate("/welcome", { replace: true }), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-white flex items-center justify-center z-[100]"
        >
          <div className="flex flex-col items-center">
            {/* Minimal logo text */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "-0.02em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl text-dark heading-font"
            >
              SIP
            </motion.h1>

            {/* Thin line expanding */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="h-[1.5px] bg-dark mt-3"
            />

            {/* Tagline fades in */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="text-muted text-xs tracking-widest uppercase mt-3"
            >
              Coffee & Kitchen
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
