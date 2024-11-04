import { Anton, Lato } from 'next/font/google';

export const anton_init = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap'
});

export const lato_init = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap'
});

export const anton = anton_init.variable;
export const lato = lato_init.variable;
