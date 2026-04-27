import { motion } from "framer-motion";

export const CalculatingScreen = () => (
  <motion.div
    key="calculating"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center gap-7 text-center px-6"
  >
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-2 border-border" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin-slow" />
      <div className="absolute inset-3 rounded-full bg-gradient-hero animate-pulse-soft" />
    </div>
    <div className="space-y-2">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
        Analyzing your answers
      </h2>
      <p className="font-body text-muted-foreground text-base max-w-sm">
        Matching your personality to a teacher in our staff room…
      </p>
    </div>
  </motion.div>
);
