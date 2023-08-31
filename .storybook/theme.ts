// .storybook/YourTheme.js

import { create } from '@storybook/theming/create';

export const theme = create({
  base: 'dark',
  // Typography
  fontBase: '"Montserrat", "Open Sans", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Bloomreach',
  brandUrl: 'https://www.bloomreach.com',
  brandImage: '/assets/images/bloomreach-logo.svg',
  brandTarget: '_self',

  //
  // colorPrimary: '#3A10E5',
  // colorSecondary: '#585C6D',

  // UI
  appBg: '#002840',
  appContentBg: '#002840',
  appBorderColor: '#585C6D',
  appBorderRadius: 4,

  // Text colors
  textColor: '#ffffff',
  textInverseColor: '#000C57',

  // Toolbar default and active colors
  barTextColor: '#ffffff',
  barSelectedColor: '#ffd500',
  barBg: '#002840',

  // Form colors
  // inputBg: '#ffffff',
  // inputBorder: '#10162F',
  // inputTextColor: '#10162F',
  // inputBorderRadius: 2,
});
