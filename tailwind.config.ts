import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'moviecard-gradient':
          'linear-gradient(90deg, #10161D 0%, rgba(16, 22, 29, 0) 100%), linear-gradient(0deg, rgba(16, 22, 29, 0.48), rgba(16, 22, 29, 0.48))',
        'backdrop-gradient': 'linear-gradient(90deg, #0c131e, rgba(12,19,30,0))'
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      fontFamily: {
        anton: ['var(--font-anton)'],
        lato: ['var(--font-lato)']
      }
    },
    screens: {
      '-2xl': { max: '1535px' },
      '-xl': { max: '1279px' },
      '-lg': { max: '1023px' },
      '-md': { max: '767px' },
      '-sm': { max: '639px' }
    }
  },
  plugins: []
};
export default config;
