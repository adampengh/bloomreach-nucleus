import { createTheme, ThemeOptions } from '@mui/material';
import '@mui/lab/themeAugmentation';

import {
  breakpoints,
  components,
  palette,
  typography,
} from './common';

export const BaseLight: ThemeOptions = createTheme({
  breakpoints: breakpoints,
  components: components,
  palette: palette,
  typography: typography,
})
