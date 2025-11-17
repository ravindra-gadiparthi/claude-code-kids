'use client';

import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import WelcomeScreen from './WelcomeScreen';
import SubjectSelector from './SubjectSelector';
import ChallengeScreen from './ChallengeScreen';
import { Subject } from '../types';

export default function Dashboard() {
  const { progress } = useProgress();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  if (!progress) {
    return <WelcomeScreen />;
  }

  if (selectedSubject) {
    return (
      <ChallengeScreen
        subject={selectedSubject}
        onBack={() => setSelectedSubject(null)}
      />
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Header />
      <SubjectSelector onSelectSubject={setSelectedSubject} />
    </div>
  );
}

function Header() {
  const { progress } = useProgress();

  if (!progress) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-kid-blue">
            Welcome back, {progress.name}! 👋
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Ready for more learning adventures?
          </p>
        </div>

        <div className="flex gap-6">
          <div className="bg-gradient-to-br from-kid-yellow to-kid-orange rounded-2xl p-4 text-center min-w-[120px] shadow-lg">
            <div className="text-3xl font-bold text-white">{progress.totalPoints}</div>
            <div className="text-sm font-semibold text-white">⭐ Points</div>
          </div>
          <div className="bg-gradient-to-br from-kid-blue to-kid-purple rounded-2xl p-4 text-center min-w-[120px] shadow-lg">
            <div className="text-3xl font-bold text-white">{progress.totalStars}</div>
            <div className="text-sm font-semibold text-white">🌟 Stars</div>
          </div>
          <div className="bg-gradient-to-br from-kid-pink to-kid-purple rounded-2xl p-4 text-center min-w-[120px] shadow-lg">
            <div className="text-3xl font-bold text-white">{progress.currentStreak}</div>
            <div className="text-sm font-semibold text-white">🔥 Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
}
