import { alpha, createTheme, lighten, darken, ThemeOptions } from '@mui/material';
import '@mui/lab/themeAugmentation';

import { colors, typography } from './common';

export const BloomreachNucleusDark: ThemeOptions = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.black,
          color: colors.white,
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
      },
      styleOverrides: {
        root: {
          fontWeight: 700,
        }
      }
    }
  },
  palette: {
    mode: 'light',
    common: {
      black: '#333',
      white: '#f5f5f5',
    },
    primary: {
      main: '#002840',
    },
    secondary: {
      main: '#ffd500',
    },
    info: {
      main: '#00b2db',
    }
  },
  typography: {
    ...typography,
  }
});
