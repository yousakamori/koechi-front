const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: colors.blue,
        secondary: colors.slate,
        error: colors.red,
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.5em',
              paddingBottom: '.2em',
              borderBottom: '1px solid #e5e7eb',
            },
            h2: { fontSize: '1.25rem' },
            h3: { fontSize: '1.125rem' },
            mark: {
              backgroundColor: colors.yellow['200'],
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderStyle: ['hover'],
      borderWidth: ['first', 'last'],
      textColor: ['active'],
      outline: ['focus-visible'],
      ringColor: ['focus-visible'],
      ringOffsetColor: ['focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      ringOpacity: ['focus-visible'],
      ringWidth: ['focus-visible'],
      cursor: ['disabled'],
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};
