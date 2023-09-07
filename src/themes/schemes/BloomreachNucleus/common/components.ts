import { Components, Theme } from '@mui/material';
import { baseline, breakpoints, colors } from './';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      ...baseline,
      body: {
        ...baseline.body,
        backgroundColor: colors.white,
        color: colors.black,
      },
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
  MuiAvatar: {
    defaultProps: {},
    styleOverrides: {
      root: {},
      colorDefault: {
        // backgroundColor: colors.primary,
      },
    }
  },
  MuiAvatarGroup: {
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
      root: {},
      colorInherit: {
        borderColor: colors.white,
      }
    }
  },
  MuiButtonBase: {
    defaultProps: {},
    styleOverrides: {}
  },
  MuiCheckbox: {
    defaultProps: {},
    styleOverrides: {
      root: {
        padding: '4px'
      },
    }
  },
  MuiChip: {
    defaultProps: {},
    styleOverrides: {
      sizeSmall: {
        fontSize: '11px',
      }
    }
  },
  MuiFormControl: {},
  MuiFormControlLabel: {
    defaultProps: {},
    styleOverrides: {
      root: {
        marginLeft: '-5px'
      },
      label: {
        fontSize: '13px'
      },
    }
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
