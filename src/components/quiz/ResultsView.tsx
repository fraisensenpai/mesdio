import { motion } from "framer-motion";
import { Sparkles, RotateCcw, Share2 } from "lucide-react";
import type { RankedResult } from "@/data/quiz";

type Props = {
  results: RankedResult[];
  onRestart: () => void;
};

export const ResultsView = ({ results, onRestart }: Props) => {
  const top = results[0];
  const rest = results.slice(1);

  const handleShare = async () => {
    const text = `I'm most like ${top.teacher.name} (${top.percentage}%) on the Teacher Match Quiz!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Teacher Match Quiz", text });
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-10 sm:py-16 px-5 sm:px-6">
      {/* Top match hero */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.05 }}
        className="relative"
      >
        <div className="rounded-[2rem] bg-surface border border-border shadow-soft-lg overflow-hidden">
          {/* Banner */}
          <div className="relative h-28 sm:h-32 bg-gradient-celebrate flex items-center justify-center">
            <div className="absolute inset-0 opacity-25 mix-blend-overlay"
                 style={{ backgroundImage: "radial-gradient(circle at 30% 30%, hsl(0 0% 100%) 0, transparent 40%), radial-gradient(circle at 70% 60%, hsl(0 0% 100%) 0, transparent 40%)" }} />
            <span className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/95 backdrop-blur font-body text-xs font-bold uppercase tracking-[0.14em] text-accent shadow-soft-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Top Match
            </span>
          </div>

          {/* Avatar */}
          <div className="-mt-14 flex justify-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.35 }}
              className="w-28 h-28 rounded-full grid place-items-center text-5xl bg-surface border-4 border-surface shadow-soft-lg"
              style={{ backgroundColor: `hsl(${top.teacher.color} / 0.12)` }}
            >
              <span aria-hidden>{top.teacher.emoji}</span>
            </motion.div>
          </div>

          <div className="px-6 sm:px-10 pt-5 pb-9 text-center">
            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              You are most like
            </p>
            <h1 className="mt-2 font-display text-[2.4rem] sm:text-[3.2rem] font-extrabold leading-[1.05] text-foreground text-balance">
              {top.teacher.name}
            </h1>
            <p className="mt-1.5 font-body text-sm text-muted-foreground">
              {top.teacher.subject}
            </p>

            <div className="mt-5 inline-flex items-baseline gap-1.5 px-4 py-2 rounded-full bg-accent/10 text-accent">
              <span className="font-display text-3xl font-extrabold tabular-nums">
                {top.percentage}%
              </span>
              <span className="font-body text-xs font-bold uppercase tracking-wider">
                match
              </span>
            </div>

            <p className="mt-5 font-body text-[1.02rem] leading-relaxed text-muted-foreground max-w-md mx-auto text-pretty">
              {top.teacher.description}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-foreground text-background font-body font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <Share2 className="w-4 h-4" />
                Share my result
              </button>
              <button
                onClick={onRestart}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-secondary text-foreground font-body font-semibold text-sm hover:bg-border/70 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Take it again
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Breakdown */}
      <div className="mt-10 sm:mt-14">
        <div className="flex items-baseline justify-between mb-5 px-1">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
            The full staff room
          </h2>
          <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Breakdown
          </span>
        </div>

        <div className="rounded-3xl bg-surface border border-border shadow-soft-sm p-5 sm:p-7 space-y-5">
          {results.map((r, i) => (
            <ResultBar key={r.teacher.id} result={r} index={i} isTop={i === 0} />
          ))}
        </div>

        <p className="mt-6 text-center font-body text-xs text-muted-foreground">
          Scores are weighted across all answers · {results.length} teachers
        </p>
      </div>
    </div>
  );
};

const ResultBar = ({ result, index, isTop }: { result: RankedResult; index: number; isTop: boolean }) => {
  const { teacher, percentage } = result;
  return (
    <div className="flex items-center gap-4">
      <div
        className="shrink-0 w-12 h-12 rounded-2xl grid place-items-center text-2xl border border-border"
        style={{ backgroundColor: `hsl(${teacher.color} / 0.12)` }}
      >
        <span aria-hidden>{teacher.emoji}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          <div className="min-w-0">
            <p className="font-display text-base font-semibold text-foreground truncate">
              {teacher.name}
            </p>
            <p className="font-body text-xs text-muted-foreground truncate">
              {teacher.subject}
            </p>
          </div>
          <span
            className={[
              "font-body text-sm font-bold tabular-nums shrink-0",
              isTop ? "text-accent" : "text-foreground/80",
            ].join(" ")}
          >
            {percentage}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 + index * 0.09 }}
            className="h-full rounded-full"
            style={{
              backgroundColor: isTop
                ? `hsl(var(--accent))`
                : `hsl(${teacher.color})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
