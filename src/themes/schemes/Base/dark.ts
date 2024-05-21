import { createTheme, ThemeOptions } from '@mui/material';
import '@mui/lab/themeAugmentation';

import {
  breakpoints,
  palette,
  typography,
} from './common';
import {
  components,
} from './dark/components'

export const BaseDark: ThemeOptions = createTheme({
  breakpoints: {
    ...breakpoints
  },
  components: {
    ...components
  },
  palette: {
    ...palette
  },
  typography: {
    ...typography
  },
})
