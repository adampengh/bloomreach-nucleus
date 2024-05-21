import React from 'react';
import { BrManageContentButton } from '@bloomreach/react-sdk'
import { Component as BrComponent, Page, Document } from '@bloomreach/spa-sdk'
import { Container } from '@mui/material'

export type BrxComponentProps = {
  component: BrComponent | null;
  page: Page;
  children: any;
}

export type BrxComponentWrapperProps = {
  document: Document | null;
  component: BrComponent | null;
  page: Page;
}

const BrxComponentWrapper = (Component: any): any => {
  return function BrxComponent({ component, page, children }: BrxComponentProps) {
    if (!component || !page) return null

    // Component Parameters
    const parameters = component.getParameters()

    // Document Reference
    const { document: documentRef } = component.getModels()
    const document = documentRef && page.getContent(documentRef)

    // In Experience Manager Preview Mode, if a document has not been selected, still show the Manage Content Button
    if (!document) {
      return page.isPreview()
        && <div className='has-edit-button'>
          <BrManageContentButton
            documentTemplateQuery={`${parameters['document-template-query']}`}
            folderTemplateQuery={`${parameters['folder-template-query']}`}
            relative={parameters['relative'] || false}
            parameter={`${parameters['document']}`}
            root={`${parameters['root']}`}
          />
        </div>
    }

    return (
      <Container maxWidth={false} disableGutters>
        {page.isPreview() ? (
          <div className='has-edit-button'>
            <BrManageContentButton
              content={document}
              documentTemplateQuery={`${parameters['document-template-query']}`}
              folderTemplateQuery={`${parameters['folder-template-query']}`}
              relative={parameters['relative'] || false}
              parameter={`${parameters['document']}`}
              root={`${parameters['root']}`}
            />
            <Component
              document={document}
              component={component}
              page={page}
            >
              {children}
            </Component>
          </div>
        ) : (
          <Component
            document={document}
            component={component}
            page={page}
          >
            {children}
          </Component>
        )}
      </Container>
    )
  }
}

export default BrxComponentWrapper
