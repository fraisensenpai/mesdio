import { motion } from "framer-motion";
import type { Question } from "@/data/quiz";

type Props = {
  question: Question;
  selectedId: string | null;
  onSelect: (answerId: string) => void;
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export const QuestionCard = ({ question, selectedId, onSelect }: Props) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -32, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="rounded-3xl bg-surface border border-border shadow-soft-md p-7 sm:p-10">
        <h2 className="font-display text-2xl sm:text-[2rem] font-semibold leading-[1.15] text-foreground text-balance">
          {question.question_text}
        </h2>

        <div className="mt-7 sm:mt-9 grid gap-3">
          {question.answers.map((answer, i) => {
            const isSelected = selectedId === answer.id;
            return (
              <button
                key={answer.id}
                type="button"
                onClick={() => onSelect(answer.id)}
                disabled={selectedId !== null && !isSelected}
                className={[
                  "group relative w-full text-left rounded-2xl px-4 sm:px-5 py-4 sm:py-[1.05rem]",
                  "flex items-center gap-3.5 sm:gap-4",
                  "border-2 transition-[transform,background-color,border-color,box-shadow] duration-200 ease-spring",
                  "active:scale-[0.985] disabled:cursor-not-allowed",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-primary-glow -translate-y-0.5"
                    : "bg-secondary border-transparent hover:bg-surface hover:border-primary hover:-translate-y-0.5 hover:shadow-soft-md disabled:opacity-50",
                ].join(" ")}
              >
                <span
                  className={[
                    "shrink-0 w-8 h-8 rounded-xl grid place-items-center font-body font-bold text-sm transition-colors",
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-surface text-muted-foreground border border-border group-hover:text-primary group-hover:border-primary/40",
                  ].join(" ")}
                >
                  {LETTERS[i]}
                </span>
                <span className="font-body text-[1.02rem] sm:text-[1.075rem] font-medium leading-snug">
                  {answer.answer_text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
