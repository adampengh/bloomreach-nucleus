import React, { useContext, useState } from 'react'
import { Facets, ProductCard } from '../../index'
import { Button, Grid } from '@mui/material'
import { BrComponent, BrComponentContext, BrPageContext } from '@bloomreach/react-sdk';
import { InGridBanner } from '../../../components/atoms/InGridBanner';

interface ProductGridProps {
  itemsPerRowMobile?: number;
  itemsPerRowTablet?: number;
  itemsPerRowDesktop?: number;
  variation: string;
  results?: any;
}

export const ProductGrid = ({
  itemsPerRowMobile = 2,
  itemsPerRowTablet = 3,
  itemsPerRowDesktop = 3,
  variation = 'retail',
  results,
}: ProductGridProps) => {
  // console.log('ProductGrid', variation)
  const page = useContext(BrPageContext)
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
        <Facets facetResult={results?.facetResult} />
      </Grid>
      <Grid item lg={showFacets ? 9 : 12} zeroMinWidth>
        <Grid container columnSpacing={'48px'} rowSpacing={'48px'}>
          <BrComponent path="in-grid-banner">
            <BrComponentContext.Consumer>
              {(component) => {
                // console.log('in-grid-banner', component?.getModels())
                return (
                  <>
                    {page?.isPreview() ?
                      <Grid
                        item
                        xs={12 / itemsPerRowMobile}
                        sm={12 / itemsPerRowTablet}
                        md={12 / itemsPerRowDesktop}
                      >
                        <div style={{ display: 'block'}}>
                          <BrComponent />
                        </div>
                      </Grid>
                    :
                      <Grid
                        item
                        xs={12 / itemsPerRowMobile}
                        sm={12 / itemsPerRowTablet}
                        md={12 / itemsPerRowDesktop}
                      >
                        <BrComponent />
                      </Grid>
                    }
                  </>
                )
              }}
            </BrComponentContext.Consumer>
          </BrComponent>

          {results?.items?.map((product: any, index: number) => (
            <Grid
              key={index}
              item
              xs={12 / itemsPerRowMobile}
              sm={12 / itemsPerRowTablet}
              md={12 / itemsPerRowDesktop}
            >
              <ProductCard
                product={product}
                variation={variation} />
            </Grid>
          ))}

          {/* {Array.from(Array(24)).map((_, index) => (
            <Grid
              key={index}
              item
              xs={12 / itemsPerRowMobile}
              sm={12 / itemsPerRowTablet}
              md={12 / itemsPerRowDesktop}
            >
              <ProductCard variation={variation} />
            </Grid>
           ))} */}
        </Grid>
      </Grid>
    </Grid>
  )
}
