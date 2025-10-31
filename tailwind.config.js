/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#05060b',
        neon: '#63f7ff',
        magenta: '#ff4dd8',
        amber: '#ffc778'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      boxShadow: {
        glow: '0 0 30px rgba(99, 247, 255, 0.35)'
      }
    }
  },
  plugins: []
};
