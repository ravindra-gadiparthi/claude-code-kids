export type AgeGroup = '3-5' | '6-8' | '9-10';

export type Subject = 'math' | 'reading' | 'science' | 'art';

export interface Challenge {
  id: string;
  subject: Subject;
  ageGroup: AgeGroup;
  title: string;
  description: string;
  type: 'multiple-choice' | 'drag-drop' | 'drawing' | 'counting' | 'matching' | 'sorting';
  difficulty: number;
  points: number;
  question?: string;
  options?: string[];
  correctAnswer?: string | number;
  image?: string;
}

export interface UserProgress {
  name: string;
  ageGroup: AgeGroup;
  totalPoints: number;
  totalStars: number;
  badges: string[];
  completedChallenges: string[];
  currentStreak: number;
  lastPlayedDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'points' | 'streak' | 'challenges' | 'subject';
}
