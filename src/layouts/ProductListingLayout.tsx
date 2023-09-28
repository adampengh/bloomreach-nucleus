import React from 'react'
import { BrComponent } from '@bloomreach/react-sdk'

import { Container, Grid } from '@mui/material'
import { CategoryHeading, ProductGrid } from '@/components'

export const ProductListingLayout = ({
  query,
}: any) => {
  const { category: categoryArray } = query
  const categoryId = categoryArray?.[0]
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

  return (
    <div data-page-layout="product-listing-layout">
      <Container maxWidth={false} disableGutters>
        <BrComponent path="top" />
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
          <BrComponent path="bottom">
            <Grid item xs={12}>
              <BrComponent />
            </Grid>
          </BrComponent>
        </Grid>
      </Container>
    </div>
  )
}
