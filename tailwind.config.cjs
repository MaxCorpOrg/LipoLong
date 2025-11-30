module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./src/app/**/*.css",
  ],
  theme: {
    extend: {
      maxWidth: {
        '5xl': '64rem',
      },
    },
  },
  plugins: ['@tailwindcss/typography'],
};