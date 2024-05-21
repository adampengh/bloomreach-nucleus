import { BrProps } from '@bloomreach/react-sdk';
import { getContainerItemContent } from '@bloomreach/spa-sdk';
import { Container, Typography } from '@mui/material';
import React from 'react';

export const TitleAndText = ({ component, page }: BrProps) => {
  if (!component || !page) { return null; }

  // @ts-ignore
  const { title, text } = getContainerItemContent<any>(component, page) ?? {};

  return (
    <Container maxWidth={'lg'}>
      {title && <Typography variant='h1' component='h1'>{title}</Typography>}
      {text && <Typography variant='body1'>{text}</Typography>}
    </Container>
  );
}
