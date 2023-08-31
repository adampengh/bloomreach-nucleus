import React from 'react';

import styles from './Footer.module.scss';
import { Container } from '@mui/material';

export const Footer = () => {
  return (
    <footer className={`${styles['footer']}`}>
      <Container maxWidth='xl'>
        Footer
      </Container>
    </footer>
  )
}
