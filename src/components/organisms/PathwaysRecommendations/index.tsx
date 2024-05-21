import React, { ReactElement, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { ProductGridWidgetInputProps, useProductGridWidget } from '@bloomreach/connector-components-react';
import { BrProps } from '@bloomreach/react-sdk';
import { ContainerItem, getContainerItemContent } from '@bloomreach/spa-sdk';
import { DUMMY_BR_UID_2_FOR_PREVIEW, parseCategoryPickerField, parseProductPickerField } from '@/lib/utils';

// Components
import Slider from 'react-slick';
import { ProductCard } from '@/components';
import { useTheme, Alert, Box, Container, Typography, CircularProgress } from '@mui/material';

// Contexts
import { CommerceContext } from '@/context/CommerceContext';

// Icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from './PathwaysRecommendations.module.scss'

interface PathwaysRecommendationsParameters {
  interval?: number;
  limit: number;
  showDescription: boolean;
  showPid: boolean;
  showPrice: boolean;
  showTitle: boolean;
  title?: string;
}

interface PathwaysRecommendationsCompound {
  categoryCompound?: { categoryid: string };
  keyword?: string;
  productCompound?: [{ productid?: string }];
  widgetCompound?: {
    widgetid: string;
    widgetalgo: {
      sourceName: string;
      selectionValues: [{ key: string; label: string }];
    };
  };
}


const LIMIT = 16;

export const PathwaysRecommendations = ({ component, page }: BrProps<ContainerItem>): ReactElement | null => {
  const theme = useTheme();

  // Component Parameters
  const { interval, limit, title } = component?.getParameters<PathwaysRecommendationsParameters>() ?? {};

  const {
    categoryCompound,
    keyword,
    productCompound,
    widgetCompound,
  } = (component && page
    && getContainerItemContent<PathwaysRecommendationsCompound>(component, page)) ?? {} as PathwaysRecommendationsCompound;

  const category = useMemo(() => parseCategoryPickerField(categoryCompound?.categoryid)?.categoryId, [categoryCompound]);

  const pids: string[] | undefined = useMemo(() =>
    productCompound?.map(({ productid }: any) =>
      parseProductPickerField(productid)?.itemId?.split('___')?.[1])
      .filter(Boolean as any),
  [productCompound]);

  const { widgetid: widgetId = '', widgetalgo: widgetAlgo } = widgetCompound ?? {};
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
  } = useContext(CommerceContext);
  const [cookies] = useCookies(['_br_uid_2']);
  const brUid2 = cookies._br_uid_2 || (page?.isPreview() ? DUMMY_BR_UID_2_FOR_PREVIEW : undefined);

  const params: ProductGridWidgetInputProps = useMemo(() => {
    const widgetType = widgetAlgo?.selectionValues?.[0].key.split('.')[0] ?? '';
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
      pageSize: limit || LIMIT,
      productIds: pids,
      customAttrFields: discoveryCustomAttrFields,
      customVariantAttrFields: discoveryCustomVarAttrFields,
      customVariantListPriceField: discoveryCustomVarListPriceField,
      customVariantPurchasePriceField: discoveryCustomVarPurchasePriceField,
      brEnvType,
    };
  }, [
    category,
    limit,
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
  ]);

  // console.log('params', params)
  const [, results, loading, apolloError] = useProductGridWidget(params);

  const error = useMemo(() => {
    let message;
    if ((widgetId ?? 'undefined') !== 'undefined' && params.widgetType) {
      switch (params.widgetType) {
        case 'item':
          message = !pids ? 'Widget configured incorrectly: please add Product IDs' : undefined;
          break;
        case 'category':
          message = !category ? 'Widget configured incorrectly: please add a Category ID' : undefined;
          break;
        case 'keyword':
        case 'personalized':
          message = !keyword ? 'Widget configured incorrectly: please add a Keyword' : undefined;
          break;
        default:
          message = undefined;
      }

      if (!message && !results && apolloError) {
        // console.log(apolloError);
        message = 'This widget is not working properly. Try again later.';
      }
    } else {
      message = 'Please configure Widget ID and Widget Type first';
    }

    return message;
  }, [widgetId, params.widgetType, results, apolloError, pids, category, keyword]);


  if (error) {
    return page?.isPreview() ? (
      <Container maxWidth={'xl'}>
        <Alert severity='error'>
          {error}
        </Alert>
      </Container>
    ) : null;
  }

  const PreviousArrow = ({ className, onClick}: any) => {
    return (
      <div className={`${className} ${styles['pathways-recommendations__arrow']} ${styles['pathways-recommendations__arrow-prev']}`} onClick={onClick}>
        <ArrowBackIosNewIcon color="primary" />
      </div>
    );
  }

  const NextArrow = ({ className, onClick}: any) => {
    return (
      <div className={`${className} ${styles['pathways-recommendations__arrow']} ${styles['pathways-recommendations__arrow-next']}`} onClick={onClick}>
        <ArrowForwardIosIcon color="primary" />
      </div>
    );
  }


  const sliderSettings = {
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
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Container maxWidth={'xl'} sx={{ pb: 6 }}>
      {!loading && results?.items ? (
        <>
          { title && <Typography variant='h4' align='center'>{title}</Typography> }
          {/* @ts-ignore */}
          <Slider {...sliderSettings}>
            {/* @ts-ignore */}
            {results?.items?.map((product: any, index) => (
              <Box key={index} sx={{ p: 2 }}>
                <ProductCard product={product} variation={'pacific-home'} />
              </Box>
            ))}
          </Slider>
        </>
      ) : (
        <CircularProgress color="inherit" />
      )}
    </Container>
  )
}
