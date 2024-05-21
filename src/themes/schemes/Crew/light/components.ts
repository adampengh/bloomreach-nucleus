import { Components, Theme } from '@mui/material';
import { baseline, breakpoints, colors, components as CommonComponents } from '../common';

export const components: Components<Omit<Theme, 'components'>> = {
  ...CommonComponents,
  MuiCssBaseline: {
    styleOverrides: {
      ...baseline,
      body: {
        ...baseline.body,
        backgroundColor: colors.alpha.white[100],
        color: colors.alpha.black[100],
      },
    }
  }
}
