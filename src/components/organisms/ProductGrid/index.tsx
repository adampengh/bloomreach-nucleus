import React, { useContext, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Facets, ProductCard } from '../../index'
import { Backdrop, Button, CircularProgress, Grid } from '@mui/material'
import { BrComponent, BrComponentContext, BrPageContext } from '@bloomreach/react-sdk';
import { InGridBanner } from '@/components/atoms/InGridBanner';
import { CommerceContext } from '@/context/CommerceContext';
import { ParsedUrlQuery } from 'querystring';
import { useProductGridCategory } from '@bloomreach/connector-components-react';

interface ProductGridProps {
  categoryId?: string;
  itemsPerRowMobile?: number;
  itemsPerRowTablet?: number;
  itemsPerRowDesktop?: number;
  query?: ParsedUrlQuery;
  variation: string;
}

export const ProductGrid = ({
  categoryId,
  itemsPerRowMobile = 2,
  itemsPerRowTablet = 3,
  itemsPerRowDesktop = 4,
  query,
  variation = 'retail',
}: ProductGridProps) => {
  console.log('ProductGrid', variation)
  const page = useContext(BrPageContext)
  const [showFacets, setShowFacets] = useState(true)

  const limit = 24;


  const searchType = 'category'
  const {
    discoveryDomainKey,
    discoveryConnector,
    discoveryViewId,
    discoveryAccountId,
    discoveryAuthKey,
    discoveryCustomAttrFields,
    discoveryCustomVarAttrFields,
    discoveryCustomVarListPriceField,
    discoveryCustomVarPurchasePriceField,
    brEnvType,
  } = useContext(CommerceContext);
  console.log('discoveryDomainKey', discoveryDomainKey)
  const [cookies] = useCookies(['_br_uid_2']);

  const params: any = useMemo(() => {
    const defaults: any = {
      smAccountId: discoveryAccountId,
      smAuthKey: discoveryAuthKey,
      smDomainKey: discoveryDomainKey,
      customAttrFields: discoveryCustomAttrFields,
      customVariantAttrFields: discoveryCustomVarAttrFields,
      customVariantListPriceField: discoveryCustomVarListPriceField,
      customVariantPurchasePriceField: discoveryCustomVarPurchasePriceField,
      // facetFieldFilters: filters,
      pageSize: limit,
      connector: discoveryConnector,
      // offset: limit * (page - 1),
      brUid2: cookies._br_uid_2,
      // discoveryViewId: view || discoveryViewId,
      brEnvType,
    };
    if (searchType === 'category') {
      return {
        ...defaults,
        categoryId: categoryId || ' ', // workaround for "All categories"
      };
    }

    return {
      ...defaults,
      searchText: query,
    };
  }, [
    discoveryAccountId,
    discoveryAuthKey,
    discoveryDomainKey,
    // sortFields,
    discoveryCustomAttrFields,
    discoveryCustomVarAttrFields,
    discoveryCustomVarListPriceField,
    discoveryCustomVarPurchasePriceField,
    // filters,
    // limit,
    discoveryConnector,
    // page,
    cookies._br_uid_2,
    // view,
    // discoveryViewId,
    searchType,
    query,
    categoryId,
    brEnvType,
  ]);

  // console.log('params', params)
  const [onLoadMore, results, loading, searchError] = useProductGridCategory(params as any);
  console.log('results', results)
  console.log('loading', loading)
  console.log('searchError', searchError)

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: '99999' }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

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
          <BrComponent path="in-grid-banner">
            <BrComponentContext.Consumer>
              {(component) => {
                console.log('in-grid-banner', component?.getModels())
                return (
                  <>
                    {page?.isPreview() ?
                      <Grid
                        item
                        xs={12 / itemsPerRowMobile}
                        sm={12 / itemsPerRowTablet}
                        md={12 / itemsPerRowDesktop}
                      >
                        <BrComponent />
                      </Grid>
                      : <BrComponent />
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
                variation='pacific-home' />
            </Grid>
          ))}

          {/* // {Array.from(Array(24)).map((_, index) => (
          //   <Grid
          //     key={index}
          //     item
          //     xs={12 / itemsPerRowMobile}
          //     sm={12 / itemsPerRowTablet}
          //     md={12 / itemsPerRowDesktop}
          //   >
          //     <ProductCard variation={variation} />
          //   </Grid>
          // ))} */}
        </Grid>
      </Grid>
    </Grid>
  )
}
