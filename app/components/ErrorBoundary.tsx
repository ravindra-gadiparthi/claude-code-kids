'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-kid-blue via-kid-purple to-kid-pink p-8">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl text-center">
            <div className="text-8xl mb-6">😔</div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Don't worry! Your progress is safe. Let's try again!
            </p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.reload();
                }}
                className="kid-button bg-gradient-to-r from-kid-green to-kid-blue text-white w-full"
              >
                🔄 Reload the App
              </button>

              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  localStorage.clear();
                  window.location.reload();
                }}
                className="kid-button bg-gradient-to-r from-kid-orange to-kid-pink text-white w-full"
              >
                🆕 Start Fresh
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-gray-100 rounded-2xl p-4">
                <summary className="text-lg font-bold text-gray-700 cursor-pointer">
                  Technical Details (Dev Mode)
                </summary>
                <pre className="text-sm text-gray-600 mt-2 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
