import React, { useState } from 'react'

import { Facets, ProductCard } from '../../index'
import { Button, Grid } from '@mui/material'

export const ProductGrid = () => {
  const [showFacets, setShowFacets] = useState(true)
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={() => setShowFacets(!showFacets)}>Show Facets: {showFacets ? 'true' : 'false'}</Button>
      </Grid>
      <Grid
        lg={showFacets ? 3 : 0}
        sx={{ display: showFacets ? '' : 'none' }}
        zeroMinWidth
      >
        <Facets />
      </Grid>
      <Grid item lg={showFacets ? 9 : 12} zeroMinWidth>
        <Grid container columnSpacing={'12px'} rowSpacing={'48px'}>
          {Array.from(Array(24)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProductCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
