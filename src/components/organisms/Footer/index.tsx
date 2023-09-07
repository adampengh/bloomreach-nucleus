import React from 'react';

import styles from './Footer.module.scss';
import { Container, Grid, Link, List, ListItem, Typography } from '@mui/material';
import { Logo } from '../../../components';

export const Footer = () => {
  return (
    <footer className={`${styles['footer']}`}>
      <Container maxWidth='xl' sx={{ py: 3}}>
        <Grid container>
          <Grid item xs={6} lg={3}>
            <List>
              <ListItem>
                <Typography variant="body1" component="h2"><strong>Help</strong></Typography>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Track Order</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Returns & Exchanges</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Shipping</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">International Orders</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Contact Us</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} lg={3}>
            <List>
              <ListItem>
                <Typography variant="body1" component="h2"><strong>Quick Links</strong></Typography>
              </ListItem>
              <ListItem>
                <Link href="/store-locator" underline="hover">Find a Store</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">My Account</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Rewards</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Daily Deals</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Gift Cards</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} lg={3}>
            <List>
              <ListItem>
                <Typography variant="body1" component="h2"><strong>Company</strong></Typography>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">About Us</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Careers</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Terms of Use</Link>
              </ListItem>
              <ListItem>
                <Link href="#" underline="hover">Privacy Policy</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} lg={3} sx={{ p: 2 }}>
            <Logo />
          </Grid>
        </Grid>

        <Grid container sx={{ m: 3, mb: 0 }}>
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
