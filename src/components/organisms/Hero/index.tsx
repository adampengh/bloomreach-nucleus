import React from 'react'
import { Container } from '@mui/material'
import { UnsplashImage } from '@/components'

export const Hero = ({ document, component }: BrxComponentWrapper) => {
  if (!document || !component) return null
  // console.log('Hero document=', document)

  // Component Parameters
  const { maxWidth = false } = component.getParameters()

  // Document Fields
  const { unsplash } = document?.getData()

  return (
    <Container maxWidth={maxWidth ? false : 'xl'} disableGutters>
      {unsplash && <UnsplashImage unsplashImage={unsplash?.unsplashImage} /> }
    </Container>
  )
}
