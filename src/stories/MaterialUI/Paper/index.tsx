import React from 'react';
import {
  Box,
  Paper as MuiPaper,
  PaperProps as MuiPaperProps,
} from '@mui/material';

export const Paper = ({...args}: MuiPaperProps) =>
<Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
      m: 1,
      width: 128,
      height: 128,
    },
  }}
>
  <MuiPaper {...args} />
</Box>


