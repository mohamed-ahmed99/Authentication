/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {

      colors:{

      },
      fontFamily:{
        Merienda:['"Merienda"'],
      },
      screens: {
        xs: '480px',
      },

      container: {
        center:true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },

    },
    },
  },
  plugins: [],
}

