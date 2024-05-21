import React from 'react'
import { alpha, useTheme, Box, Button, Container, Typography } from '@mui/material'
import { Image as ImageType, ImageSet } from '@bloomreach/spa-sdk'

import {
  StyledHeroContainer,
  StyledTextContainer,
} from './styles'
import { ShoppableImagePopover } from '@/components'

export const Hero = ({ document, component, page, isStorybook, ...args }: any) => {
  // if (!document || !component) return null
  // console.log('Hero document=', document)

  // Component Parameters
  // const { maxWidth = false } = component?.getParameters() || {}

  // Document Fields
  // const { imageCompound } = document?.getData() || {}
  // const {
  //   image: imageRef,
  //   altText,
  // } = imageCompound || {}
  // const image: ImageType = imageRef && page?.getContent<ImageSet>(imageRef)?.getOriginal();

  const {
    altText = '',
    fullWidth = true,
    heading = 'Hero Heading',
    buttonText = 'Shop Now',
    buttonColor = 'secondary',
    buttonVariant = 'contained',
    textColor = '#ffffff',
    backgroundColor = '#002840',
    backgroundOpacity = 0.9,
  } = args

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

  return (
    <StyledHeroContainer maxWidth={fullWidth ? false : 'xl'} disableGutters sx={{ mb: 6 }}>
      <picture>
        <img
          src={'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80'}
          alt={altText}
        />
      </picture>

      {shoppableProducts?.map((product) => (
        <ShoppableImagePopover
          key={product.productId}
          product={product}
        />
      ))}

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
