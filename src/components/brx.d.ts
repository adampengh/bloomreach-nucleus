/**
 * This is where all types for the components are declared
 */

interface BrxComponentWrapper {
  document: import('@bloomreach/spa-sdk').Document;
  component?: import('@bloomreach/spa-sdk').Component;
  page?: import('@bloomreach/spa-sdk').Page;
  isStorybook?: boolean;
}

interface BannerDocument {
  content: Content;
  cta?: string;
  image?: import('@bloomreach/spa-sdk').Reference;
  link?: import('@bloomreach/spa-sdk').Reference;
  title?: string;
}

interface ChannelParameters {
  discoveryAccountId: string;
  discoveryDomainKey?: string;
  discoveryViewId?: string;
  discoveryRealm: string;
  graphql_baseurl?: string;
  graphqlTenantName?: string;
}

interface Content {
  value: string;
}

interface ContentDocument {
  content: Content;
  date?: number;
  image?: import('@bloomreach/spa-sdk').Reference;
  introduction?: string;
  title?: string;
}

interface MenuModels {
  menu: Reference;
}

interface ProductDocument {
  brand: string;
  description: string;
  pid: string;
  title: string;
  price: number;
  sale_price?: number;
  thumb_image?: string;
  url: string;
}

interface ResourceBundle {
  keys: string[];
  messages: string[];
}

interface SelectionType {
  selectionValues: { key: string; label: string }[];
}

interface OpenGraphCompound {
  description: string;
  image?: import('@bloomreach/spa-sdk').Reference;
  type: string;
  locale: string;
  url: string;
}

interface PageDocument {
  title: string;
  description: string;
  preventIndexing: boolean;
  ogCompound: OpenGraphCompound;
}

interface PageProps {
  configuration: Omit<Configuration, 'httpClient'>;
  page?: PageModel;
  commerceConfig?: CommerceConfig;
  [APOLLO_STATE_PROP_NAME]?: any;
  cookies?: Record<string, string>;
}

interface ProductListingPageProps {
  configuration: Omit<Configuration, 'httpClient'>;
  page?: PageModel;
  commerceConfig?: CommerceConfig;
  [APOLLO_STATE_PROP_NAME]?: any;
  cookies?: Record<string, string>;
  query?: import('querystring').ParsedUrlQuery;
}

interface ProductDetailPageProps {
  configuration: Omit<Configuration, 'httpClient'>;
  page?: PageModel;
  commerceConfig?: CommerceConfig;
  [APOLLO_STATE_PROP_NAME]?: any;
  cookies?: Record<string, string>;
  query?: import('querystring').ParsedUrlQuery;
  productId?: string;
}

interface PathwaysRecommendationsCompound {
  categoryCompound?: {
    categoryid: string;
    useCategoryIdFromPage: boolean;
  };
  keyword?: string;
  productCompound?: {
    productid?: string;
    usePidFromPdp: boolean;
  };
  widgetCompound?: {
    widgetid: string;
    widgetalgo: {
      sourceName: string;
      selectionValues: [{ key: string; label: string }];
    };
  };
}

interface PathwaysRecommendationsProps {
  fullWidth?: boolean
  maxItems?: number
}
