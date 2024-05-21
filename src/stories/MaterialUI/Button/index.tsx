import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

export const Button = ({
  children,
  ...rest
}: MuiButtonProps) =>
  <MuiButton {...rest}>{children}</MuiButton>;
