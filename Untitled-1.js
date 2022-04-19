const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: colors.teal,
        secondary: colors.gray,
        error: colors.red,
        blue: colors.sky,
      },
    },
  },
  plugins: [],
};
