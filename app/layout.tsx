import type { Metadata } from 'next'
import './globals.css'
import ErrorBoundary from './components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Kids Learning Adventure - Fun Learning for Ages 3-10',
  description: 'An engaging learning platform for kids with interactive challenges in Math, Reading, Science, and Art',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-kid">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
