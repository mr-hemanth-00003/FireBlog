import { PT_Sans, Source_Code_Pro } from 'next/font/google';

export const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-pt-sans',
});

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-source-code-pro',
});