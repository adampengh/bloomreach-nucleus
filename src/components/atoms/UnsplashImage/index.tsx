import React from "react"
import Image from 'next/image'

export const UnsplashImage = ({ unsplashImage }: any) => {
  // console.log('unsplashImage', JSON.parse(unsplashImage))
  const {
    alt_description,
    height,
    urls,
    width,
  } = JSON.parse(unsplashImage)
  // console.log('urls', urls)

  return (
    <img
      src={urls.full}
      alt={alt_description}
      // width={width}
      // height={height}
    />
  )
}
