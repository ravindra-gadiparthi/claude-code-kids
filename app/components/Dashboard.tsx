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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8" style={{ background: 'var(--color-gray-50)' }}>
      <div className="container-lg">
        <Header />
        <SubjectSelector onSelectSubject={setSelectedSubject} />
      </div>
    </div>
  );
}

function Header() {
  const { progress } = useProgress();

  if (!progress) return null;

  return (
    <div className="card mb-8 animate-slide-up">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {progress.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Ready to continue your learning adventure?
          </p>
        </div>

        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <div className="stat-card flex-1 lg:flex-none">
            <div className="stat-value">{progress.totalPoints}</div>
            <div className="stat-label">Points</div>
          </div>
          <div className="stat-card flex-1 lg:flex-none">
            <div className="stat-value">{progress.totalStars}</div>
            <div className="stat-label">Stars</div>
          </div>
          <div className="stat-card flex-1 lg:flex-none">
            <div className="stat-value">{progress.currentStreak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
}
