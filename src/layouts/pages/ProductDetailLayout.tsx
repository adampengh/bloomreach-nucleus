import React, { useContext, useMemo, useState } from 'react'
import Head from 'next/head'
import { CommerceContext } from '@/context/CommerceContext'
import { ProductDetailInputProps, useProductDetail } from '@bloomreach/connector-components-react'
import { BrComponent, BrPageContext } from '@bloomreach/react-sdk'
import { useCookies } from 'react-cookie'

import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Tabs,
  Tab,
  Typography,
} from '@mui/material'
import { ProductPrice, TabPanel } from '@/components'
import { getCustomAttributeByName } from '@/lib/utils/Discovery'
import { parseBrxEndpoint, resolve } from '@/lib/utils/Content'
import { ContentDeliveryAPI } from '@/lib/utils/DeliveryApi'


export const ProductDetailLayout = ({
  configuration,
  query,
}: any) => {
  const page = useContext(BrPageContext);
  const [productId, setProductId] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [banner, setBanner] = useState<any>(null);

  useMemo(() => {
    const { selectedSku } = query

    let { productId } = page?.getComponent()?.getParameters<any>();
    if (selectedSku) {
      productId += `___${selectedSku}`
    }
    setProductId(productId)

    // In preview, read the previewProductId from the page component parameters
    if (page?.isPreview() && !productId) {
      const { previewProductId } = page?.getComponent()?.getParameters();
      setProductId(previewProductId)
    }

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

  // Due to the async nature of the component, we need to sync the page after the product details are fetched
  if (!loading && !error) {
    page?.sync()
  }

  const handleTabChange = (event: any, newValue: number) => {
    setValue(newValue);
    page?.sync()
  };

  if (loading) {
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  }


  useMemo(() => {
    if (item) {
      (async () => {
        // Check if there is a preview token
        const { token } = query

        // Get the product_type product attribute from the item object
        const productType = getCustomAttributeByName(item, 'product_type')?.toLowerCase().split(' ').join('-')
        console.log('productType', productType)

        // Get the environment and channel from the configuration endpoint
        const { environment, channel } = parseBrxEndpoint(configuration.endpoint)
        if (!environment || !channel) {
          console.error('Environment and Channel are required')
          return
        }

        // Fetch the banner document using the Document Delivery API V1
        const documentFetcher = new ContentDeliveryAPI(environment, channel, token)
        await documentFetcher.getV1DocumentById(`page-content/pdp/product_type/${productType}`)
          .then(res => setBanner(res.data))
          .catch(err => console.log('err', err))
      })();
    }
  }, [item])


  return (
    <div data-page-layout="product-detail-layout">
      {item &&
        <>
          <Head>
            <title>{item?.displayName}</title>
            {item?.description && <meta key="description" name="description" content={item?.description} />}
          </Head>
          <Container maxWidth={false} disableGutters sx={{ pb: 10 }}>
            {/* Top - All PDPs */}
            <BrComponent path="top">
              <Grid item xs={12}>
                <BrComponent />
              </Grid>
            </BrComponent>
            <BrComponent path="pdp-top">
              <Grid item xs={12}>
                <BrComponent />
              </Grid>
            </BrComponent>

            <Container maxWidth='xl' sx={{ my: 6 }}>
              <Grid container spacing={6}>
                {/* Product Image */}
                <Grid item xs={12} md={6}>
                  <img
                    src={item?.imageSet?.original?.link?.href || ''}
                    alt={item?.displayName || ''}
                    style={{width: "100%"}}
                  />
                </Grid>

                {/* Product Details */}
                <Grid item xs={12} md={6}>
                  {getCustomAttributeByName(item, 'brand') &&
                    <Typography variant="h6" component="h2" color="textSecondary">{getCustomAttributeByName(item, 'brand')}</Typography>
                  }
                  <Typography variant="h3" component="h1" marginBottom={2}>{item?.displayName}</Typography>
                  <ProductPrice
                    listPrice={item?.listPrice?.moneyAmounts?.[0]?.amount}
                    purchasePrice={item?.purchasePrice?.moneyAmounts?.[0]?.amount}
                  />
                  <Typography variant="body1" marginTop={2}>{item?.description}</Typography>
                  <Typography variant="body1" marginTop={2}>Product ID: {productId}</Typography>
                </Grid>

                {/* Product Tabs */}
                <Grid item xs={12}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleTabChange}>
                      <Tab label='Details' />
                      <Tab label='Shipping' />
                      <Tab label='Reviews' />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <Typography variant="body1" marginTop={2}>{item?.description}</Typography>
                    <BrComponent path="details">
                      <Grid item xs={12}>
                        <BrComponent />
                      </Grid>
                    </BrComponent>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <BrComponent path="shipping-tab">
                      <Grid item xs={12}>
                        <BrComponent />
                      </Grid>
                    </BrComponent>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Typography variant='h3'>Reviews</Typography>
                  </TabPanel>
                </Grid>
              </Grid>
            </Container>

            {/* PDPBanner */}
            {banner && <PdpBanner banner={banner} />}

            {/* Bottom - All PDPs */}
            <BrComponent path="bottom">
              <Grid item xs={12}>
                <BrComponent />
              </Grid>
            </BrComponent>
          </Container>
        </>
      }
    </div>
  )
}

const PdpBanner = ({ banner }: any) => {
  console.log('banner', banner)

  const { document: documentRef } = banner
  console.log('documentRef', documentRef)
  const document: any = resolve(banner, documentRef)
  console.log('document', document)
  if (!document) return null

  const {
    content,
    cta,
    image: imageRef,
    link,
    title,
  } = document?.data
  console.log('title', title)

  const image: any = resolve(banner, imageRef)
  console.log('image', image)

  return (
    <Container maxWidth='xl' sx={{ my: 2 }}>
      <Grid item xs={12}>
        {title && <Typography variant='h4'>{title}</Typography>}
        {image && <img src={image?.data?.original?.links?.site?.href} alt={''} style={{ width: '100%' }} />}
      </Grid>
    </Container>
  )
}
