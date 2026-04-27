import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { CalculatingScreen } from "@/components/quiz/CalculatingScreen";
import { ResultsView } from "@/components/quiz/ResultsView";
import { QUESTIONS, TEACHERS, computeResults, type ScoreMap } from "@/data/quiz";

type Stage = "intro" | "quiz" | "calculating" | "results";

const Index = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scores, setScores] = useState<ScoreMap>({});

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[questionIndex];

  const results = useMemo(() => (stage === "results" ? computeResults(scores) : []), [stage, scores]);

  const handleStart = () => {
    setScores({});
    setQuestionIndex(0);
    setSelectedId(null);
    setStage("quiz");
  };

  const handleSelect = (answerId: string) => {
    if (selectedId) return;
    setSelectedId(answerId);

    const answer = currentQuestion.answers.find((a) => a.id === answerId);
    if (!answer) return;

    // Apply weights
    const next: ScoreMap = { ...scores };
    for (const w of answer.weights) {
      next[w.teacher_id] = (next[w.teacher_id] ?? 0) + w.weight;
    }

    // Let the user see their selection register, then advance
    window.setTimeout(() => {
      const isLast = questionIndex >= totalQuestions - 1;
      if (isLast) {
        setScores(next);
        setStage("calculating");
        window.setTimeout(() => setStage("results"), 1600);
      } else {
        setScores(next);
        setQuestionIndex((i) => i + 1);
        setSelectedId(null);
      }
    }, 380);
  };

  const handleRestart = () => {
    setStage("intro");
    setScores({});
    setQuestionIndex(0);
    setSelectedId(null);
  };

  // Results: scrollable layout
  if (stage === "results") {
    return (
      <main className="min-h-[100dvh] w-full">
        <ResultsView results={results} onRestart={handleRestart} />
      </main>
    );
  }

  // Intro / quiz / calculating: fixed-height, centered
  return (
    <main className="h-[100dvh] w-full flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 px-5 sm:px-8 pt-5 sm:pt-6">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="inline-flex items-center gap-2 font-display font-bold text-foreground">
            <span className="w-7 h-7 rounded-lg bg-gradient-hero grid place-items-center text-primary-foreground">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-[0.95rem] tracking-tight">Teacher Match</span>
          </div>
          {stage === "quiz" && (
            <button
              onClick={handleRestart}
              className="font-body text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Restart
            </button>
          )}
        </div>

        {stage === "quiz" && (
          <div className="mt-5 sm:mt-6">
            <QuizProgress current={questionIndex + 1} total={totalQuestions} />
          </div>
        )}
      </header>

      {/* Center stage */}
      <section className="flex-1 flex items-center justify-center px-5 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          {stage === "intro" && <IntroScreen key="intro" onStart={handleStart} totalQuestions={totalQuestions} />}
          {stage === "quiz" && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          )}
          {stage === "calculating" && <CalculatingScreen key="calc" />}
        </AnimatePresence>
      </section>

      {/* Footer hint */}
      <footer className="shrink-0 px-5 sm:px-8 pb-5 sm:pb-7 text-center">
        <p className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground/70">
          {stage === "intro" && `${TEACHERS.length} teachers · ${totalQuestions} questions · ~2 min`}
          {stage === "quiz" && "Tap an answer to continue"}
          {stage === "calculating" && "Almost there"}
        </p>
      </footer>
    </main>
  );
};

const IntroScreen = ({ onStart, totalQuestions }: { onStart: () => void; totalQuestions: number }) => (
  <motion.div
    key="intro"
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.97 }}
    transition={{ type: "spring", stiffness: 200, damping: 22 }}
    className="w-full max-w-xl mx-auto text-center"
  >
    <div className="rounded-[2rem] bg-surface border border-border shadow-soft-md p-8 sm:p-12">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-5">
        <Sparkles className="w-3 h-3" />
        Personality Quiz
      </span>

      <h1 className="font-display text-[2.4rem] sm:text-[3.4rem] font-extrabold leading-[1.02] text-foreground text-balance">
        Which teacher are <br className="hidden sm:block" />you most like?
      </h1>

      <p className="mt-5 font-body text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty max-w-md mx-auto">
        {totalQuestions} quick questions. One uncomfortably accurate match. No wrong answers — just the one that sounds most like you.
      </p>

      <button
        onClick={onStart}
        className="mt-8 group inline-flex items-center gap-2.5 pl-7 pr-5 py-4 rounded-2xl bg-foreground text-background font-body font-semibold text-base shadow-soft-md hover:shadow-soft-lg active:scale-[0.98] transition-[transform,box-shadow] duration-200 ease-spring"
      >
        Start the quiz
        <span className="w-7 h-7 rounded-xl bg-background/15 grid place-items-center group-hover:translate-x-0.5 transition-transform">
          <ArrowRight className="w-4 h-4" />
        </span>
      </button>
    </div>
  </motion.div>
);

export default Index;
