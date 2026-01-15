/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'c2air': {
          'dark': '#0f172a',
          'darker': '#020617',
          'navy': '#1e293b',
          'card': '#334155',
          'accent': '#60a5fa',
          'accent-light': '#93c5fd',
          'accent-dark': '#3b82f6',
        }
      },
      fontFamily: {
        'grotesk': ['HK Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


