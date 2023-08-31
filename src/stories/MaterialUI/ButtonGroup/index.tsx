import React from 'react';
import {
  Button as MuiButton,
  ButtonGroup as MuiButtonGroup,
  ButtonGroupProps as MuiButtonGroupProps,
} from '@mui/material';

export interface ButtonGroupProps extends MuiButtonGroupProps {
  label: string;
}

export const ButtonGroup = ({
  label = 'Button',
  ...rest
}: ButtonGroupProps) =>
  <MuiButtonGroup {...rest}>
    <MuiButton>{label}</MuiButton>
    <MuiButton>{label}</MuiButton>
    <MuiButton>{label}</MuiButton>
  </MuiButtonGroup>
