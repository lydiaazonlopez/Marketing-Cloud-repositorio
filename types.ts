export interface DocLink {
  title: string;
  url: string;
  description: string;
  iconType?: 'api' | 'code' | 'help' | 'official' | 'guide' | 'learning';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface VideoMetadata {
  id: number;
  title: string;
  duration?: string;
  description: string;
  url: string;
}

export type ExerciseType = 'DATA_EXTENSION' | 'EMAIL' | 'JOURNEY' | 'SQL' | 'REPORTING' | 'LANDING';

export interface GradingResult {
  score: number;
  feedback: string;
}

export interface User {
  name: string;
  email: string;
}

export interface UserProgress {
  visitedVideos: number[];
  visitedDocs: string[];
  passedQuizzes: string[]; // IDs de los quizzes aprobados
  completedExercises: string[]; // Tipos/IDs de ejercicios aprobados (score >= 7)
}

export enum NavigationSection {
  HOME = 'home',
  DOCS = 'docs',
  VIDEOS = 'videos',
  SQL = 'sql',
  QUIZ = 'quiz',
  PRACTICAL_DE = 'practical-de',
  PRACTICAL_EMAIL = 'practical-email',
  JOURNEY_1 = 'journey-1',
  JOURNEY_2 = 'journey-2',
  JOURNEY_3 = 'journey-3',
  JOURNEY_4 = 'journey-4',
  JOURNEY_5 = 'journey-5',
  JOURNEY_6 = 'journey-6',
  PRACTICAL_REPORTING = 'practical-reporting',
  PRACTICAL_LANDINGS = 'practical-landings',
  PROGRESS = 'progress'
}