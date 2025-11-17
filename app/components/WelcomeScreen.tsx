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

    // Clear error when user starts typing
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
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
        <h1 className="text-6xl font-bold text-center mb-4 text-kid-blue bounce-gentle">
          🎨 Kids Learning Adventure! 🚀
        </h1>
        <p className="text-2xl text-center text-gray-600 mb-8">
          Let's learn and have fun together!
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-2xl font-bold text-gray-700 mb-3">
              What's your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Type your name here..."
              className={`w-full px-6 py-4 text-2xl border-4 rounded-2xl focus:outline-none transition-colors ${
                nameError
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-kid-blue focus:border-kid-pink'
              }`}
              maxLength={20}
              aria-label="Enter your name"
              aria-invalid={!!nameError}
              aria-describedby={nameError ? 'name-error' : undefined}
            />
            {nameError && (
              <p id="name-error" className="text-red-500 text-lg mt-2 font-bold">
                {nameError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-2xl font-bold text-gray-700 mb-3">
              How old are you?
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['3-5', '6-8', '9-10'] as AgeGroup[]).map((age) => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  className={`kid-button ${
                    selectedAge === age
                      ? 'bg-kid-yellow text-gray-800'
                      : 'bg-white text-gray-600 border-4 border-gray-300'
                  }`}
                >
                  {age} years
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!name || !selectedAge || !isValidName(name)}
            className={`kid-button w-full mt-8 ${
              name && selectedAge && isValidName(name)
                ? 'bg-gradient-to-r from-kid-green to-kid-blue text-white pulse-glow'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label="Start learning"
          >
            Start Learning! 🎉
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white/80 rounded-2xl p-4 shadow-lg">
          <div className="text-4xl mb-2">➕</div>
          <div className="font-bold text-kid-blue">Math Fun</div>
        </div>
        <div className="bg-white/80 rounded-2xl p-4 shadow-lg">
          <div className="text-4xl mb-2">📚</div>
          <div className="font-bold text-kid-pink">Reading</div>
        </div>
        <div className="bg-white/80 rounded-2xl p-4 shadow-lg">
          <div className="text-4xl mb-2">🔬</div>
          <div className="font-bold text-kid-purple">Science</div>
        </div>
        <div className="bg-white/80 rounded-2xl p-4 shadow-lg">
          <div className="text-4xl mb-2">🎨</div>
          <div className="font-bold text-kid-orange">Art</div>
        </div>
      </div>
    </div>
  );
}
