'use client'

import { BrComponent, BrPage } from "@bloomreach/react-sdk"
import { Footer } from "./organisms/Footer";

import '@/styles/styles.scss'
import '@/styles/fonts.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  Banner,
  // Content,
  // Hero,
  // InGridBanner,
  Logo,
  // PathwaysRecommendations,
  // StoreListing,
  // StoreLocator,
  // TitleAndText,
} from '@/components';
import BrxComponentWrapper from "@/lib/BrxComponentWrapper";
import { Container } from "@mui/material";



const BrxApp = ({configuration, page}: any) => {
  const mapping = {
    Banner: BrxComponentWrapper(Banner),
    Logo,
  }

  return (
    <BrPage configuration={configuration} page={page} mapping={mapping}>
      <BrComponent path='top' />

      <Container maxWidth='xl'>
        <h1>Hello, Cart!</h1>
      </Container>

      <BrComponent path='bottom' />

      <BrComponent path="Footer">
        <Footer />
      </BrComponent>
    </BrPage>
  )
}

export default BrxApp;
