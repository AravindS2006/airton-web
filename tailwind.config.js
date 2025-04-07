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
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'accent-color': 'var(--accent-color)',
        'background-color': 'var(--background-color)',
        'background-secondary': 'var(--background-secondary)',
        'surface-color': 'var(--surface-color)',
        'text-color': 'var(--text-color)',
        'text-secondary': 'var(--text-secondary)',
        'success-color': 'var(--success-color)',
        'error-color': 'var(--error-color)',
        'warning-color': 'var(--warning-color)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(96, 165, 250, 0.5)',
        'glow-lg': '0 0 30px rgba(96, 165, 250, 0.6)',
        'inner-glow': 'inset 0 0 15px rgba(96, 165, 250, 0.3)',
      },
    },
  },
  plugins: [],
};
