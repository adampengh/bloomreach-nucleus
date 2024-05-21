import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { Facets, ProductCard } from '../../index'
import { Backdrop, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Pagination, Select } from '@mui/material'
import { BrComponent, BrComponentContext, BrPageContext } from '@bloomreach/react-sdk';
import { useCookies } from 'react-cookie';
import { CommerceContext } from '@/context/CommerceContext';
import { useProductGridCategory } from '@bloomreach/connector-components-react';

import { PLP_SORT_OPTIONS } from '@/lib/constants';
import { useRouter } from 'next/router';

import { InGridBanner } from '../../atoms/InGridBanner';

interface ProductGridProps {
  categoryId: string;
  columnSpacing?: string;
  itemsPerRowMobile?: number;
  itemsPerRowTablet?: number;
  itemsPerRowDesktop?: number;
  query?: any;
  rowSpacing?: string;
  variation: string;
}

export const ProductGridAlternate = ({
  categoryId,
  columnSpacing = '48px',
  itemsPerRowMobile = 2,
  itemsPerRowTablet = 3,
  itemsPerRowDesktop = 3,
  query,
  rowSpacing = '48px',
  variation = 'retail',
}: ProductGridProps) => {
  // STATE
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [showFacets, setShowFacets] = useState(true)
  const [selectedSortOrder, setSelectedSortOrder] = useState('relevance')

  // CONTEXT
  const component = useContext(BrComponentContext)
  const page = useContext(BrPageContext)
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
  const [cookies] = useCookies(['_br_uid_2']);
  const { push } = useRouter();

  // In-Grid Banners
  const inGridBannersContainerItems = component?.getChildren()?.filter((child: any) => child.getName().includes('inGridBanner'))
  console.log('inGridBannersContainerItems', inGridBannersContainerItems)
  const inGridBanners = inGridBannersContainerItems?.map((containerItem) => {
    const banner = containerItem.getChildren()?.[0].getChildren()?.[0]
    return banner
  }).filter((banner: any) => banner !== undefined)

  const inGridBannerDetails = inGridBanners?.map((banner: any) => {
    console.log('banner', banner)
    const parameters = banner?.getParameters() || {};
    if (!parameters) return
    return {
      columnSpan: parameters?.columnSpan,
      desktopPosition: parameters?.desktopPosition,
      mobilePosition: parameters?.mobilePosition,
    }
  }).filter((banner: any) => banner !== undefined)


  const SEARCH_TYPE = 'category'
  const LIMIT = 24;

  useMemo(() => {
    const search = new URLSearchParams(query ?? '');
    const pageNumber = Number(search.get(`page`) ?? 1)
    // console.log('pageNumber', pageNumber)
    setCurrentPageNumber(pageNumber)
  }, [query]);

  const params: any = useMemo(() => {
    // console.log('currentPageNumber', currentPageNumber)
    const itemsToReduce = inGridBannerDetails?.reduce((accumulator: any, currentValue: any) => accumulator + Number(currentValue?.columnSpan), 0) || 0;
    // console.log('itemsToReduce', itemsToReduce)
    const pageSize = currentPageNumber === 1 ? LIMIT - itemsToReduce : LIMIT
    // console.log('pageSize', pageSize)
    const offset = (LIMIT - itemsToReduce) * (currentPageNumber - 1)
    // console.log('offset', offset)
    const defaults: any = {
      discoveryAccountId,
      discoveryAuthKey,
      discoveryDomainKey,
      customAttrFields: discoveryCustomAttrFields,
      customVariantAttrFields: discoveryCustomVarAttrFields,
      customVariantListPriceField: discoveryCustomVarListPriceField,
      customVariantPurchasePriceField: discoveryCustomVarPurchasePriceField,
      // facetFieldFilters: filters,
      sortFields: selectedSortOrder,
      pageSize: pageSize,
      connector: discoveryConnector,
      offset: offset,
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
    currentPageNumber,
    selectedSortOrder,
    inGridBannerDetails,
  ]);

  // Fetch Product Details via GraphQL
  const [onLoadMore, results, loading, searchError] = useProductGridCategory(params as any);
  // console.log('results', results)

  useMemo(() => {
    if (currentPageNumber !== 1) return
    console.log('results', results)
    inGridBannersContainerItems?.forEach((containerItem, index) => {
      const banner = containerItem.getChildren()?.[0].getChildren()?.[0]
      if (banner) {
        const parameters = banner.getParameters() || {};
        if (parameters?.document || page?.isPreview()) {
          // @ts-ignore
          results?.items.splice(parameters?.desktopPosition - 1, 0, containerItem)
        }
      }
    })
    page?.sync()
  }, [currentPageNumber, inGridBanners, results, page])

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPageNumber(value)
    push({ query: { ...query, page: value } }, undefined, { shallow: true });
  }

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          // onClick={handleClose}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={0}
              alignContent={'center'}
              alignItems={'flex-end'}
              justifyContent={'space-between'}
            >
              <Grid item xs={6} md={3}>
                <Button onClick={() => setShowFacets(!showFacets)}>{showFacets ? 'Hide Filters' : 'Show Filters'}</Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Sort By</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedSortOrder}
                    onChange={(event) => setSelectedSortOrder(event?.target.value)}
                    label="Sort Order"
                  >
                    {PLP_SORT_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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

            <Grid container columnSpacing={columnSpacing} rowSpacing={rowSpacing}>
            {inGridBannersContainerItems?.map((containerItem, index) => {
                console.log('containerItem', containerItem)
                return (
                  <Fragment key={index}>
                    <BrComponent path={containerItem.getName()}>
                      <BrComponentContext.Consumer>
                        {(component) => {
                          const containerComponent = component?.getChildren()?.[0].getChildren()?.[0]
                          console.log('containerComponent', containerComponent?.getParameters())

                          if (containerComponent?.getParameters()?.document) return
                          return (
                            <Grid
                              item
                              xs={12 / itemsPerRowMobile}
                              sm={12 / itemsPerRowTablet}
                              md={12 / (itemsPerRowDesktop / Number(1))}
                            >
                              <BrComponent />
                            </Grid>
                          )
                        }}
                      </BrComponentContext.Consumer>
                    </BrComponent>
                  </Fragment>
                )
              })}
            </Grid>

            <Grid container columnSpacing={columnSpacing} rowSpacing={rowSpacing}>
              {results?.items?.map((item: any, index: number) => {
                if (item?.__typename === 'Item') {
                  return (
                    <Grid
                      key={index}
                      item
                      xs={12 / itemsPerRowMobile}
                      sm={12 / itemsPerRowTablet}
                      md={12 / itemsPerRowDesktop}
                    >
                      <ProductCard
                        product={item}
                        variation={variation} />
                    </Grid>
                  )
                } else {
                  console.log('item', item)
                  const component = item.getChildren()?.[0].getChildren()?.[0]
                  console.log('component', component.getParameters())
                  const columnSpan = component.getParameters()?.columnSpan || 1
                  return (
                    <>
                      <BrComponent path={item.getName()}>
                        <Grid
                          item
                          xs={12 / itemsPerRowMobile}
                          sm={12 / itemsPerRowTablet}
                          md={12 / (itemsPerRowDesktop / Number(columnSpan))}
                        >
                          <BrComponent />
                        </Grid>
                      </BrComponent>
                    </>
                  )
                }
              })}
            </Grid>
          </Grid>

          <Grid item xs={12} display='flex' justifyContent={'center'}>
            <Pagination
              count={10}
              color="primary"
              defaultPage={currentPageNumber}
              onChange={handlePaginationChange}
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}
