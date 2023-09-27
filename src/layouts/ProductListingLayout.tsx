import React, { useContext, useMemo } from 'react'
import { CommerceContext } from '../context/CommerceContext'
import {useProductGridCategory } from '@bloomreach/connector-components-react'
import { BrComponent } from '@bloomreach/react-sdk'
import { useCookies } from 'react-cookie'

import { Backdrop, CircularProgress, Container, Grid } from '@mui/material'
import { CategoryHeading, ProductGrid } from '@/components'

export const ProductListingLayout = ({
  query,
}: any) => {
  // console.log('query', query)
  const { category: categoryArray } = query
  const categoryId = categoryArray?.[0]


  const [cookies] = useCookies(['_br_uid_2']);
  const {
    connector,
    discoveryAccountId,
    discoveryAuthKey,
    discoveryConnector,
    discoveryCustomAttrFields,
    discoveryCustomVarAttrFields,
    discoveryCustomVarListPriceField,
    discoveryCustomVarPurchasePriceField,
    discoveryDomainKey,
    discoveryViewId,
    brEnvType,
  } = useContext(CommerceContext);



  const SEARCH_TYPE = 'category'
  const LIMIT = 24;
  const params: any = useMemo(() => {
    const defaults: any = {
      discoveryAccountId,
      discoveryAuthKey,
      discoveryDomainKey,
      customAttrFields: discoveryCustomAttrFields,
      customVariantAttrFields: discoveryCustomVarAttrFields,
      customVariantListPriceField: discoveryCustomVarListPriceField,
      customVariantPurchasePriceField: discoveryCustomVarPurchasePriceField,
      // facetFieldFilters: filters,
      pageSize: LIMIT,
      connector: discoveryConnector,
      // offset: limit * (page - 1),
      brUid2: cookies._br_uid_2,
      // discoveryViewId: view || discoveryViewId,
      brEnvType,
    };
    if (SEARCH_TYPE === 'category') {
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
    SEARCH_TYPE,
    query,
    categoryId,
    brEnvType,
  ]);

  // Fetch Product Details via GraphQL
  const [onLoadMore, results, loading, searchError] = useProductGridCategory(params as any);

  return (
    <>
      <Container maxWidth={false} disableGutters>
        <BrComponent path="top" />
      </Container>
      <Container maxWidth='xl' sx={{ pt: 3, pb: 10 }}>
        <Grid container spacing={1}>
          <CategoryHeading
            categoryId={categoryId}
            connector={connector}
          />
          <Grid item xs={12}>
          {loading ? (
            <Backdrop sx={{ color: '#fff', zIndex: '99999' }} open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <ProductGrid
              variation='pacific-home'
              results={results}
            />
          )}
          </Grid>
          <BrComponent path="bottom">
            <Grid item xs={12}>
              <BrComponent />
            </Grid>
          </BrComponent>
        </Grid>
      </Container>
    </>
  )
}
