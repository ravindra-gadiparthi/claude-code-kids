'use client';

import { useState } from 'react';
import { AgeGroup, UserProgress } from '../types';
import { useProgress } from '../context/ProgressContext';
import { sanitizeName, isValidName } from '../utils/sanitize';

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null);
  const [nameError, setNameError] = useState('');
  const { setProgress } = useProgress();

  const handleNameChange = (value: string) => {
    const sanitized = sanitizeName(value);
    setName(sanitized);

    if (nameError) {
      setNameError('');
    }
  };

  const handleStart = () => {
    if (!isValidName(name)) {
      setNameError('Please enter a valid name (at least 2 letters)');
      return;
    }

    if (name && selectedAge) {
      const newProgress: UserProgress = {
        name: sanitizeName(name),
        ageGroup: selectedAge,
        totalPoints: 0,
        totalStars: 0,
        badges: [],
        completedChallenges: [],
        currentStreak: 1,
        lastPlayedDate: new Date().toISOString(),
      };
      setProgress(newProgress);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8" style={{ background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' }}>
      <div className="w-full max-w-2xl">
        <div className="card animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
              Welcome to Learning Adventure
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Let's start your journey to becoming amazing!
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name-input" className="block text-lg font-semibold text-gray-700 mb-2">
                What's your name?
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter your name"
                className={`input ${nameError ? 'error' : ''}`}
                maxLength={20}
                aria-label="Enter your name"
                aria-invalid={!!nameError}
                aria-describedby={nameError ? 'name-error' : undefined}
              />
              {nameError && (
                <p id="name-error" className="text-sm text-red-500 mt-2 font-medium">
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                How old are you?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['3-5', '6-8', '9-10'] as AgeGroup[]).map((age) => (
                  <button
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`btn ${
                      selectedAge === age
                        ? 'btn-primary'
                        : 'bg-white border-2 border-gray-300 text-gray-700'
                    }`}
                    aria-pressed={selectedAge === age}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={!name || !selectedAge || !isValidName(name)}
              className="btn btn-large btn-success w-full"
              aria-label="Start learning"
            >
              Start Learning →
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '➕', label: 'Math', color: '#667EEA' },
            { icon: '📚', label: 'Reading', color: '#F093FB' },
            { icon: '🔬', label: 'Science', color: '#4FACFE' },
            { icon: '🎨', label: 'Art', color: '#FFD93D' },
          ].map((subject, i) => (
            <div key={i} className="card text-center py-4 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-3xl mb-1">{subject.icon}</div>
              <div className="text-sm font-semibold text-gray-700">{subject.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
