import { Container, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from "@storybook/react";

// Themes
import {
  BaseLight,
  BaseDark,
} from '../src/themes/schemes/Base';
import {
  BloomreachNucleusDark,
  BloomreachNucleusLight,
} from '../src/themes/schemes/BloomreachNucleus';
import {
  CrewDark,
  CrewLight,
} from '../src/themes/schemes/Crew';

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
        'Base Light': BaseLight,
        'Base Dark': BaseDark,
        'Bloomreach Nucleus Light': BloomreachNucleusLight,
        'Bloomreach Nucleus Dark': BloomreachNucleusDark,
        'Crew Light': CrewLight,
        'Crew Dark': CrewDark,
      },
      defaultTheme: 'Base Light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
    (Story) => (
      <Container maxWidth='xl' sx={{ py: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Story />
          </Grid>
        </Grid>
      </Container>
    ),
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
