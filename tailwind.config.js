module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        md: '800px',
        lg: '1200px',
        xl: '1400px',
        'max-md': { max: '799px' },
        'max-lg': { max: '1199px' },
        'max-xl': { max: '1399px' },
      },
    },
  },
};
