/**
 * Data layer for the Mesdio Quiz.
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
    id: "t_zumrut",
    name: "Zümrüt Bakırcı",
    subject: "Teacher",
    emoji: "💎",
    description: "Energetic and cheerful, with a heart as bright as a diamond.",
    color: "160 70% 45%",
  },
  {
    id: "t_hatice",
    name: "Hatice Özkaya",
    subject: "Teacher",
    emoji: "🌸",
    description: "Graceful and determined, always striving for excellence.",
    color: "340 70% 60%",
  },
  {
    id: "t_aysenur_y",
    name: "Ayşenur Yaman",
    subject: "Teacher",
    emoji: "✨",
    description: "Creative and spirited, bringing light to every classroom.",
    color: "200 70% 50%",
  },
  {
    id: "t_asia",
    name: "Asia Jathba",
    subject: "Teacher",
    emoji: "🌙",
    description: "Calm and peaceful, with a deep connection to her roots.",
    color: "45 70% 50%",
  },
  {
    id: "t_esra",
    name: "Esra Aydın",
    subject: "Teacher",
    emoji: "❄️",
    description: "Thoughtful and focused, with a passion for discovery.",
    color: "210 70% 60%",
  },
  {
    id: "t_funda",
    name: "Funda Öztürk",
    subject: "Teacher",
    emoji: "🍎",
    description: "Passionate and bright, always ready for a new challenge.",
    color: "0 70% 50%",
  },
  {
    id: "t_aysenur_u",
    name: "Ayşenur Uysal",
    subject: "Teacher",
    emoji: "🌵",
    description: "Resilient and calm, finding beauty in the simplest things.",
    color: "120 70% 40%",
  },
  {
    id: "t_naside",
    name: "Naşide Bozkaya",
    subject: "Teacher",
    emoji: "🕊️",
    description: "Kind and peaceful, bringing a sense of harmony to those around her.",
    color: "280 70% 60%",
  },
];

// --- Questions --------------------------------------------------------------
// Helper: build a weights array compactly
const w = (entries: Record<string, number>): AnswerWeight[] =>
  Object.entries(entries).map(([teacher_id, weight]) => ({ teacher_id, weight }));

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    question_text: "The country you most want to visit",
    answers: [
      { id: "q1a1", answer_text: "USA", weights: w({ t_zumrut: 1 }) },
      { id: "q1a2", answer_text: "Spain", weights: w({ t_hatice: 1, t_aysenur_y: 1 }) },
      { id: "q1a3", answer_text: "Mecca", weights: w({ t_asia: 1 }) },
      { id: "q1a4", answer_text: "Finland", weights: w({ t_esra: 1 }) },
      { id: "q1a5", answer_text: "Italy", weights: w({ t_funda: 1 }) },
      { id: "q1a6", answer_text: "Mexico", weights: w({ t_aysenur_u: 1 }) },
      { id: "q1a7", answer_text: "Palestine", weights: w({ t_naside: 1 }) },
    ],
  },
  {
    id: "q2",
    question_text: "What’s your star sign?",
    answers: [
      { id: "q2a1", answer_text: "Aries", weights: w({ t_asia: 1 }) },
      { id: "q2a2", answer_text: "Taurus", weights: w({ t_aysenur_u: 1 }) },
      { id: "q2a3", answer_text: "Gemini", weights: w({ t_naside: 1 }) },
      { id: "q2a4", answer_text: "Cancer", weights: w({ t_zumrut: 1, t_esra: 1 }) },
      { id: "q2a5", answer_text: "Leo", weights: w({ t_aysenur_y: 1 }) },
      { id: "q2a6", answer_text: "Virgo", weights: w({ t_esra: 1 }) },
      { id: "q2a7", answer_text: "Libra", weights: w({ t_hatice: 1 }) },
      { id: "q2a8", answer_text: "Scorpio", weights: w({ t_funda: 1 }) },
      { id: "q2a9", answer_text: "Sagittarius", weights: w({ t_asia: 1, t_zumrut: 1 }) },
      { id: "q2a10", answer_text: "Capricorn", weights: w({ t_hatice: 1 }) },
      { id: "q2a11", answer_text: "Aquarius", weights: w({ t_aysenur_y: 1, t_funda: 1 }) },
      { id: "q2a12", answer_text: "Pisces", weights: w({ t_naside: 1, t_aysenur_u: 1 }) },
    ],
  },
  {
    id: "q3",
    question_text: "If you could be an animal for a day, which animal would you choose?",
    answers: [
      { id: "q3a1", answer_text: "Cat", weights: w({ t_zumrut: 1 }) },
      { id: "q3a2", answer_text: "Bird", weights: w({ t_asia: 1, t_aysenur_y: 1, t_funda: 1, t_naside: 1 }) },
      { id: "q3a3", answer_text: "Penguin", weights: w({ t_esra: 1 }) },
      { id: "q3a4", answer_text: "Eagle", weights: w({ t_hatice: 1 }) },
      { id: "q3a5", answer_text: "Flamingo", weights: w({ t_aysenur_u: 1 }) },
    ],
  },
  {
    id: "q4",
    question_text: "The type of music you enjoy listening to the most",
    answers: [
      { id: "q4a1", answer_text: "Pop", weights: w({ t_zumrut: 1, t_aysenur_y: 1, t_funda: 1 }) },
      { id: "q4a2", answer_text: "Chant", weights: w({ t_asia: 1, t_naside: 1 }) },
      { id: "q4a3", answer_text: "Rock", weights: w({ t_esra: 1, t_aysenur_u: 1 }) },
    ],
  },
  {
    id: "q5",
    question_text: "The type of film you enjoy watching the most",
    answers: [
      { id: "q5a1", answer_text: "Romantic comedy", weights: w({ t_zumrut: 1 }) },
      { id: "q5a2", answer_text: "Action", weights: w({ t_asia: 1, t_hatice: 1 }) },
      { id: "q5a3", answer_text: "Horror", weights: w({ t_aysenur_y: 1, t_esra: 1 }) },
      { id: "q5a4", answer_text: "Science fiction", weights: w({ t_funda: 1 }) },
      { id: "q5a5", answer_text: "Other", weights: w({ t_naside: 1 }) },
    ],
  },
  {
    id: "q6",
    question_text: "If you had a superpower, what would it be?",
    answers: [
      { id: "q6a1", answer_text: "Invisibility", weights: w({ t_zumrut: 1 }) },
      { id: "q6a2", answer_text: "Speaking all languages", weights: w({ t_asia: 1 }) },
      { id: "q6a3", answer_text: "Enhance", weights: w({ t_aysenur_y: 1 }) },
      { id: "q6a4", answer_text: "Teleportation", weights: w({ t_esra: 1, t_aysenur_u: 1 }) },
      { id: "q6a5", answer_text: "Fly", weights: w({ t_hatice: 1, t_naside: 1 }) },
      { id: "q6a6", answer_text: "Read mind", weights: w({ t_funda: 1 }) },
    ],
  },
  {
    id: "q7",
    question_text: "What is your favourite season",
    answers: [
      { id: "q7a1", answer_text: "Summer", weights: w({ t_zumrut: 1, t_hatice: 1 }) },
      { id: "q7a2", answer_text: "Spring", weights: w({ t_aysenur_y: 1, t_naside: 1 }) },
      { id: "q7a3", answer_text: "Fall", weights: w({ t_asia: 1, t_funda: 1 }) },
      { id: "q7a4", answer_text: "Winter", weights: w({ t_esra: 1, t_aysenur_u: 1 }) },
    ],
  },
  {
    id: "q8",
    question_text: "What is your favourite colour",
    answers: [
      { id: "q8a1", answer_text: "Green", weights: w({ t_zumrut: 1, t_naside: 1 }) },
      { id: "q8a2", answer_text: "Maroon", weights: w({ t_asia: 1 }) },
      { id: "q8a3", answer_text: "Grey", weights: w({ t_aysenur_y: 1 }) },
      { id: "q8a4", answer_text: "Blue", weights: w({ t_esra: 1 }) },
      { id: "q8a5", answer_text: "Yellow", weights: w({ t_hatice: 1 }) },
      { id: "q8a6", answer_text: "Red", weights: w({ t_funda: 1 }) },
      { id: "q8a7", answer_text: "Dark blue", weights: w({ t_aysenur_u: 1 }) },
    ],
  },
  {
    id: "q9",
    question_text: "What is the personality you most often adopt in everyday life?",
    answers: [
      { id: "q9a1", answer_text: "Cheerful", weights: w({ t_zumrut: 1, t_asia: 1, t_esra: 1, t_funda: 1 }) },
      { id: "q9a2", answer_text: "Stressful", weights: w({ t_aysenur_y: 1, t_hatice: 1 }) },
      { id: "q9a3", answer_text: "Calm", weights: w({ t_aysenur_u: 1 }) },
      { id: "q9a4", answer_text: "Peaceful", weights: w({ t_naside: 1 }) },
    ],
  },
  {
    id: "q10",
    question_text: "Which football team do you support",
    answers: [
      { id: "q10a1", answer_text: "Galatasaray", weights: w({ t_zumrut: 1, t_aysenur_y: 1, t_aysenur_u: 1 }) },
      { id: "q10a2", answer_text: "Beşiktaş", weights: w({ t_hatice: 1 }) },
      { id: "q10a3", answer_text: "Fenerbahçe", weights: w({ t_funda: 1 }) },
      { id: "q10a4", answer_text: "Trabzonspor", weights: w({ t_esra: 1 }) },
      { id: "q10a5", answer_text: "Other", weights: w({}) },
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
 * Now uses absolute matching: (Teacher Score / Teacher Max Possible Score)
 * This allows reaching 100% if the user picks all answers associated with a teacher.
 */
export const computeResults = (scores: ScoreMap): RankedResult[] => {
  return TEACHERS.map((teacher) => {
    const score = scores[teacher.id] ?? 0;
    
    // Calculate max possible score for this specific teacher
    const maxPossible = QUESTIONS.reduce((sum, q) => {
      const teacherWeights = q.answers.flatMap(a => 
        a.weights.filter(w => w.teacher_id === teacher.id)
      );
      const maxWeightInQuestion = teacherWeights.length > 0 
        ? Math.max(...teacherWeights.map(w => w.weight)) 
        : 0;
      return sum + maxWeightInQuestion;
    }, 0) || 1;

    const percentage = Math.round((score / maxPossible) * 100);
    return { teacher, score, percentage };
  }).sort((a, b) => b.percentage - a.percentage);
};
