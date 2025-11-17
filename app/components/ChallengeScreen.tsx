'use client';

import { useState, useEffect, useMemo } from 'react';
import { Subject, Challenge } from '../types';
import { useProgress } from '../context/ProgressContext';
import { getChallengesBySubjectAndAge } from '../data/challenges';
import { getRandomChallenges } from '../utils/challengeSelector';
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

  // Get all challenges for this subject/age and randomly select 10
  const challenges = useMemo(() => {
    if (!progress) return [];
    const allChallenges = getChallengesBySubjectAndAge(subject, progress.ageGroup);
    return getRandomChallenges(allChallenges, 10, progress.completedChallenges);
  }, [subject, progress]);

  const currentChallenge = challenges[currentChallengeIndex];

  useEffect(() => {
    if (progress) {
      updateStreak();
    }
  }, []);

  const subjectConfig = {
    math: { gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', icon: '➕', name: 'Math' },
    reading: { gradient: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)', icon: '📚', name: 'Reading' },
    science: { gradient: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)', icon: '🔬', name: 'Science' },
    art: { gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF6B9D 100%)', icon: '🎨', name: 'Art' },
  }[subject];

  if (!currentChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8" style={{ background: subjectConfig.gradient }}>
        <div className="card max-w-2xl text-center animate-slide-up">
          <div className="text-6xl mb-4">{subjectConfig.icon}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Great Job!</h2>
          <p className="text-lg text-gray-600 mb-8">
            You've completed all 10 challenges! Ready to try again or pick another subject?
          </p>
          <button onClick={onBack} className="btn btn-large btn-primary">
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

  const progressPercent = Math.round(((currentChallengeIndex + 1) / challenges.length) * 100);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8" style={{ background: subjectConfig.gradient }}>
      <div className="container-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="btn bg-white text-gray-700"
            aria-label="Go back to subject selection"
          >
            ← Back
          </button>
          <div className="stat-card">
            <div className="text-lg font-bold text-gray-700">
              {currentChallengeIndex + 1} / {challenges.length}
            </div>
          </div>
        </div>

        {/* Challenge Card */}
        <div className="card mb-6 animate-slide-up">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">{subjectConfig.icon}</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {currentChallenge.title}
            </h2>
            <p className="text-gray-600">{currentChallenge.description}</p>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <p className="text-xl sm:text-2xl font-bold text-center text-gray-800">
              {currentChallenge.question}
            </p>
          </div>

          {/* Answer Options */}
          <div className="answer-grid mb-6">
            {currentChallenge.options?.map((option, index) => {
              let className = 'answer-option';

              if (showResult && option === currentChallenge.correctAnswer) {
                className += ' correct';
              } else if (showResult && option === selectedAnswer && !isCorrect) {
                className += ' incorrect';
              } else if (selectedAnswer === option && !showResult) {
                className += ' selected';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={className}
                  aria-label={`Option: ${option}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Result Feedback */}
          {showResult && (
            <div className={`card mb-6 animate-slide-up ${
              isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-orange-50 border-2 border-orange-500'
            }`}>
              <div className="text-center">
                <div className="text-5xl mb-3">{isCorrect ? '🎉' : '💪'}</div>
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  {isCorrect ? 'Excellent! You got it!' : 'Good try! Keep going!'}
                </p>
                {isCorrect ? (
                  <p className="text-lg text-green-700">
                    +{currentChallenge.points} points
                  </p>
                ) : (
                  <p className="text-lg text-gray-700">
                    The correct answer is: <strong>{currentChallenge.correctAnswer}</strong>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="btn btn-large btn-success w-full"
            >
              {currentChallengeIndex + 1 < challenges.length ? 'Next Question →' : 'Finish'}
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="card">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Progress</span>
            <span className="text-sm font-bold text-blue-600">{progressPercent}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
