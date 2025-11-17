'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, AgeGroup } from '../types';
import { safeGetLocalStorage, safeSetLocalStorage, isLocalStorageAvailable } from '../utils/sanitize';
import { getNewlyEarnedBadges } from '../data/badges';

interface ProgressContextType {
  progress: UserProgress | null;
  setProgress: (progress: UserProgress) => void;
  addPoints: (points: number) => void;
  addStar: () => void;
  completeChallenge: (challengeId: string) => void;
  addBadge: (badgeId: string) => void;
  updateStreak: () => void;
  resetProgress: () => void;
  localStorageAvailable: boolean;
  checkAndAwardBadges: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgressState] = useState<UserProgress | null>(null);
  const [localStorageAvailable] = useState(isLocalStorageAvailable());
  const [showStorageWarning, setShowStorageWarning] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = safeGetLocalStorage<UserProgress>('kidsLearningProgress');
      if (savedProgress) {
        setProgressState(savedProgress);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress) {
      const success = safeSetLocalStorage('kidsLearningProgress', progress);
      if (!success && !showStorageWarning) {
        setShowStorageWarning(true);
        console.warn('Unable to save progress. Your progress may not persist.');
      }
    }
  }, [progress, showStorageWarning]);

  const setProgress = (newProgress: UserProgress) => {
    setProgressState(newProgress);
  };

  const addPoints = (points: number) => {
    if (progress && points > 0) {
      const newProgress = {
        ...progress,
        totalPoints: progress.totalPoints + points,
      };
      setProgressState(newProgress);
      // Check for newly earned badges after state update
      setTimeout(() => checkAndAwardBadges(), 100);
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
      const newProgress = {
        ...progress,
        completedChallenges: [...progress.completedChallenges, challengeId],
      };
      setProgressState(newProgress);
      // Check for newly earned badges after state update
      setTimeout(() => checkAndAwardBadges(), 100);
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

      const newProgress = {
        ...progress,
        currentStreak: newStreak,
        lastPlayedDate: today,
      };
      setProgressState(newProgress);
      // Check for newly earned badges after state update
      setTimeout(() => checkAndAwardBadges(), 100);
    }
  };

  const checkAndAwardBadges = () => {
    if (!progress) return;

    const newBadges = getNewlyEarnedBadges(progress.badges, {
      totalPoints: progress.totalPoints,
      currentStreak: progress.currentStreak,
      completedChallenges: progress.completedChallenges,
    });

    if (newBadges.length > 0) {
      const updatedProgress = {
        ...progress,
        badges: [...progress.badges, ...newBadges.map((b) => b.id)],
      };
      setProgressState(updatedProgress);

      // TODO: Show badge celebration animation
      console.log('🎉 New badges earned:', newBadges.map((b) => b.name).join(', '));
    }
  };

  const resetProgress = () => {
    localStorage.removeItem('kidsLearningProgress');
    setProgressState(null);
  };

  return (
    <>
      {showStorageWarning && !localStorageAvailable && (
        <div className="fixed top-4 right-4 bg-kid-orange text-white px-6 py-4 rounded-2xl shadow-lg z-50 max-w-md">
          <div className="font-bold mb-2">⚠️ Progress Not Saving</div>
          <div className="text-sm">
            Your browser's storage is disabled. Your progress won't be saved when you close this page.
          </div>
        </div>
      )}
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
          localStorageAvailable,
          checkAndAwardBadges,
        }}
      >
        {children}
      </ProgressContext.Provider>
    </>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
