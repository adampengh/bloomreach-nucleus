import { alpha, createTheme, lighten, darken, ThemeOptions } from '@mui/material';
import '@mui/lab/themeAugmentation';

import { colors, typography } from './common';

export const BloomreachNucleusLight: ThemeOptions = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.white,
          color: colors.black,
        }
      }
    },
    MuiAccordion: {
      defaultProps: {},
      styleOverrides: {
        root: {},
        rounded: {},
        expanded: {},
        disabled: {},
        gutters: {},
        region: {},
      }
    },
    MuiAccordionActions: {
      defaultProps: {},
      styleOverrides: {
        root: {},
        spacing: {},
      }
    },
    MuiAccordionDetails: {
      defaultProps: {},
      styleOverrides: {
        root: {},
      }
    },
    MuiAccordionSummary: {
      defaultProps: {},
      styleOverrides: {
        root: {},
        gutters: {},
        contentGutters: {},
        expandIconWrapper: {},
      }
    },
    MuiAlert: {
      defaultProps: {},
      styleOverrides: {
        root: {},
        filled: {
          color: '#fff',

        },
        outlined: {},
        standard: {},
        standardSuccess: {},
        standardInfo: {},
        standardWarning: {},
        standardError: {},
        filledSuccess: {},
        filledInfo: {},
        filledWarning: {},
        filledError: {},
        outlinedSuccess: {},
        outlinedInfo: {},
        outlinedWarning: {},
        outlinedError: {},
        icon: {},
        message: {
          fontWeight: 700,
        },
        action: {},
      }
    },
    MuiAlertTitle: {
      defaultProps: {},
      styleOverrides: {
        root: {},
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      }
    }
  },
  palette: {
    mode: 'light',
    common: {
      black: colors.black,
      white: colors.white,
    },
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    info: {
      main: colors.info,
    }
  },
  typography: {
    ...typography,
  }
});
