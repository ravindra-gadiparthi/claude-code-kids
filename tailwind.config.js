module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kid-blue': '#4A90E2',
        'kid-pink': '#FF6B9D',
        'kid-yellow': '#FFD93D',
        'kid-green': '#6BCF7E',
        'kid-purple': '#A78BFA',
        'kid-orange': '#FB923C',
      },
      fontFamily: {
        'kid': ['Comic Sans MS', 'cursive', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
