import React, { useContext, useMemo, useState } from 'react'
import { CommerceContext } from '@/context/CommerceContext'
import { ProductDetailInputProps, useProductDetail } from '@bloomreach/connector-components-react'
import { BrComponent } from '@bloomreach/react-sdk'
import { useCookies } from 'react-cookie'

import { Backdrop, CircularProgress, Container, Grid, Typography } from '@mui/material'
import { ProductPrice } from '@/components'

export const ProductDetailLayout = ({
  query,
}: any) => {
  const [productId, setProductId] = useState('');

  useMemo(() => {
    const {
      product: productArray,
      selectedSku,
    } = query
    let productId = productArray?.[0]
    if (selectedSku) {
      productId += `___${selectedSku}`
    }

    setProductId(productId)
  }, [query])

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
    <div data-page-layout="product-detail-layout">
      {(loading && !item) ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          {item &&
            <Container maxWidth='xl' sx={{ py: 10 }}>

              {/* Top */}
              <Grid container spacing={6}>
                {/* Left */}
                <Grid item xs={12} md={6}>
                  {/* Left */}
                  <img src={item?.imageSet?.original?.link?.href || ''} alt={item?.displayName || ''} style={{width: "100%"}} />
                </Grid>

                {/* Right */}
                <Grid item xs={12} md={6}>
                  {/* Right */}
                  <Typography variant="body1">Product ID: {productId}</Typography>
                  <Typography variant="h4" component="h1">{item?.displayName}</Typography>
                  <ProductPrice
                    listPrice={item?.listPrice?.moneyAmounts?.[0]?.amount}
                    purchasePrice={item?.purchasePrice?.moneyAmounts?.[0]?.amount}
                  />
                  <Typography variant="body1">{item?.description}</Typography>
                </Grid>

                {/* <pre>{JSON.stringify(item, null, 4)}</pre> */}


                {/* Bottom */}
                <BrComponent path="bottom">
                  <Grid item xs={12}>
                    <BrComponent />
                  </Grid>
                </BrComponent>
              </Grid>
            </Container>
          }
        </>
      )}
    </div>
  )
}
