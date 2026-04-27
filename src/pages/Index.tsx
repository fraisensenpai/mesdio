import { useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { CalculatingScreen } from "@/components/quiz/CalculatingScreen";
import { ResultsView } from "@/components/quiz/ResultsView";
import { QUESTIONS, TEACHERS, computeResults, type ScoreMap } from "@/data/quiz";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


type Stage = "intro" | "quiz" | "calculating" | "results";

const Index = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scores, setScores] = useState<ScoreMap>({});
  const [userInfo, setUserInfo] = useState({ name: "", surname: "", className: "" });
  const [publicResults, setPublicResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (data) setPublicResults(data);
      if (error) console.error("Error fetching public results:", error);
    };

    fetchResults();
  }, [stage]);



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
        const finalResults = computeResults(next);
        setStage("calculating");
        
        // Send to Supabase
        const sendData = async () => {
          try {
            await supabase.from("quiz_results").insert([
              {
                name: userInfo.name,
                surname: userInfo.surname,
                class_name: userInfo.className,
                top_match: finalResults[0].teacher.name,
                percentage: finalResults[0].percentage,
                all_results: finalResults,
              },
            ]);
          } catch (error) {
            console.error("Error sending to Supabase:", error);
          }
        };
        sendData();

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
            <img src="/mesdio.jpeg" alt="Mesdio Logo" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-[1.1rem] tracking-tight">Mesdio</span>
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
          {stage === "intro" && (
            <IntroScreen 
              key="intro" 
              onStart={handleStart} 
              totalQuestions={totalQuestions} 
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              publicResults={publicResults}
            />

          )}
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
      <footer className="shrink-0 px-5 sm:px-8 pb-5 sm:pb-7 text-center space-y-2">
        <p className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground/70">
          {stage === "intro" && `${TEACHERS.length} teachers · ${totalQuestions} questions · ~2 min`}
          {stage === "quiz" && "Tap an answer to continue"}
          {stage === "calculating" && "Almost there"}
        </p>
        <p className="font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
          Made by <span className="text-primary/70">FraisenSenpai</span> with ❤️
        </p>
      </footer>
    </main>
  );
};

const IntroScreen = ({ onStart, totalQuestions, userInfo, setUserInfo, publicResults }: { 
  onStart: () => void; 
  totalQuestions: number;
  userInfo: { name: string; surname: string; className: string };
  setUserInfo: (val: any) => void;
  publicResults: any[];
}) => (
  <motion.div
    key="intro"
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.97 }}
    transition={{ type: "spring", stiffness: 200, damping: 22 }}
    className="w-full max-w-xl mx-auto text-center"
  >
    <div className="rounded-[2rem] bg-surface border border-border shadow-soft-md p-8 sm:p-12 overflow-y-auto max-h-[85vh]">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] mb-5">
        <Sparkles className="w-3 h-3" />
        Mesdio Personality Quiz
      </span>

      <h1 className="font-display text-[2.4rem] sm:text-[3.4rem] font-extrabold leading-[1.02] text-foreground text-balance">
        Which teacher do <br className="hidden sm:block" />you resemble?
      </h1>

      <div className="mt-8 space-y-4 text-left max-w-xs mx-auto">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">First Name</Label>
          <Input 
            id="name" 
            placeholder="Your name" 
            className="rounded-xl border-border bg-background focus:ring-primary h-12"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="surname" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Last Name</Label>
          <Input 
            id="surname" 
            placeholder="Your surname" 
            className="rounded-xl border-border bg-background focus:ring-primary h-12"
            value={userInfo.surname}
            onChange={(e) => setUserInfo({ ...userInfo, surname: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="class" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Class</Label>
          <Input 
            id="class" 
            placeholder="e.g. 9-A" 
            className="rounded-xl border-border bg-background focus:ring-primary h-12"
            value={userInfo.className}
            onChange={(e) => setUserInfo({ ...userInfo, className: e.target.value })}
          />
        </div>
      </div>


      <button
        onClick={onStart}
        disabled={!userInfo.name || !userInfo.surname || !userInfo.className}
        className="mt-8 group inline-flex items-center gap-2.5 pl-7 pr-5 py-4 rounded-2xl bg-foreground text-background font-body font-semibold text-base shadow-soft-md hover:shadow-soft-lg active:scale-[0.98] transition-[transform,box-shadow] duration-200 ease-spring disabled:opacity-50 disabled:cursor-not-allowed w-full justify-center"
      >
        Start the quiz
        <span className="w-7 h-7 rounded-xl bg-background/15 grid place-items-center group-hover:translate-x-0.5 transition-transform ml-2">
          <ArrowRight className="w-4 h-4" />
        </span>
      </button>

      {publicResults.length > 0 && (
        <div className="mt-12 text-left">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Recent Matches</h3>
            <Link to="/results" className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity">
              <Trophy className="w-3 h-3" />
              View Hall of Fame
            </Link>
          </div>
          <div className="space-y-3">
            {publicResults.map((res: any, idx: number) => (
              <div key={res.id || idx} className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border/50">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-foreground">{res.name} {res.surname}</span>
                  <span className="font-body text-[0.65rem] text-muted-foreground uppercase tracking-wider">Class {res.class_name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-display font-extrabold text-primary text-sm">{res.top_match}</span>
                  <span className="font-body text-[0.65rem] text-muted-foreground">{res.percentage}% Match</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  </motion.div>
);



export default Index;
