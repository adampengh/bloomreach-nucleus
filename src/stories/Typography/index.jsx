import React from 'react';

import {
  Typography as MuiTypography
} from '@mui/material'

export const Typography = ({
  align = 'left',
  component = 'p',
  gutterBottom = false,
  variant = 'body1',
  text,
  ...rest
}) => {
    return (
      <div>
        <MuiTypography
          align={'left'}
          component={component}
          gutterBottom={gutterBottom}
          variant={variant}
          {...rest}
        >
          {text}
        </MuiTypography>
      </div>
    );
  }
