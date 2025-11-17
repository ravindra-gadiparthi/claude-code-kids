'use client';

import { useState, useEffect } from 'react';
import { Subject, Challenge } from '../types';
import { useProgress } from '../context/ProgressContext';
import { getChallengesBySubjectAndAge } from '../data/challenges';
import { playSuccessSound, playEncouragementSound, playClickSound, playStarSound } from '../utils/sounds';

interface ChallengeScreenProps {
  subject: Subject;
  onBack: () => void;
}

export default function ChallengeScreen({ subject, onBack }: ChallengeScreenProps) {
  const { progress, addPoints, addStar, completeChallenge, updateStreak } = useProgress();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const challenges = progress
    ? getChallengesBySubjectAndAge(subject, progress.ageGroup)
    : [];

  const currentChallenge = challenges[currentChallengeIndex];

  useEffect(() => {
    if (progress) {
      updateStreak();
    }
  }, []);

  if (!currentChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl text-center">
          <h2 className="text-5xl font-bold text-kid-blue mb-4">Great Job! 🎉</h2>
          <p className="text-2xl text-gray-600 mb-8">
            You've completed all the challenges in this section!
          </p>
          <button onClick={onBack} className="kid-button bg-gradient-to-r from-kid-green to-kid-blue text-white">
            Back to Subjects
          </button>
        </div>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    playClickSound();
    setSelectedAnswer(answer);
    const correct = answer === currentChallenge.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playSuccessSound();
      playStarSound();
      addPoints(currentChallenge.points);
      addStar();
      completeChallenge(currentChallenge.id);
    } else {
      playEncouragementSound();
    }
  };

  const handleNext = () => {
    playClickSound();
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setCurrentChallengeIndex((prev) => prev + 1);
  };

  const subjectColors = {
    math: 'from-kid-blue to-kid-purple',
    reading: 'from-kid-pink to-kid-orange',
    science: 'from-kid-green to-kid-blue',
    art: 'from-kid-yellow to-kid-pink',
  };

  const subjectIcons = {
    math: '➕',
    reading: '📚',
    science: '🔬',
    art: '🎨',
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="bg-white text-gray-700 px-6 py-3 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            ← Back
          </button>
          <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
            <span className="text-2xl font-bold text-gray-700">
              {currentChallengeIndex + 1} / {challenges.length}
            </span>
          </div>
        </div>

        {/* Challenge Card */}
        <div className={`bg-gradient-to-br ${subjectColors[subject]} rounded-3xl shadow-2xl p-8 mb-6`}>
          <div className="bg-white rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{subjectIcons[subject]}</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                {currentChallenge.title}
              </h2>
              <p className="text-xl text-gray-600">{currentChallenge.description}</p>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-r from-kid-yellow/20 to-kid-pink/20 rounded-2xl p-8 mb-8">
              <p className="text-3xl font-bold text-center text-gray-800">
                {currentChallenge.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentChallenge.options?.map((option, index) => {
                let buttonClass = 'bg-white border-4 border-gray-300 text-gray-800 hover:border-kid-blue hover:scale-105';

                if (showResult && option === currentChallenge.correctAnswer) {
                  buttonClass = 'bg-kid-green text-white border-kid-green scale-105';
                } else if (showResult && option === selectedAnswer && !isCorrect) {
                  buttonClass = 'bg-red-500 text-white border-red-500';
                } else if (selectedAnswer === option && !showResult) {
                  buttonClass = 'bg-kid-blue text-white border-kid-blue scale-105';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={`kid-button text-2xl p-6 ${buttonClass} disabled:cursor-not-allowed transition-all duration-300`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className={`text-center p-6 rounded-2xl mb-6 ${
                isCorrect ? 'bg-kid-green' : 'bg-red-400'
              }`}>
                <div className="text-6xl mb-3">{isCorrect ? '🎉' : '💪'}</div>
                <p className="text-3xl font-bold text-white mb-2">
                  {isCorrect ? 'Awesome! You got it!' : 'Good try! Keep going!'}
                </p>
                {isCorrect && (
                  <p className="text-2xl text-white">
                    +{currentChallenge.points} points! ⭐
                  </p>
                )}
                {!isCorrect && (
                  <p className="text-2xl text-white">
                    The correct answer is: {currentChallenge.correctAnswer}
                  </p>
                )}
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <button
                onClick={handleNext}
                className="kid-button w-full bg-gradient-to-r from-kid-purple to-kid-blue text-white text-2xl pulse-glow"
              >
                Next Challenge! 🚀
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-gray-700">Your Progress</span>
            <span className="text-lg font-bold text-kid-blue">
              {Math.round((currentChallengeIndex / challenges.length) * 100)}%
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-kid-green to-kid-blue h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentChallengeIndex / challenges.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
