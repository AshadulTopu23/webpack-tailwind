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

      spacing: {
        // '1/5': '20%',
        // '2/5': '40%',
        // '3/5': '60%',
        // '4/5': '80%',
        // '1/6': '16.666667%',
        // '2/6': '33.333333%',
        // '3/6': '50%',
        // '4/6': '66.666667%',
        // '5/6': '83.333333%',
        // '15': '60px',
      },
    },
  },
  plugins: [],
}

