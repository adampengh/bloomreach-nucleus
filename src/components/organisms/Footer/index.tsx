import React, { useContext } from 'react';
import { BrComponent, BrPageContext} from '@bloomreach/react-sdk'
import { Container, Grid, Typography } from '@mui/material';
import { FooterMenu } from './FooterMenu';

import styles from './Footer.module.scss';

export const Footer = () => {
  const page = useContext(BrPageContext)
  return (
    <footer className={`${styles['footer']} ${page?.isPreview() ? 'has-edit-button' : ''}`}>
      <Container maxWidth='xl' sx={{ py: 3}}>
        <Grid container>
          <BrComponent path="footerMenu">
            <FooterMenu />
          </BrComponent>
          <Grid item xs={12} lg={3} sx={{ p: 2, minWidth: '50px' }}>
            <BrComponent path="footerLogo" />
          </Grid>
        </Grid>

        <Grid container sx={{ my: 3, mb: 0 }}>
          <Grid item xs={12}>
            <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }} textAlign='center'>
              &copy; { new Date().getFullYear() } Bloomreach, Inc. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}
