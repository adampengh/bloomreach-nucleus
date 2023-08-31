import React from 'react';
import {
  Link as MuiLInk,
  LinkProps as MuiLinkProps,
} from '@mui/material';

type LinkBaseProps = Pick<MuiLinkProps, 'color' | 'onClick' | 'underline' | 'variant'>;

export interface LinkProps extends LinkBaseProps {
  label: string;
}

export const Link = ({
  label = 'Link',
  ...rest
}: LinkProps) =>
  <MuiLInk {...rest}>{label}</MuiLInk>;
