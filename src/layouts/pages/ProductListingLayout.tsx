import React, { useContext, useMemo, useState } from 'react'
import { BrComponent, BrPageContext } from '@bloomreach/react-sdk'

import { Container, Grid } from '@mui/material'
import { CategoryHeading, ProductGrid } from '@/components'


export const ProductListingLayout = ({ query }: any) => {
  const page = useContext(BrPageContext);
  const [categoryId, setCategoryId] = useState<string>('');
  const [plpTopHasChildren, setPlpTopHasChildren] = useState<boolean>(false);

  useMemo(() => {
    let { categoryId } = page?.getComponent()?.getParameters<any>();
    setCategoryId(categoryId)

    // In preview, read the previewProductId from the page component parameters
    if (page?.isPreview() && !categoryId) {
      const { previewCategoryId } = page?.getComponent()?.getParameters();
      setCategoryId(previewCategoryId)
    }
  }, [])

  const variation = 'pacific-home'

  const DEFAULTS = {
    'grocery': {
      itemsPerRowMobile: 2,
      itemsPerRowTablet: 4,
      itemsPerRowDesktop: 5,
      columnSpacing: '24px',
      rowSpacing: '24px',
    },
    'retail': {
      itemsPerRowMobile: 2,
      itemsPerRowTablet: 3,
      itemsPerRowDesktop: 3,
      columnSpacing: '48px',
      rowSpacing: '48px',
    },
    'pacific-home': {
      itemsPerRowMobile: 2,
      itemsPerRowTablet: 3,
      itemsPerRowDesktop: 3,
      columnSpacing: '48px',
      rowSpacing: '48px',
    },
  }

  useMemo(() => {
    const plpTopComponent = page?.getComponent()?.getComponent('plp-top')?.getChildren()?.[0]
    const hasChildren = plpTopComponent?.getChildren() && plpTopComponent?.getChildren()?.length > 0 ? true : false
    setPlpTopHasChildren(hasChildren)
  }, [page])

  return (
    <div data-page-layout="product-listing-layout">
      {!plpTopHasChildren || page?.isPreview() && (
        <Container maxWidth={false} disableGutters>
          <BrComponent path="top" />
        </Container>
      )}
      <Container maxWidth={false} disableGutters>
        <BrComponent path="plp-top" />
      </Container>

      <Container maxWidth='xl' sx={{ pt: 3, pb: 10 }}>
        <Grid container spacing={1}>
          <CategoryHeading categoryId={categoryId} />
          <Grid item xs={12}>
            <ProductGrid
              categoryId={categoryId}
              query={query}
              variation={variation}
              {...DEFAULTS[variation]}
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false} disableGutters>
        <BrComponent path="bottom" />
      </Container>
    </div>
  )
}
