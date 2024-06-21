/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.jsx'],
  theme: {
    extend: {
      backgroundColor: {
        'darkGreen': 'rgba(0, 44, 43, 1)',
        'custom2': 'rgba(0, 100, 100, 1)'// Adicione sua cor personalizada aqui
      },
      textColor:{
        'darkGreen': 'rgba(0, 44, 43, 1)',
      }
    },
  },
  plugins: [],
}
