'use client'

import { BrxComponentMapping } from '@/lib/BrxComponentMapping';
import ThemeProvider from '@/themes/ThemeProvider';
import { BrComponent, BrPage, BrPageContext } from '@bloomreach/react-sdk'
import { Page } from '@bloomreach/spa-sdk';
import { Container, CssBaseline } from '@mui/material';
import axios from 'axios';


import { Footer } from './organisms/Footer';
import { Header } from './organisms/Header';

interface Props {
  configuration: any;
  page?: Page;
}

export const BrxApp = ({ configuration, page }: Props) => {
  return (
    <BrPage configuration={{ ...configuration, httpClient: axios }} mapping={BrxComponentMapping} page={page}>
      <BrPageContext.Consumer>
        {(contextPage) => {
          return (
            <Container className='app-root' maxWidth={false} disableGutters>
              <ThemeProvider theme={contextPage?.getChannelParameters()?.theme}>
                <CssBaseline />

                <BrComponent path='Header'>
                  <Header />
                </BrComponent>
                <div className='dashboard-page'>
                  <h1>Hello, Dashboard Page!</h1>
                </div>
                <BrComponent path='main' />
                <BrComponent path='Footer'>
                  <Footer />
                </BrComponent>
              </ThemeProvider>
            </Container>
          )
        }}
      </BrPageContext.Consumer>
    </BrPage>
  )
}
