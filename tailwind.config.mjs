/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Segoe UI', 'system-ui', 'sans-serif'],
        hand: ['var(--font-kalam)', 'Segoe Print', 'cursive'],
      },
    },
  },
  plugins: [],
};
