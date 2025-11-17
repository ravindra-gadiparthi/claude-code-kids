'use client';

import { Subject } from '../types';
import { useProgress } from '../context/ProgressContext';
import { badges } from '../data/badges';

interface SubjectSelectorProps {
  onSelectSubject: (subject: Subject) => void;
}

export default function SubjectSelector({ onSelectSubject }: SubjectSelectorProps) {
  const { progress } = useProgress();

  const subjects = [
    {
      id: 'math' as Subject,
      name: 'Math',
      icon: '➕',
      description: 'Numbers, counting, and problem-solving',
      className: 'subject-card-math',
    },
    {
      id: 'reading' as Subject,
      name: 'Reading',
      icon: '📚',
      description: 'Letters, words, and comprehension',
      className: 'subject-card-reading',
    },
    {
      id: 'science' as Subject,
      name: 'Science',
      icon: '🔬',
      description: 'Discover the world around you',
      className: 'subject-card-science',
    },
    {
      id: 'art' as Subject,
      name: 'Art',
      icon: '🎨',
      description: 'Colors, shapes, and creativity',
      className: 'subject-card-art',
    },
  ];

  const earnedBadges = progress?.badges || [];
  const displayBadges = badges.filter(b => earnedBadges.includes(b.id)).slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Choose a Subject
        </h2>
        <p className="text-gray-600">Pick what you'd like to learn today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {subjects.map((subject, index) => (
          <button
            key={subject.id}
            onClick={() => onSelectSubject(subject.id)}
            className={`subject-card ${subject.className} animate-slide-up`}
            style={{ animationDelay: `${index * 100}ms` }}
            aria-label={`Start ${subject.name} challenges`}
          >
            <div className="text-5xl sm:text-6xl mb-4">{subject.icon}</div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{subject.name}</h3>
            <p className="text-sm sm:text-base opacity-90">{subject.description}</p>
          </button>
        ))}
      </div>

      {displayBadges.length > 0 && (
        <div className="card animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Your Badges
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {displayBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-3 text-center"
              >
                <div className="text-3xl mb-1">{badge.icon}</div>
                <div className="text-xs font-semibold text-gray-700">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
