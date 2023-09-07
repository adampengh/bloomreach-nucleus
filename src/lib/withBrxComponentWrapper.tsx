import React from 'react';
import { BrManageContentButton } from '@bloomreach/react-sdk'
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk'
import { Container } from '@mui/material'

interface WithBrxComponentProps {
  component: BrComponent | null;
  page: Page;
  children: any;
}

const WithBrxComponentWrapper = (Component: any): any => {
  return function WithBrxComponent({ component, page, children }: WithBrxComponentProps) {
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
          <div className={`${page.isPreview() && 'has-edit-button'}`}>
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

export default WithBrxComponentWrapper
