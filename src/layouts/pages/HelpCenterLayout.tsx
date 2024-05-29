import React from 'react';
import { BrComponent } from '@bloomreach/react-sdk';
import { Box, Container, Grid, Typography } from '@mui/material';


export const HelpCenterLayout = () => {
  return (
    <Box component='main' data-page-layout='help-center'>
      <Typography
        variant='h3'
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          padding: '1rem 0',
        }}>
        Help Center
      </Typography>
      <Container maxWidth={'xl'} sx={{ paddingTop: 3, paddingBottom: 6}}>
        <Grid container spacing={6}>
          <BrComponent path='left'>
            <Grid item xs={12} md={3}>
              <BrComponent />
            </Grid>
          </BrComponent>
          <BrComponent path='main'>
            <Grid item xs={12} md={9}>
              <BrComponent />
            </Grid>
          </BrComponent>
        </Grid>
      </Container>
    </Box>
  )
}
