/**
 * Data layer for the Teacher Match Quiz.
 *
 * The shape of these types mirrors the intended Supabase schema:
 *   - teachers (id, name, image_url)
 *   - questions (id, question_text)
 *   - answers (id, question_id, answer_text)
 *   - answer_weights (id, answer_id, teacher_id, weight)
 *
 * When Lovable Cloud is enabled, replace the in-memory arrays below with
 * Supabase queries — no other file needs to change.
 */

export type Teacher = {
  id: string;
  name: string;
  subject: string;
  emoji: string;
  description: string;
  image_url?: string | null;
  color: string; // hsl token for the accent on results
};

export type AnswerWeight = {
  teacher_id: string;
  weight: number;
};

export type Answer = {
  id: string;
  answer_text: string;
  weights: AnswerWeight[];
};

export type Question = {
  id: string;
  question_text: string;
  answers: Answer[];
};

// --- Teachers ---------------------------------------------------------------
export const TEACHERS: Teacher[] = [
  {
    id: "t_atlas",
    name: "Mr. Atlas",
    subject: "Philosophy",
    emoji: "🧠",
    description:
      "The thoughtful one. Asks more questions than answers. Believes every late assignment is a chance for a Socratic dialogue.",
    color: "243 75% 59%",
  },
  {
    id: "t_nova",
    name: "Ms. Nova",
    subject: "Physics & Astronomy",
    emoji: "🪐",
    description:
      "Curious, calm, cosmic. Will derail any lecture for a good question about black holes — and you'll thank her for it.",
    color: "263 70% 62%",
  },
  {
    id: "t_ember",
    name: "Coach Ember",
    subject: "PE & Leadership",
    emoji: "🔥",
    description:
      "Pure energy. Believes 6 a.m. runs build character. Knows your name, your goals, and exactly when you're slacking.",
    color: "14 100% 65%",
  },
  {
    id: "t_iris",
    name: "Ms. Iris",
    subject: "Art & Design",
    emoji: "🎨",
    description:
      "Soft-spoken, sharp-eyed. Turns the classroom into a studio. Marks essays in three colors of fountain pen ink.",
    color: "330 75% 65%",
  },
  {
    id: "t_quill",
    name: "Mr. Quill",
    subject: "Literature & History",
    emoji: "📚",
    description:
      "Lives for a good footnote. Will read a passage out loud and pause for thirty seconds just to let it land.",
    color: "30 80% 55%",
  },
];

