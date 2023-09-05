import React, { useState } from 'react'

import { Facets, ProductCard } from '../../index'
import { Button, Grid } from '@mui/material'

interface ProductGridProps {
  itemsPerRowMobile?: number;
  itemsPerRowTablet?: number;
  itemsPerRowDesktop?: number;
  variation: string;
}

export const ProductGrid = ({
  itemsPerRowMobile = 2,
  itemsPerRowTablet = 3,
  itemsPerRowDesktop = 6,
  variation = 'retail'
}: ProductGridProps) => {
  const [showFacets, setShowFacets] = useState(true)
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={() => setShowFacets(!showFacets)}>Show Facets: {showFacets ? 'true' : 'false'}</Button>
      </Grid>
      <Grid
        item
        lg={showFacets ? 3 : 0}
        sx={{ display: showFacets ? '' : 'none' }}
        zeroMinWidth
      >
        <Facets />
      </Grid>
      <Grid item lg={showFacets ? 9 : 12} zeroMinWidth>
        <Grid container columnSpacing={'12px'} rowSpacing={'48px'}>
          {Array.from(Array(24)).map((_, index) => (
            <Grid
              key={index}
              item
              xs={12 / itemsPerRowMobile}
              sm={12 / itemsPerRowTablet}
              md={12 / itemsPerRowDesktop}
            >
              <ProductCard variation={variation} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
