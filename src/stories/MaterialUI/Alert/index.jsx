import React from 'react';

import {
  Alert as MuiAlert,
} from '@mui/material'

export const Alert = ({
  severity = 'info',
  variant = 'filled',
  text,
  ...rest
}) => {
  return (
    <MuiAlert
      severity={severity}
      variant={variant}
      {...rest}
    >
      {text}
    </MuiAlert>
  );
}
