'use client'

import axios from 'axios';
import { BrComponent, BrPage } from '@bloomreach/react-sdk'

import '@/styles/styles.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Header, Footer } from '@/components';
import { Page } from '@bloomreach/spa-sdk';
import { BrxComponentMapping } from '@/lib/BrxComponentMapping';


export default function BrxApp({ configuration, page }: {
  configuration: any,
  page: Page,
}) {

  return (
    <>
      <BrPage configuration={{ ...configuration, httpClient: axios as any }} page={page} mapping={BrxComponentMapping}>
        <BrComponent path='Header'>
          <Header />
        </BrComponent>
        <BrComponent path='top' />
        <BrComponent path='main' />
        <BrComponent path='bottom' />
        <BrComponent path='Footer'>
          <Footer />
        </BrComponent>
      </BrPage>
    </>
  )
}
