import React, { useContext, useMemo, useState } from 'react'
import Head from 'next/head'
import { CommerceContext } from '@/context/CommerceContext'
import { ProductDetailInputProps, useProductDetail } from '@bloomreach/connector-components-react'
import { BrComponent, BrPageContext } from '@bloomreach/react-sdk'
import { useCookies } from 'react-cookie'

import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { getCustomAttributeByName } from '@/lib/utils/Discovery'
import { parseBrxEndpoint, resolve } from '@/lib/utils/Content'
import { ContentDeliveryAPI } from '@/lib/utils/DeliveryApi'
import ProductDetailModule from '@/modules/product-detail'


export const ProductDetailLayout = ({
  configuration,
  query,
}: any) => {
  const page = useContext(BrPageContext);
  const [productId, setProductId] = useState<string>('');

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
        const {
          token,
          "server-id": serverId,
        } = query
        console.log('TOKEN', token)

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
        const documentFetcher = new ContentDeliveryAPI(environment, channel, token, serverId)
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
            {/* Top - All PDPs (Global) */}
            <BrComponent path="top">
              <Grid item xs={12}>
                <BrComponent />
              </Grid>
            </BrComponent>

            {/* PDP Top - For specific PDPs by Product ID */}
            <BrComponent path="pdp-top">
              <Grid item xs={12}>
                <BrComponent />
              </Grid>
            </BrComponent>

            <ProductDetailModule
              item={item}
              productId={productId}
            />

            {/* PDPBanner */}
            {banner && <PdpBanner banner={banner} />}

            {/* Bottom - All PDPs (Global) */}
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
  const { document: documentRef } = banner
  const document: any = resolve(banner, documentRef)
  if (!document) return null

  const {
    content,
    cta,
    image: imageRef,
    link,
    title,
  } = document?.data

  const image: any = resolve(banner, imageRef)

  return (
    <Container maxWidth='xl' sx={{ my: 2, border: '1px solid blue' }}>
      <Grid item xs={12}>
        {title && <Typography variant='h4'>{title}</Typography>}
        {image && <img src={image?.data?.original?.links?.site?.href} alt={''} style={{ width: '100%' }} />}
      </Grid>
    </Container>
  )
}
