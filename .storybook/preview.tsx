import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import type { Preview } from "@storybook/react";

// Themes
import {
  BloomreachNucleusDark,
  BloomreachNucleusLight,
} from '../src/themes/schemes/BloomreachNucleus';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      controls: { expanded: true },
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      }
    },
  },
  // decorators: [
  //   (Story) => (
  //     <ThemeProvider theme={BloomreachNucleusDark}>
  //       <CssBaseline />
  //       <Story />
  //     </ThemeProvider>
  //   ),
  // ],
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      'Light': BloomreachNucleusLight,
      'Dark': BloomreachNucleusDark,
    },
    defaultTheme: 'Light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  })
];

export default preview;
