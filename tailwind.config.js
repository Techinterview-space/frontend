/** @type {import('tailwindcss/postcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Purple color (from your existing _colors.scss)
        'purple': {
          light: '#886be7',
          DEFAULT: '#7759e7',
          darker: '#664de7',
          darkest: '#412ebd',
        },
        // You can add more custom colors here later
      },
      spacing: {
        // Extended spacing to match your custom mt-7 through mt-10
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      fontSize: {
        // Display sizes matching Bootstrap's display classes
        'display-1': ['5rem', { lineHeight: '1.2' }],
        'display-2': ['4.5rem', { lineHeight: '1.2' }],
        'display-3': ['4rem', { lineHeight: '1.2' }],
        'display-4': ['3.5rem', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [],
}
