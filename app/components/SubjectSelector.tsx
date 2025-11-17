'use client';

import { Subject } from '../types';

interface SubjectSelectorProps {
  onSelectSubject: (subject: Subject) => void;
}

export default function SubjectSelector({ onSelectSubject }: SubjectSelectorProps) {
  const subjects = [
    {
      id: 'math' as Subject,
      name: 'Math Adventure',
      icon: '➕',
      color: 'from-kid-blue to-kid-purple',
      description: 'Count, add, and solve fun puzzles!',
    },
    {
      id: 'reading' as Subject,
      name: 'Reading Quest',
      icon: '📚',
      color: 'from-kid-pink to-kid-orange',
      description: 'Learn letters and words!',
    },
    {
      id: 'science' as Subject,
      name: 'Science Explorer',
      icon: '🔬',
      color: 'from-kid-green to-kid-blue',
      description: 'Discover amazing facts!',
    },
    {
      id: 'art' as Subject,
      name: 'Creative Studio',
      icon: '🎨',
      color: 'from-kid-yellow to-kid-pink',
      description: 'Draw, color, and create!',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-5xl font-bold text-white text-center mb-12">
        Choose Your Adventure! 🚀
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelectSubject(subject.id)}
            className={`bg-gradient-to-br ${subject.color} rounded-3xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl active:scale-95`}
          >
            <div className="text-8xl mb-4">{subject.icon}</div>
            <h3 className="text-4xl font-bold text-white mb-3">{subject.name}</h3>
            <p className="text-2xl text-white/90">{subject.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-12 bg-white/90 rounded-3xl p-8 shadow-xl">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🏆 Your Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AchievementBadge icon="🎯" title="First Steps" locked={false} />
          <AchievementBadge icon="🌟" title="Star Learner" locked={true} />
          <AchievementBadge icon="🚀" title="Super Smart" locked={true} />
          <AchievementBadge icon="👑" title="Learning Champion" locked={true} />
        </div>
      </div>
    </div>
  );
}

function AchievementBadge({ icon, title, locked }: { icon: string; title: string; locked: boolean }) {
  return (
    <div
      className={`rounded-2xl p-4 text-center ${
        locked ? 'bg-gray-200' : 'bg-gradient-to-br from-kid-yellow to-kid-orange'
      }`}
    >
      <div className={`text-4xl mb-2 ${locked ? 'grayscale opacity-50' : ''}`}>{icon}</div>
      <div className={`font-bold text-sm ${locked ? 'text-gray-500' : 'text-white'}`}>
        {title}
      </div>
    </div>
  );
}
