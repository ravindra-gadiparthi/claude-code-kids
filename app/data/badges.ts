import { Badge } from '../types';

export const badges: Badge[] = [
  // Points-based badges
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Earn your first 10 points!',
    icon: '🎯',
    requirement: 10,
    type: 'points',
  },
  {
    id: 'star-learner',
    name: 'Star Learner',
    description: 'Collect 50 points!',
    icon: '⭐',
    requirement: 50,
    type: 'points',
  },
  {
    id: 'super-smart',
    name: 'Super Smart',
    description: 'Reach 100 points!',
    icon: '🌟',
    requirement: 100,
    type: 'points',
  },
  {
    id: 'genius',
    name: 'Genius',
    description: 'Amazing! 250 points!',
    icon: '🧠',
    requirement: 250,
    type: 'points',
  },
  {
    id: 'champion',
    name: 'Learning Champion',
    description: 'Incredible! 500 points!',
    icon: '👑',
    requirement: 500,
    type: 'points',
  },
  {
    id: 'legend',
    name: 'Legend',
    description: 'Legendary! 1000 points!',
    icon: '🏆',
    requirement: 1000,
    type: 'points',
  },

  // Streak-based badges
  {
    id: 'consistent',
    name: 'Consistent Learner',
    description: 'Learn 3 days in a row!',
    icon: '🔥',
    requirement: 3,
    type: 'streak',
  },
  {
    id: 'dedicated',
    name: 'Dedicated Student',
    description: 'Keep a 7-day streak!',
    icon: '💪',
    requirement: 7,
    type: 'streak',
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: '14-day streak! Amazing!',
    icon: '🚀',
    requirement: 14,
    type: 'streak',
  },
  {
    id: 'marathon',
    name: 'Marathon Learner',
    description: '30 days strong!',
    icon: '🎖️',
    requirement: 30,
    type: 'streak',
  },

  // Challenge completion badges
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Complete 5 challenges!',
    icon: '🎈',
    requirement: 5,
    type: 'challenges',
  },
  {
    id: 'challenge-master',
    name: 'Challenge Master',
    description: 'Complete 20 challenges!',
    icon: '🎯',
    requirement: 20,
    type: 'challenges',
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Finish 50 challenges!',
    icon: '💯',
    requirement: 50,
    type: 'challenges',
  },

  // Subject-specific badges
  {
    id: 'math-explorer',
    name: 'Math Explorer',
    description: 'Try all math challenges!',
    icon: '➕',
    requirement: 1, // Will be checked differently
    type: 'subject',
  },
  {
    id: 'reading-master',
    name: 'Reading Master',
    description: 'Try all reading challenges!',
    icon: '📚',
    requirement: 1,
    type: 'subject',
  },
  {
    id: 'science-genius',
    name: 'Science Genius',
    description: 'Try all science challenges!',
    icon: '🔬',
    requirement: 1,
    type: 'subject',
  },
  {
    id: 'creative-artist',
    name: 'Creative Artist',
    description: 'Try all art challenges!',
    icon: '🎨',
    requirement: 1,
    type: 'subject',
  },
  {
    id: 'well-rounded',
    name: 'Well-Rounded Learner',
    description: 'Try all 4 subjects!',
    icon: '🌈',
    requirement: 4,
    type: 'subject',
  },
];

/**
 * Check which badges a user has earned based on their progress
 */
export function checkBadgeEarned(
  badgeId: string,
  userProgress: {
    totalPoints: number;
    currentStreak: number;
    completedChallenges: string[];
  },
  allChallenges?: any[]
): boolean {
  const badge = badges.find((b) => b.id === badgeId);
  if (!badge) return false;

  switch (badge.type) {
    case 'points':
      return userProgress.totalPoints >= badge.requirement;

    case 'streak':
      return userProgress.currentStreak >= badge.requirement;

    case 'challenges':
      return userProgress.completedChallenges.length >= badge.requirement;

    case 'subject':
      // Special handling for subject badges
      if (badgeId === 'math-explorer') {
        return userProgress.completedChallenges.some((id) => id.startsWith('math-'));
      }
      if (badgeId === 'reading-master') {
        return userProgress.completedChallenges.some((id) => id.startsWith('reading-'));
      }
      if (badgeId === 'science-genius') {
        return userProgress.completedChallenges.some((id) => id.startsWith('science-'));
      }
      if (badgeId === 'creative-artist') {
        return userProgress.completedChallenges.some((id) => id.startsWith('art-'));
      }
      if (badgeId === 'well-rounded') {
        const hasMath = userProgress.completedChallenges.some((id) => id.startsWith('math-'));
        const hasReading = userProgress.completedChallenges.some((id) => id.startsWith('reading-'));
        const hasScience = userProgress.completedChallenges.some((id) => id.startsWith('science-'));
        const hasArt = userProgress.completedChallenges.some((id) => id.startsWith('art-'));
        return hasMath && hasReading && hasScience && hasArt;
      }
      return false;

    default:
      return false;
  }
}

/**
 * Get all newly earned badges (not already in user's collection)
 */
export function getNewlyEarnedBadges(
  currentBadges: string[],
  userProgress: {
    totalPoints: number;
    currentStreak: number;
    completedChallenges: string[];
  }
): Badge[] {
  const newBadges: Badge[] = [];

  for (const badge of badges) {
    // Skip if already earned
    if (currentBadges.includes(badge.id)) {
      continue;
    }

    // Check if newly earned
    if (checkBadgeEarned(badge.id, userProgress)) {
      newBadges.push(badge);
    }
  }

  return newBadges;
}

/**
 * Get next badges the user is close to earning
 */
export function getNextBadges(
  currentBadges: string[],
  userProgress: {
    totalPoints: number;
    currentStreak: number;
    completedChallenges: string[];
  },
  limit: number = 3
): Array<Badge & { progress: number }> {
  const nextBadges: Array<Badge & { progress: number }> = [];

  for (const badge of badges) {
    // Skip if already earned
    if (currentBadges.includes(badge.id)) {
      continue;
    }

    let progress = 0;

    switch (badge.type) {
      case 'points':
        progress = Math.min(100, (userProgress.totalPoints / badge.requirement) * 100);
        break;
      case 'streak':
        progress = Math.min(100, (userProgress.currentStreak / badge.requirement) * 100);
        break;
      case 'challenges':
        progress = Math.min(100, (userProgress.completedChallenges.length / badge.requirement) * 100);
        break;
      default:
        progress = 0;
    }

    if (progress > 0 && progress < 100) {
      nextBadges.push({ ...badge, progress });
    }
  }

  // Sort by progress (closest to completion first)
  nextBadges.sort((a, b) => b.progress - a.progress);

  return nextBadges.slice(0, limit);
}
