import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Placeholder brand palette — TODO: replace with the firm's official
        // brand colours as soon as a logo / brand kit is supplied.
        navy: {
          DEFAULT: '#0B1F3A',
          50: '#EEF1F6',
          100: '#D6DCE8',
          200: '#AEB9D1',
          300: '#8697BA',
          400: '#5E74A3',
          500: '#3C5384',
          600: '#0B1F3A',
          700: '#091A31',
          800: '#071427',
          900: '#050F1D',
        },
        bronze: {
          DEFAULT: '#B08D57',
          50: '#F7F1E7',
          100: '#EEE1C9',
          200: '#DDC393',
          300: '#CCA65D',
          400: '#B08D57',
          500: '#93743F',
          600: '#755B32',
          700: '#584325',
        },
        offwhite: '#F7F7F8',
        charcoal: '#232529',
      },
      fontFamily: {
        heading: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [typography],
};
