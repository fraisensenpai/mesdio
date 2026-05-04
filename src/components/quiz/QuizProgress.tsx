import { motion } from "framer-motion";

type Props = {
  current: number; // 1-indexed
  total: number;
};

export const QuizProgress = ({ current, total }: Props) => {
  const pct = Math.min(100, Math.max(0, ((current - 1) / total) * 100));
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
          Question {current} <span className="text-muted-foreground/60">/ {total}</span>
        </span>
        <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-primary tabular-nums">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-border/70 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-hero"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />
      </div>
    </div>
  );
};
