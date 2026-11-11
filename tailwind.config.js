/** Bloomrix theme: teal brand, amber accent, cool slate "ink" neutrals */
module.exports = {
  darkMode: 'class',
  content: ['./*.html', './src/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: { 50:'#eefaf8',100:'#d3f3ee',200:'#a9e6dd',300:'#6fd2c6',400:'#3bb8aa',500:'#1a9a8d',600:'#117d73',700:'#0f635c',800:'#104f4b',900:'#0f4140' },
        accent: { 100:'#fdf0d3',400:'#f5b942',500:'#e29a14' },
        ink: { 50:'#f4f7f7',100:'#e7eded',200:'#cfd9da',300:'#aebcbe',400:'#8a9b9e',500:'#6b7e82',600:'#52646a',700:'#3e4e53',800:'#263337',900:'#151f22',950:'#0c1416' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: { 18: '4.5rem', 22: '5.5rem' },
      borderRadius: { xl: '0.875rem', '2xl': '1.25rem' },
      boxShadow: {
        card: '0 1px 2px rgb(15 65 64 / .06), 0 4px 14px rgb(15 65 64 / .06)',
        pop: '0 12px 36px rgb(15 99 92 / .22)',
      },
    },
  },
};
