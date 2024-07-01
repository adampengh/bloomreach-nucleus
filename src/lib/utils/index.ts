import { PageModel } from '@bloomreach/spa-sdk';
import { ParsedUrlQuery } from "querystring"

import {
  NEXT_PUBLIC_BRX_ENDPOINT,
  NEXT_PUBLIC_BRX_MULTI_TENANT_SUPPORT,
} from "../constants";

export interface CommerceConfig {
  graphqlServiceUrl: string;
  connector: string;
  discoveryAccountId?: string;
  discoveryAuthKey?: string;
  discoveryDomainKey?: string;
  discoveryViewId?: string;
  discoveryCatalogViews?: string;
  discoveryCustomAttrFields?: string[];
  discoveryCustomVarAttrFields?: string[];
  discoveryCustomVarListPriceField?: string;
  discoveryCustomVarPurchasePriceField?: string;
  brEnvType?: string;
  brAccountName?: string;
}



// eslint-disable-next-line max-len
// Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/discussions/11209
// >>> Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value all together.
// eslint-disable-next-line
export const deleteUndefined = (obj: Record<string, any> | undefined): void => {
  if (obj) {
    Object.keys(obj).forEach((key: string) => {
      if (obj[key] && typeof obj[key] === 'object') {
        deleteUndefined(obj[key]);
      } else if (typeof obj[key] === 'undefined') {
        delete obj[key]; // eslint-disable-line no-param-reassign
      }
    });
  }
}

/**
 *
 * @param page {PageModel}
 * @param query {ParsedUrlQuery=}
 */
export const loadCommerceConfig = (page: PageModel, query?: ParsedUrlQuery): CommerceConfig => {
  const channelParams = page.channel?.info.props as ChannelParameters | undefined;
  const commerceConfig: CommerceConfig = {
    graphqlServiceUrl:
      channelParams?.graphql_baseurl || process.env.NEXT_PUBLIC_APOLLO_SERVER_URI || 'http://localhost:4000',
    connector: process.env.NEXT_PUBLIC_DEFAULT_CONNECTOR ?? '',
    discoveryAccountId: channelParams?.discoveryAccountId || process.env.NEXT_PUBLIC_DISCOVERY_ACCOUNT_ID,
    discoveryAuthKey: process.env.NEXT_PUBLIC_DISCOVERY_AUTH_KEY,
    discoveryDomainKey: channelParams?.discoveryDomainKey || process.env.NEXT_PUBLIC_DISCOVERY_DOMAIN_KEY,
    discoveryViewId: channelParams?.discoveryViewId || process.env.NEXT_PUBLIC_DISCOVERY_VIEW_ID || '',
    discoveryCatalogViews: process.env.NEXT_PUBLIC_DISCOVERY_CATALOG_VIEWS || '',
    discoveryCustomAttrFields: process.env.NEXT_PUBLIC_DISCOVERY_CUSTOM_ATTR_FIELDS?.split(','),
    discoveryCustomVarAttrFields: process.env.NEXT_PUBLIC_DISCOVERY_CUSTOM_VARIANT_ATTR_FIELDS?.split(','),
    discoveryCustomVarListPriceField: process.env.NEXT_PUBLIC_DISCOVERY_CUSTOM_VARIANT_LIST_PRICE_FIELD,
    discoveryCustomVarPurchasePriceField: process.env.NEXT_PUBLIC_DISCOVERY_CUSTOM_VARIANT_PURCHASE_PRICE_FIELD,
    brEnvType: channelParams?.discoveryRealm === 'PRODUCTION'
      ? ''
      : channelParams?.discoveryRealm || process.env.NEXT_PUBLIC_BR_ENV_TYPE,
    brAccountName: getBrAccountName(page, query),
  };

  return commerceConfig;
}

const getBrAccountName = (pageModel: PageModel, query?: ParsedUrlQuery): string | undefined => {
  if (process.env.NEXT_PUBLIC_BR_ACCOUNT_NAME) {
    return process.env.NEXT_PUBLIC_BR_ACCOUNT_NAME;
  }

  const { graphqlTenantName } = pageModel.channel?.info.props as ChannelParameters;
  if (graphqlTenantName) {
    return graphqlTenantName.toLowerCase();
  }

  const endpoint = NEXT_PUBLIC_BRX_ENDPOINT || (NEXT_PUBLIC_BRX_MULTI_TENANT_SUPPORT ? query?.endpoint : '');
  if (!endpoint) {
    return undefined;
  }
  const endpointValue = Array.isArray(endpoint) ? endpoint[0] : endpoint;
  return new URL(endpointValue).hostname.split('.')[0];
}









