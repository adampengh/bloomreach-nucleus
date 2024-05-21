import { Components, Theme } from '@mui/material';
import { baseline, breakpoints, colors } from './';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: {
      ...baseline,
      body: {
        ...baseline.body,
        backgroundColor: colors.alpha.white[100],
        color: colors.alpha.black[100],
      },
    }
  },
  MuiAccordion: {
    defaultProps: {},
    styleOverrides: {
      root: {
        '&:first-of-type, &:last-of-type': {
          borderRadius: 0,
        },
        '&.Mui-expanded': {
          margin: 0
        }
      }
    }
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
    styleOverrides: {
      root: {
        fontWeight: 700,
        fontSize: '1rem',
        '&.Mui-expanded': {
          minHeight: '1px'
        }
      },
      content: {
        '&.Mui-expanded': {
          margin: '12px 0'
        }
      }
    }
  },
  MuiAlert: {
    defaultProps: {},
    styleOverrides: {
      filled: {
        color: '#fff',
      },
      message: {
        fontWeight: 700,
      },
    }
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
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      colorInherit: {
        borderColor: colors.alpha.white[100],
      },
    }
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
  MuiTable: {
    styleOverrides: {
      root: {}
    }
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        '.MuiTableRow-root:nth-child(odd)': {
          backgroundColor: colors.neutral[90],
        }
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        fontSize: '1rem'
      }
    }
  },
  MuiTableHead: {
    defaultProps: {},
    styleOverrides: {
      root: {
        backgroundColor: colors.primary.main,
        '.MuiTableCell-root': {
          color: colors.alpha.white[100],
          fontWeight: 700,
        }
      }
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
