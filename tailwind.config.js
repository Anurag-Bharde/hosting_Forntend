/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'badge-color-cycle': {
          '0%': { backgroundColor: '#ffda79' },
          '25%': { backgroundColor: '#ffabe7' },
          '50%': { backgroundColor: '#d2bcf3' },
          '75%': { backgroundColor: '#edf3d8' },
          '100%': { backgroundColor: '#ffda79' },
        },
      },
      animation: {
        'badge-color-cycle': 'badge-color-cycle 12s linear infinite',
      },
    },
  },
  plugins: [],
}

