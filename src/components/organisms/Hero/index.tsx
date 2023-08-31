import React from 'react'
import { BrManageContentButton, BrProps } from '@bloomreach/react-sdk'
import { Container } from '@mui/material'
import { UnsplashImage } from '../../atoms/UnsplashImage'
import { Component, Page } from '@bloomreach/spa-sdk'

export interface HeroProps extends BrProps {
  isStoryBook?: boolean;
}

export const Hero = ({ component, page, isStoryBook }: HeroProps) => {
  if (!component || !page) return null

  // Document
  const { document: documentRef } = component?.getModels<any>()
  const document = documentRef && page.getContent(documentRef)

  // In preview, ensure the overlays are rendered
  if (!document) {
    return page.isPreview() ? <div /> : null
  }

  // Document Fields
  const { unsplash } = document?.getData()

  return (
    <Container
      className={page.isPreview() ? 'has-edit-button' : ''}
      maxWidth={false}
      disableGutters
    >
      <BrManageContentButton content={document} />
      {unsplash && <UnsplashImage unsplashImage={unsplash?.unsplashImage} /> }
    </Container>
  )
}

