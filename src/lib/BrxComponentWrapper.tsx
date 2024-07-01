import React from 'react';
import { BrManageContentButton } from '@bloomreach/react-sdk'
import { Page, Document, ContainerItem } from '@bloomreach/spa-sdk'
import { Alert, Container } from '@mui/material'

export type BrxComponentProps = {
  component: ContainerItem | null;
  page: Page;
  children: any;
}

export type BrxComponentWrapperProps = {
  document: Document | null;
  component: ContainerItem | null;
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
    if (!document || document === '') {
      return page.isPreview()
        && <Container maxWidth={false} disableGutters className='has-edit-button'>
          <BrManageContentButton
            documentTemplateQuery={parameters['documentTemplateQuery'] ?? 'new-document'}
            folderTemplateQuery={parameters['folderTemplateQuery'] ?? 'new-translate-folder'}
            relative={parameters['relative'] || false}
            parameter={parameters['document'] || 'document'}
            pickerRootPath={parameters['pickerRootPath'] || '/content/documents'}
            root={parameters['root']}
          />
          <Container maxWidth={'xl'}>
            <Alert severity='error'>
              {component.getLabel()}: Please Select a Document
            </Alert>
          </Container>
          </Container>
    }

    return (
      <Container maxWidth={false} disableGutters className={page.isPreview() ? 'has-edit-button' : ''}>
        <BrManageContentButton
          content={document}
          documentTemplateQuery={parameters['documentTemplateQuery'] ?? 'new-document'}
          folderTemplateQuery={parameters['folderTemplateQuery'] ?? 'new-translate-folder'}
          relative={parameters['relative'] || false}
          parameter={parameters['document'] || 'document'}
          pickerRootPath={parameters['pickerRootPath'] || '/content/documents'}
          root={parameters['root']}
        />
        <Component
          document={document}
          component={component}
          page={page}
        >
          {children}
        </Component>
      </Container>
    )
  }
}

export default BrxComponentWrapper
