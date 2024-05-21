import { BrProps } from '@bloomreach/react-sdk'
import React from 'react'

export const InGridBanner = ({ component, page }: BrProps) => {
  const { document: documentRef } = component?.getModels<any>()
  const document = documentRef && page?.getContent(documentRef)

  if (!document) {
    return page?.isPreview() ? <div>Document not defined</div> : null
  }

   // Document Fields
  const { image: imageRef } = document?.getData() || {}
  const image = imageRef && page?.getContent(imageRef)

  return (
    <div className='in-grid-banner' style={{ width: '100%' }}>
      {image && <img src={image.getOriginal().getUrl()} alt={''} />}
    </div>
  )
}
