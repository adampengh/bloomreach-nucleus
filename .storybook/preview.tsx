import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from "@storybook/react";

// Themes
import {
  BloomreachNucleusDark,
  BloomreachNucleusLight,
} from '../src/themes/schemes/BloomreachNucleus';

const customViewports = {
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1600px',
      height: '1024px',
    },
    type: 'desktop'
  },
};

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        'Light': BloomreachNucleusLight,
        'Dark': BloomreachNucleusDark,
      },
      defaultTheme: 'Light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    })
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      controls: { expanded: true },
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    options: {
      storySort: {
        method: 'alphabetical',
      }
    },
    viewport: {
      viewports: {
        ...customViewports,
        ...INITIAL_VIEWPORTS,
      }
    }
  },
};

export default preview;
