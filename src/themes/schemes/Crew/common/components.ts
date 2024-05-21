import { Components, Theme } from '@mui/material';
import { baseline, breakpoints, colors } from './';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      ...baseline,
      body: {
        ...baseline.body,
        backgroundColor: colors.alpha.black[100],
        color: colors.alpha.white[100],
      },
    }
  },
  MuiAccordion: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiAccordionActions: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiAccordionDetails: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiAccordionSummary: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiAlert: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiAlertTitle: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiAvatar: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiAvatarGroup: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiButton: {
    defaultProps: {},
    styleOverrides: {
      root: {
        borderRadius: '0px',

      }
    }
  },
  MuiButtonBase: {
    defaultProps: {},
    styleOverrides: {
      root: {
        backgroundColor: colors.alpha.white[100],
        padding: '12px 24px',
      }
    }
  },
  MuiCheckbox: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiChip: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiFormControl: {},
  MuiFormControlLabel: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiTypography: {
    defaultProps: {},
    styleOverrides: {
      // h3: {
      //   fontSize: '28px',
      //   [`@media (min-width: ${breakpoints.values.md}px)`]: {
      //     fontSize: '64px',
      //     lineHeight: '72px',
      //   },
      // },
      // @ts-ignore
      serifxxxl: {
        fontFamily: "Taviraj",
        fontSize: '24px',
        lineHeight: '44px',
        fontWeight: 400,
        [`@media (min-width: ${breakpoints.values.md}px)`]: {
          fontSize: '48px',
          lineHeight: '56px',
        },
        [`@media (min-width: ${breakpoints.values.lg}px)`]: {
          fontSize: '64px',
          lineHeight: '72px',
        },
      }
    }
  },
}
