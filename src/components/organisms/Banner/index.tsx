import { BrxComponentWrapperProps } from '@/app/lib/BrxComponentWrapper'
import { Container } from '@mui/material'
import React, { Suspense } from 'react'
import BannerSkeleton from './BannerSkeleton'

export const Banner = ({ document, component, page }: BrxComponentWrapperProps) => {
  if (!component || !page) return null

  if (!document) {
    return page.isPreview() ? <div>Document not found</div> : null
  }

  const { image: imageRef } = document?.getData<any>()
  const image = imageRef && page.getContent(imageRef)
  const width = image?.getOriginal()?.getWidth();
  const height = image?.getOriginal()?.getHeight();
  const aspectRatio = width && height ? width / height : 16 / 9;

  console.groupEnd()
  return (
    <Suspense fallback={<BannerSkeleton />}>
      <Container maxWidth={false} disableGutters>
        {image && <img src={image.getOriginal().getUrl()} alt={image.getName()} style={{ width: '100%' }} />}
      </Container>
    </Suspense>
  )
}
