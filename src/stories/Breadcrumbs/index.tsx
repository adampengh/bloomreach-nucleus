import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiMuiBreadcrumbsProps,
  Link,
  Typography,
} from '@mui/material';

export interface ButtonGroupProps extends MuiMuiBreadcrumbsProps {
  label: string;
}

export const Breadcrumbs = ({
  label = 'Button',
  ...rest
}: ButtonGroupProps) =>
  <MuiBreadcrumbs {...rest}>
    <Link underline="hover" color="inherit" href="/">
      Home
    </Link>
    <Link
      underline="hover"
      color="inherit"
      href="/material-ui/getting-started/installation/"
    >
      Category
    </Link>
    <Typography color="text.primary">Breadcrumb</Typography>
  </MuiBreadcrumbs>
