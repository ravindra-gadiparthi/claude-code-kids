import { Challenge } from '../types';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random challenges for a session
 * @param challenges - All available challenges for the subject/age
 * @param count - Number of challenges to select (default: 10)
 * @param completedIds - IDs of already completed challenges to avoid repetition
 * @returns Array of randomly selected challenges
 */
export function getRandomChallenges(
  challenges: Challenge[],
  count: number = 10,
  completedIds: string[] = []
): Challenge[] {
  if (challenges.length === 0) {
    return [];
  }

  // Separate completed and uncompleted challenges
  const uncompleted = challenges.filter(c => !completedIds.includes(c.id));
  const completed = challenges.filter(c => completedIds.includes(c.id));

  // Prioritize uncompleted challenges
  let selected: Challenge[] = [];

  if (uncompleted.length >= count) {
    // Enough uncompleted challenges - shuffle and take count
    selected = shuffleArray(uncompleted).slice(0, count);
  } else {
    // Not enough uncompleted - take all uncompleted + some completed
    selected = [
      ...shuffleArray(uncompleted),
      ...shuffleArray(completed).slice(0, count - uncompleted.length)
    ];
  }

  return selected;
}

/**
 * Get a weighted random selection based on difficulty
 * Easier questions have slightly higher probability for better learning curve
 */
export function getAdaptiveRandomChallenges(
  challenges: Challenge[],
  count: number = 10,
  completedIds: string[] = [],
  userLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
): Challenge[] {
  if (challenges.length === 0) {
    return [];
  }

  // Separate by completion status
  const uncompleted = challenges.filter(c => !completedIds.includes(c.id));
  const completed = challenges.filter(c => completedIds.includes(c.id));

  // Weight challenges based on difficulty and user level
  const weightedPool = uncompleted.length > 0 ? uncompleted : challenges;

  const weighted = weightedPool.map(challenge => {
    let weight = 1;

    // Adjust weight based on user level
    if (userLevel === 'beginner') {
      // Prefer easier challenges (difficulty 1-2)
      weight = challenge.difficulty <= 2 ? 3 : 1;
    } else if (userLevel === 'intermediate') {
      // Prefer medium challenges (difficulty 2-3)
      weight = challenge.difficulty === 2 || challenge.difficulty === 3 ? 3 : 1;
    } else {
      // Prefer harder challenges (difficulty 3-4)
      weight = challenge.difficulty >= 3 ? 3 : 1;
    }

    return { challenge, weight };
  });

  // Weighted random selection
  const selected: Challenge[] = [];
  const pool = [...weighted];

  while (selected.length < count && pool.length > 0) {
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < pool.length; i++) {
      random -= pool[i].weight;
      if (random <= 0) {
        selected.push(pool[i].challenge);
        pool.splice(i, 1);
        break;
      }
    }
  }

  // If we still need more, fill with completed challenges
  if (selected.length < count && completed.length > 0) {
    const remaining = count - selected.length;
    selected.push(...shuffleArray(completed).slice(0, remaining));
  }

  return selected;
}

/**
 * Determine user level based on their performance
 */
export function calculateUserLevel(
  totalChallenges: number,
  completedChallenges: number,
  averageAccuracy: number
): 'beginner' | 'intermediate' | 'advanced' {
  if (completedChallenges < 10 || averageAccuracy < 60) {
    return 'beginner';
  } else if (completedChallenges < 30 || averageAccuracy < 80) {
    return 'intermediate';
  } else {
    return 'advanced';
  }
}
