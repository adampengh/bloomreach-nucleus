import { Grid } from '@mui/material'
import React from 'react'

export const InGridBanner = ({ document, component }: BrxComponentWrapper) => {
  if (!document || !component) return null

   // Component Parameters
   const { mobilePosition = 1, desktopPosition = 1 } = component.getParameters()

   // Document Fields
   const { unsplashImage } = document?.getData()

   const {
    alt_description,
    urls,
  } = JSON.parse(unsplashImage)
  // console.log('urls', urls)

  return (
    <img src={urls?.full} alt={alt_description} />
  )
}
