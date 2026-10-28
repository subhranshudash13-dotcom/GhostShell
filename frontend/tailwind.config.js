/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ghost: {
          bg: '#0a0a0a',
          accent: '#c026d3', // Neon purple
          spooky: '#22c55e', // Neon green
          brutal: '#ffffff',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        brutal: '8px 8px 0px 0px rgba(192, 38, 211, 1)',
        'brutal-spooky': '8px 8px 0px 0px rgba(34, 197, 94, 1)',
        'brutal-white': '8px 8px 0px 0px rgba(255, 255, 255, 1)',
      }
    },
  },
  plugins: [],
}
