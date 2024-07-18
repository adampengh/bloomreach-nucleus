import React from 'react'
import { alpha, useTheme, Box, Button, Container, Typography } from '@mui/material'
import { Image as ImageType, ImageSet } from '@bloomreach/spa-sdk'

import {
  StyledHeroContainer,
  StyledTextContainer,
} from './styles'

import { UnsplashImage } from '@/components/atoms'
import { ShoppableImagePopover } from '@/components/molecules'

export const Hero = ({ document, component, page, isStorybook, ...args }: any) => {
  if (!document || !component) return null
  console.group('Hero Component')
  console.log('Document:', document)

  // Component Parameters
  // const { maxWidth = false } = component?.getParameters() || {}

  // Document Fields
  const {
    image: {
      altText,
      mobileImageUrl,
      tabletImageUrl,
      desktopImageUrl,
      unsplashImage,
    }
  } = document?.getData() || {}

  console.log('unsplashImage:', unsplashImage && JSON.parse(unsplashImage))

  // const {
  //   image: imageRef,
  //   altText,
  // } = imageCompound || {}
  // const image: ImageType = imageRef && page?.getContent<ImageSet>(imageRef)?.getOriginal();

  // const {
  //   fullWidth = true,
  //   heading = 'Hero Heading',
  //   buttonText = 'Shop Now',
  //   buttonColor = 'secondary',
  //   buttonVariant = 'contained',
  //   textColor = '#ffffff',
  //   backgroundColor = '#002840',
  //   backgroundOpacity = 0.9,
  // } = args

  const shoppableProducts = [
    {
      productId: 'KIT0705',
      top: 60,
      left: 60,
    },
    {
      productId: '95311',
      top: 70,
      left: 20,
    }
  ]


  console.groupEnd()
  return (
    <StyledHeroContainer maxWidth={false} disableGutters sx={{ mb: 6 }}>
      {unsplashImage && <UnsplashImage unsplashImage={unsplashImage} />}

      {/* {shoppableProducts?.map((product) => (
        <ShoppableImagePopover
          key={product.productId}
          product={product}
        />
      ))} */}

      {/* <StyledTextContainer
        sx={{
          background: alpha(backgroundColor, backgroundOpacity),
          color: textColor,
        }}
      >
        <Typography variant='h3' component='h2' sx={{ mb: 2 }}>{heading}</Typography>
        <Typography variant="subtitle1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto necessitatibus corrupti temporibus at laborum optio sed sint maxime dolor voluptatem fugit veritatis enim, accusamus quas vero libero aliquid ab dolorem!</Typography>
        <Button
          color={buttonColor}
          disableElevation
          onFocusVisible={() => {}}
          variant={buttonVariant}
          sx={{ mt: 3 }}
        >
          {buttonText}
        </Button>
      </StyledTextContainer> */}
    </StyledHeroContainer>
  )
}
