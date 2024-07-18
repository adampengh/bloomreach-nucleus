import React, { ReactElement, useContext, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ProductGridWidgetInputProps, useProductGridWidget } from '@bloomreach/connector-components-react'
import { BrxComponentWrapperProps } from '@/lib/BrxComponentWrapper'

// Components
import Slider from 'react-slick'
import { ProductCard } from '@/components'
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'

// Contexts
import { CommerceContext } from '@/context/CommerceContext'

// Icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

// Utils
import { DUMMY_BR_UID_2_FOR_PREVIEW } from '@/lib/utils/Discovery'
import { parseCategoryPickerField, parseProductPickerField } from '@/lib/utils/Content'

// Styles
import styles from './PathwaysRecommendations.module.scss'


const LIMIT = 16

export const PathwaysRecommendations = ({ document, component, page }: BrxComponentWrapperProps): ReactElement | null => {
  // const { query } = useRouter()

  // State
  const [productId, setProductId] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');

  // Component Parameters
  const { fullWidth, maxItems } = component?.getParameters<PathwaysRecommendationsProps>() ?? {}

  // Document Data
  const {
    carouselSettings,
    heading,
    pathwaysRecommendations: pathwaysCompound,
  } = document?.getData<any>()

  useMemo(() => {
    // const { selectedSku } = query

    let { productId, categoryId } = page?.getComponent()?.getParameters<any>();
    // if (selectedSku) {
    //   productId += `___${selectedSku}`
    // }
    setProductId(productId)
    setCategoryId(categoryId)

    // In preview, read the previewProductId from the page component parameters
    if (page?.isPreview() && !productId) {
      const { previewProductId } = page?.getComponent()?.getParameters();
      setProductId(previewProductId)
    }
    // In preview, read the previewCategoryId from the page component parameters
    if (page?.isPreview() && !categoryId) {
      const { previewCategoryId } = page?.getComponent()?.getParameters();
      setCategoryId(previewCategoryId)
    }
  }, [])

  const {
    categoryCompound,
    keyword,
    productCompound,
    widgetCompound,
  } = pathwaysCompound ?? {} as PathwaysRecommendationsCompound

  // Category ID from Category Picker or Current PLP
  const {
    categoryid,
    useCategoryIdFromPage,
  } = categoryCompound ?? {}
  const parsedCategoryId = useMemo(() => parseCategoryPickerField(categoryid)?.categoryId, [categoryCompound])
  let category: string = ''
  if (parsedCategoryId) category = parsedCategoryId
  if (useCategoryIdFromPage) category = categoryId

  // Product IDs from Product Picker or Current PDP
  let pids: string[] = []
  // useMemo(() => {
    const {
      productid,
      usePidFromPage,
    } = productCompound ?? {}
    // console.log('productCompound', productCompound)
    const parsedProductId = parseProductPickerField(productid)?.itemId?.split('___')?.[1]
    if (parsedProductId) pids = [parsedProductId]
    if (usePidFromPage) pids = [productId?.split('___')?.[0]]
  // }, [query])

  // Widget ID and Algorithm from Widget Picker
  const {
    widgetid: widgetId = '',
    widgetalgo: widgetAlgo
  } = widgetCompound ?? {}

  const {
    discoveryDomainKey,
    discoveryViewId,
    discoveryAccountId,
    discoveryAuthKey,
    discoveryCatalogViews,
    discoveryCustomAttrFields,
    discoveryCustomVarAttrFields,
    discoveryCustomVarListPriceField,
    discoveryCustomVarPurchasePriceField,
    brEnvType,
  } = useContext(CommerceContext)
  const [cookies] = useCookies(['_br_uid_2'])
  const brUid2 = cookies._br_uid_2 || (page?.isPreview() ? DUMMY_BR_UID_2_FOR_PREVIEW : undefined)

  const params: ProductGridWidgetInputProps = useMemo(() => {
    const widgetType = widgetAlgo?.selectionValues?.[0].key.split('.')[0] ?? ''
    return {
      discoveryAccountId,
      discoveryAuthKey,
      discoveryCatalogViews,
      discoveryDomainKey,
      discoveryViewId,
      widgetId,
      widgetType,
      brUid2,
      searchText: keyword,
      categoryId: category,
      pageSize: maxItems || LIMIT,
      productIds: pids,
      customAttrFields: discoveryCustomAttrFields,
      customVariantAttrFields: discoveryCustomVarAttrFields,
      customVariantListPriceField: discoveryCustomVarListPriceField,
      customVariantPurchasePriceField: discoveryCustomVarPurchasePriceField,
      brEnvType,
    }
  }, [
    category,
    maxItems || LIMIT,
    brUid2,
    keyword,
    pids,
    discoveryAccountId,
    discoveryAuthKey,
    discoveryCatalogViews,
    discoveryCustomAttrFields,
    discoveryCustomVarAttrFields,
    discoveryCustomVarListPriceField,
    discoveryCustomVarPurchasePriceField,
    discoveryDomainKey,
    discoveryViewId,
    widgetAlgo,
    widgetId,
    brEnvType,
  ])

  const [onLoadMore, results, loading, apolloError] = useProductGridWidget(params)

  const error = useMemo(() => {
    let message
    if ((widgetId ?? 'undefined') !== 'undefined' && params.widgetType) {
      switch (params.widgetType) {
        case 'item':
          message = !pids ? 'Widget configured incorrectly: please add Product IDs' : undefined
          break
        case 'category':
          message = !category ? 'Widget configured incorrectly: please add a Category ID' : undefined
          break
        case 'keyword':
        case 'personalized':
          message = !keyword ? 'Widget configured incorrectly: please add a Keyword' : undefined
          break
        default:
          message = undefined
      }

      if (!message && !results && apolloError) {
        message = 'This widget is not working properly. Try again later.'
      }
    } else {
      message = 'Please configure Widget ID and Widget Type first'
    }

    return message
  }, [widgetId, params.widgetType, results, apolloError, pids, category, keyword])

  const PreviousArrow = ({ className, onClick}: any) => {
    return (
      <div className={`${className} ${styles['pathways-recommendations__arrow']} ${styles['pathways-recommendations__arrow-prev']}`} onClick={onClick}>
        <ArrowBackIosNewIcon color="primary" />
      </div>
    )
  }

  const NextArrow = ({ className, onClick}: any) => {
    return (
      <div className={`${className} ${styles['pathways-recommendations__arrow']} ${styles['pathways-recommendations__arrow-next']}`} onClick={onClick}>
        <ArrowForwardIosIcon color="primary" />
      </div>
    )
  }

  // Carousel Settings
  const defaultCarouselSettings = {
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    className: styles['pathways-recommendations'],
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 4,
    speed: 750,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
  }
  const {
    dotsStyle: {
      selectionValues: {
        0: {
          key: dotsStyle
        }
      }
    }
  } = carouselSettings ?? {}
  const settings = {
    ...defaultCarouselSettings,
    ...carouselSettings,
    dotsStyle: dotsStyle
  }

  // Loading State
  if (loading) {
    return (
      <Container maxWidth={fullWidth ? false : 'xl'} sx={{ pb: 6 }}>
        <CircularProgress color="inherit" />
      </Container>
    )
  }

  // Error State
  if (error) {
    return page?.isPreview() ? (
      <Container maxWidth={'xl'}>
        <Alert severity='error'>
          {error}
        </Alert>
      </Container>
    ) : null
  }

  return (
    <Container maxWidth={fullWidth ? false : 'xl'} sx={{ p: 6 }}>
      {!loading && results?.items &&
        <>
          {heading && <Typography variant="h4" gutterBottom>{heading}</Typography>}
          <Slider {...settings}>
            {results?.items?.map((product: any, index) => (
              <Box key={index} sx={{ p: 2 }}>
                <ProductCard product={product} variation={'pacific-home'} />
              </Box>
            ))}
          </Slider>
        </>
      }
    </Container>
  )
}
