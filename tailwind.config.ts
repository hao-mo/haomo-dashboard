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
  darkMode: ['class'],

  theme: {
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      black: '#131417',
      white: '#ffffff',
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      success: {
        DEFAULT: '#00df4e',
        foreground: '#131417',
      },
      warning: {
        DEFAULT: '#ff8c00',
        foreground: '#131417',
      },
    },
    screens,
    fontSize,
    extend: {
      fontFamily: {
        mono: ['Consolas', ...fontFamily.mono],
      },
      container: {
        center: true,
        padding: 'var(--gw)',
        screens: { DEFAULT: '100%' },
      },
      borderRadius: {
        half: '50%',
        inherit: 'inherit',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
      spacing: {
        half: '50%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        ...settings.extendedLength,
      },
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
      transitionProperty: {
        height: 'height',
        width: 'width',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ addVariant }) => {
      addVariant('optional', '&:optional');
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('group-hocus', [':merge(.group):hover &', ':merge(.group):focus &']);
      addVariant('group-hocus-visible', [
        ':merge(.group):hover &',
        ':merge(.group):focus-visible &',
      ]);
      addVariant('inverted-colors', '@media (inverted-colors: inverted)');
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '-webkit-scrollbar': 'none',
        },
      });
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
