import React from 'react';
import {
  Button,
  CardActions,
  CardContent,
  Card as MuiCard,
  CardProps as MuiCardProps,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';

export const Card = ({...args}: MuiCardProps) =>
<MuiCard {...args}>
  {args.children}
</MuiCard>
