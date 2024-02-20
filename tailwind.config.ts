import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

import { fontSize } from './tailwind-settings/fontSize';
import { screens } from './tailwind-settings/screens';
import { settings } from './tailwind-settings/settings';
import { spaces } from './tailwind-settings/spaces';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        default: ['cursive', ...fontFamily.sans],
        notoSans: ['var(--font-notoSans)', ...fontFamily.sans],
        mono: ['Consolas', ...fontFamily.mono],
      },
      container: {
        center: true,
        // padding: 'var(--gw)',

        screens: {
          // DEFAULT: '100%',
        },
      },
      colors: {
        black: '#000000',
        white: '#ffffff',
        default: { DEFAULT: '#0A171E' },
        light: { DEFAULT: '#EBF0FE' },
        dark: { DEFAULT: '#131417' },
        primary: { DEFAULT: '#1A6074' },
        secondary: { DEFAULT: '#7BB4D2' },
      },
      lineHeight: {
        tighter: '1.1',
      },
      borderWidth: {
        1: '1px',
        3: '3px',
      },
      content: {
        none: '""',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.18, 0.22, 0.36, 1)',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        5: '5',
        15: '15',
        9999: '9999',
      },
      scale: {
        101: '1.01',
        98: '.98',
        '-1': '-1',
      },
      borderRadius: {
        inherit: 'inherit',
        half: '50%',
      },
      spacing: {
        half: '50%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        ...settings.extendedLength,
      },
      screens,
      fontSize,
      minHeight: spaces.height,
      height: spaces.height,
      minWidth: spaces.width,
      width: spaces.width,
      maxHeight: spaces.height,
      maxWidth: {
        ...spaces.width,
        '8xl': '90rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('optional', '&:optional');
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('inverted-colors', '@media (inverted-colors: inverted)');
    }),
    plugin(({ addUtilities, matchUtilities }) => {
      addUtilities({
        '.perspective-none': {
          perspective: 'none',
        },
        '.perspective-500': {
          perspective: '500px',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
      });
      matchUtilities({
        perspective: (value) => ({
          perspective: `${value}px`,
        }),
      });
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.perspective-origin-center': {
          'perspective-origin': 'center',
        },
        '.perspective-origin-top': {
          'perspective-origin': 'top',
        },
        '.perspective-origin-top-right': {
          'perspective-origin': 'top right',
        },
        '.perspective-origin-right': {
          'perspective-origin': 'right',
        },
        '.perspective-origin-bottom-right': {
          'perspective-origin': 'bottom right',
        },
        '.perspective-origin-bottom': {
          'perspective-origin': 'bottom',
        },
        '.perspective-origin-bottom-left': {
          'perspective-origin': 'bottom left',
        },
        '.perspective-origin-left': {
          'perspective-origin': 'left',
        },
        '.perspective-origin-top-left': {
          'perspective-origin': 'top left',
        },
      });
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.backface-visible': {
          'backface-visibility': 'visible',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
      });
    }),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.flip-horizontal': {
          '--tw-scale-x': '-1',
          '--tw-scale-y': '1',
        },
        '.flip-vertical': {
          '--tw-scale-x': '1',
          '--tw-scale-y': '-1',
        },
      };
      addUtilities(newUtilities);
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
        },
        '.transform-style-flat': {
          'transform-style': 'flat',
        },
      });
    }),
  ],
};

export default config;