// --- Questions --------------------------------------------------------------
// Helper: build a weights array compactly
const w = (entries: Record<string, number>): AnswerWeight[] =>
  Object.entries(entries).map(([teacher_id, weight]) => ({ teacher_id, weight }));

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    question_text: "It's a free Saturday afternoon. Where do we find you?",
    answers: [
      {
        id: "q1a1",
        answer_text: "Re-reading a worn paperback in a sunny window",
        weights: w({ t_quill: 3, t_atlas: 2, t_iris: 1 }),
      },
      {
        id: "q1a2",
        answer_text: "Out on a long, lung-burning trail run",
        weights: w({ t_ember: 3, t_nova: 1 }),
      },
      {
        id: "q1a3",
        answer_text: "Sketching strangers at a café",
        weights: w({ t_iris: 3, t_quill: 1, t_atlas: 1 }),
      },
      {
        id: "q1a4",
        answer_text: "Watching a documentary about the universe",
        weights: w({ t_nova: 3, t_atlas: 2 }),
      },
    ],
  },
  {
    id: "q2",
    question_text: "Pick a tool you'd happily carry every day.",
    answers: [
      { id: "q2a1", answer_text: "A fountain pen", weights: w({ t_iris: 2, t_quill: 3 }) },
      { id: "q2a2", answer_text: "A stopwatch", weights: w({ t_ember: 3, t_nova: 1 }) },
      { id: "q2a3", answer_text: "A pocket telescope", weights: w({ t_nova: 3, t_atlas: 1 }) },
      { id: "q2a4", answer_text: "A worn leather notebook", weights: w({ t_atlas: 3, t_quill: 2 }) },
    ],
  },
  {
    id: "q3",
    question_text: "How do you usually settle a disagreement?",
    answers: [
      {
        id: "q3a1",
        answer_text: "Lay out the logic, point by patient point",
        weights: w({ t_atlas: 3, t_nova: 2 }),
      },
      {
        id: "q3a2",
        answer_text: "Hear them out, then write a careful reply",
        weights: w({ t_quill: 3, t_iris: 1 }),
      },
      {
        id: "q3a3",
        answer_text: "Suggest a long walk to talk it through",
        weights: w({ t_ember: 2, t_atlas: 2, t_iris: 1 }),
      },
      {
        id: "q3a4",
        answer_text: "Make something for them — a drawing, a small gift",
        weights: w({ t_iris: 3 }),
      },
    ],
  },
  {
    id: "q4",
    question_text: "Which compliment lands hardest?",
    answers: [
      { id: "q4a1", answer_text: "\"You see things nobody else notices.\"", weights: w({ t_iris: 2, t_atlas: 2, t_nova: 1 }) },
      { id: "q4a2", answer_text: "\"You make the hard thing look possible.\"", weights: w({ t_ember: 3 }) },
      { id: "q4a3", answer_text: "\"Talking to you, I feel smarter.\"", weights: w({ t_atlas: 3, t_quill: 1 }) },
      { id: "q4a4", answer_text: "\"You tell stories like nobody else.\"", weights: w({ t_quill: 3, t_iris: 1 }) },
    ],
  },
  {
    id: "q5",
    question_text: "Your ideal classroom looks like…",
    answers: [
      { id: "q5a1", answer_text: "Big windows, plants, soft music", weights: w({ t_iris: 3, t_quill: 1 }) },
      { id: "q5a2", answer_text: "A circle of chairs, no desks", weights: w({ t_atlas: 3, t_quill: 1 }) },
      { id: "q5a3", answer_text: "A field, a track, the open air", weights: w({ t_ember: 3 }) },
      { id: "q5a4", answer_text: "Dim lights, a projector, a starfield", weights: w({ t_nova: 3 }) },
    ],
  },
  {
    id: "q6",
    question_text: "A student is struggling. Your first move?",
    answers: [
      { id: "q6a1", answer_text: "Sit with them and ask what's really going on", weights: w({ t_atlas: 3, t_iris: 1 }) },
      { id: "q6a2", answer_text: "Build them a tougher routine to push through", weights: w({ t_ember: 3 }) },
      { id: "q6a3", answer_text: "Find a book that mirrors what they're feeling", weights: w({ t_quill: 3, t_iris: 1 }) },
      { id: "q6a4", answer_text: "Show them how small they are — in a good way", weights: w({ t_nova: 3, t_atlas: 1 }) },
    ],
  },
  {
    id: "q7",
    question_text: "Pick a beverage to get you through the day.",
    answers: [
      { id: "q7a1", answer_text: "Loose-leaf tea, properly steeped", weights: w({ t_quill: 3, t_iris: 1 }) },
      { id: "q7a2", answer_text: "Black coffee, no apologies", weights: w({ t_atlas: 2, t_ember: 2 }) },
      { id: "q7a3", answer_text: "An electrolyte drink in a metal bottle", weights: w({ t_ember: 3 }) },
      { id: "q7a4", answer_text: "A flat white, drawn on the side of the cup", weights: w({ t_iris: 3, t_nova: 1 }) },
    ],
  },
  {
    id: "q8",
    question_text: "What's your relationship with rules?",
    answers: [
      { id: "q8a1", answer_text: "Rules are scaffolding — useful, but not the building", weights: w({ t_atlas: 3, t_iris: 2 }) },
      { id: "q8a2", answer_text: "Discipline is freedom. Hold the line.", weights: w({ t_ember: 3, t_quill: 1 }) },
      { id: "q8a3", answer_text: "I respect them, then quietly bend the boring ones", weights: w({ t_nova: 2, t_iris: 2 }) },
      { id: "q8a4", answer_text: "Tradition exists for a reason — until it doesn't", weights: w({ t_quill: 3, t_atlas: 1 }) },
    ],
  },
  {
    id: "q9",
    question_text: "You're given a free hour. What wins?",
    answers: [
      { id: "q9a1", answer_text: "A nap. Earned, glorious, and short.", weights: w({ t_iris: 2, t_quill: 2 }) },
      { id: "q9a2", answer_text: "A workout. Move the body, clear the head.", weights: w({ t_ember: 3 }) },
      { id: "q9a3", answer_text: "Stargazing app, balcony, silence.", weights: w({ t_nova: 3, t_atlas: 1 }) },
      { id: "q9a4", answer_text: "Argue (kindly) with someone smart on the internet.", weights: w({ t_atlas: 3 }) },
    ],
  },
  {
    id: "q10",
    question_text: "Pick a phrase you'd happily put on a poster.",
    answers: [
      { id: "q10a1", answer_text: "\"The unexamined life is not worth living.\"", weights: w({ t_atlas: 3 }) },
      { id: "q10a2", answer_text: "\"We are made of star-stuff.\"", weights: w({ t_nova: 3 }) },
      { id: "q10a3", answer_text: "\"Pain is temporary. Quitting is forever.\"", weights: w({ t_ember: 3 }) },
      { id: "q10a4", answer_text: "\"Creativity takes courage.\"", weights: w({ t_iris: 3, t_quill: 1 }) },
    ],
  },
];

// --- Helpers ----------------------------------------------------------------
export type ScoreMap = Record<string, number>;

export type RankedResult = {
  teacher: Teacher;
  score: number;
  percentage: number;
};

/**
 * Calculate ranked percentage results from collected scores.
 * Formula (per spec): (teacher_score / total_score) * 100
 * Teachers with 0 score are still included so the user sees the full panel.
 */
export const computeResults = (scores: ScoreMap): RankedResult[] => {
  const total = Object.values(scores).reduce((sum, n) => sum + n, 0) || 1;
  return TEACHERS.map((teacher) => {
    const score = scores[teacher.id] ?? 0;
    const percentage = Math.round((score / total) * 100);
    return { teacher, score, percentage };
  }).sort((a, b) => b.percentage - a.percentage);
};
