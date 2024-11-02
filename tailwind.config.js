/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,php}'],
  darkMode: 'class',
  theme: {
    extend: {

      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1400px',
        xxxl: '1600px',
        '4xl': '1800px'
      },

      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
        serif: ['"Poppins"', 'serif'],
        mono: ['"Poppins"', 'monospace'],
      },

      colors: {
        'primary': '#000000',
        'secondary': '#ffffff',
      },
    },
  },
  plugins: [],
}

