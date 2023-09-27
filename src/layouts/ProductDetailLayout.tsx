import React, { useContext, useMemo } from 'react'
import { CommerceContext } from '../context/CommerceContext'
import { ProductDetailInputProps, useProductDetail } from '@bloomreach/connector-components-react'
import { BrComponent } from '@bloomreach/react-sdk'
import { useCookies } from 'react-cookie'

import { Container, Grid, Typography } from '@mui/material'

export const ProductDetailLayout = ({
  query,
}: any) => {
  // console.log('query', query)
  const {
    product: productArray,
    selectedSku,
 } = query
  let productId = productArray?.[0]
  // console.log('productId', productId)

  if (selectedSku) {
    productId += `___${selectedSku}`
  }

  const [cookies] = useCookies(['_br_uid_2']);
  const {
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

  const params: ProductDetailInputProps = useMemo(
    () => ({
      itemId: productId,
      brUid2: cookies._br_uid_2,
      connector: discoveryConnector,
      customAttrFields: discoveryCustomAttrFields,
      customVariantAttrFields: discoveryCustomVarAttrFields,
      customVariantListPriceField: discoveryCustomVarListPriceField,
      customVariantPurchasePriceField: discoveryCustomVarPurchasePriceField,
      discoveryAccountId,
      discoveryAuthKey,
      discoveryDomainKey,
      discoveryViewId,
      brEnvType,
    }),
    [
      cookies._br_uid_2,
      discoveryCustomAttrFields,
      productId,
      discoveryAccountId,
      discoveryAuthKey,
      discoveryConnector,
      discoveryCustomVarAttrFields,
      discoveryCustomVarListPriceField,
      discoveryCustomVarPurchasePriceField,
      discoveryDomainKey,
      discoveryViewId,
      brEnvType,
    ],
  );

  // Fetch Product Details via GraphQL
  const [item, loading, error] = useProductDetail(params);

  return (
    <>
      <Container maxWidth='xl' sx={{ pt: 3, pb: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h1">Product Detail Page</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <img src={item?.imageSet?.original?.link?.href || ''} alt={item?.displayName || ''} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">Product ID: {productId}</Typography>
            <Typography variant="h4" component="h1">{item?.displayName}</Typography>
            <Typography variant="body1">
              ${item?.listPrice?.moneyAmounts?.[0]?.displayValue}
            </Typography>
            <Typography variant="body1">{item?.description}</Typography>
          </Grid>
          <pre>{JSON.stringify(item, null, 4)}</pre>
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
