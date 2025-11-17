'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, AgeGroup } from '../types';

interface ProgressContextType {
  progress: UserProgress | null;
  setProgress: (progress: UserProgress) => void;
  addPoints: (points: number) => void;
  addStar: () => void;
  completeChallenge: (challengeId: string) => void;
  addBadge: (badgeId: string) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgressState] = useState<UserProgress | null>(null);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('kidsLearningProgress');
    if (savedProgress) {
      setProgressState(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress) {
      localStorage.setItem('kidsLearningProgress', JSON.stringify(progress));
    }
  }, [progress]);

  const setProgress = (newProgress: UserProgress) => {
    setProgressState(newProgress);
  };

  const addPoints = (points: number) => {
    if (progress) {
      setProgressState({
        ...progress,
        totalPoints: progress.totalPoints + points,
      });
    }
  };

  const addStar = () => {
    if (progress) {
      setProgressState({
        ...progress,
        totalStars: progress.totalStars + 1,
      });
    }
  };

  const completeChallenge = (challengeId: string) => {
    if (progress && !progress.completedChallenges.includes(challengeId)) {
      setProgressState({
        ...progress,
        completedChallenges: [...progress.completedChallenges, challengeId],
      });
    }
  };

  const addBadge = (badgeId: string) => {
    if (progress && !progress.badges.includes(badgeId)) {
      setProgressState({
        ...progress,
        badges: [...progress.badges, badgeId],
      });
    }
  };

  const updateStreak = () => {
    if (progress) {
      const today = new Date().toDateString();
      const lastPlayed = new Date(progress.lastPlayedDate).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      let newStreak = progress.currentStreak;

      if (lastPlayed === today) {
        // Already played today, no change
        return;
      } else if (lastPlayed === yesterday) {
        // Played yesterday, increment streak
        newStreak = progress.currentStreak + 1;
      } else {
        // Streak broken, reset to 1
        newStreak = 1;
      }

      setProgressState({
        ...progress,
        currentStreak: newStreak,
        lastPlayedDate: today,
      });
    }
  };

  const resetProgress = () => {
    localStorage.removeItem('kidsLearningProgress');
    setProgressState(null);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        setProgress,
        addPoints,
        addStar,
        completeChallenge,
        addBadge,
        updateStreak,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
