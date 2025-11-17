'use client';

import { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';

export default function Home() {
  return (
    <ProgressProvider>
      <MainApp />
    </ProgressProvider>
  );
}

function MainApp() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-kid-blue via-kid-purple to-kid-pink bg-pattern">
      <Dashboard />
    </main>
  );
}
