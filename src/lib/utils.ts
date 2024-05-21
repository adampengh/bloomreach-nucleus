import { Configuration, PageModel, extractSearchParams } from '@bloomreach/spa-sdk';
import { ParsedUrlQuery } from "querystring"
import sanitizeHTML from 'sanitize-html';
import {
  CONSTANTS,
  NEXT_PUBLIC_BRXM_ENDPOINT,
  NEXT_PUBLIC_DEBUG_MODE,
} from "../lib/constants";

export interface CommerceConfig {
  graphqlServiceUrl: string;
  connector: string;
  discoveryAccountId?: string;
  discoveryAuthKey?: string;
  discoveryDomainKey?: string;
  discoveryViewId?: string | null;
  discoveryCatalogViews?: string | null;
  discoveryCustomAttrFields?: string[];
  discoveryCustomVarAttrFields?: string[];
  discoveryCustomVarListPriceField?: string | null;
  discoveryCustomVarPurchasePriceField?: string | null;
  brEnvType?: string;
  brAccountName?: string;
}

export const DUMMY_BR_UID_2_FOR_PREVIEW = 'uid%3D0000000000000%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55';

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
    discoveryAccountId: process.env.NEXT_PUBLIC_DISCOVERY_ACCOUNT_ID || channelParams?.discoveryAccountId,
    discoveryAuthKey: process.env.NEXT_PUBLIC_DISCOVERY_AUTH_KEY,
    discoveryDomainKey: process.env.NEXT_PUBLIC_DISCOVERY_DOMAIN_KEY || channelParams?.discoveryDomainKey,
    discoveryViewId: channelParams?.discoveryViewId || process.env.NEXT_PUBLIC_DISCOVERY_VIEW_ID || null,
    discoveryCatalogViews: process.env.NEXT_PUBLIC_DISCOVERY_CATALOG_VIEWS || null,
    discoveryCustomAttrFields: process.env.NEXT_PUBLIC_DISCOVERY_CUSTOM_ATTR_FIELDS?.split(','),
    discoveryCustomVarAttrFields: process.env.NEXT_PUBLIC_DISCOVERY_CUSTOM_VARIANT_ATTR_FIELDS?.split(','),
    discoveryCustomVarListPriceField: process.env.NEXT_PUBLIC_DISCOVERY_CUSTOM_VARIANT_LIST_PRICE_FIELD || null,
    discoveryCustomVarPurchasePriceField: process.env.NEXT_PUBLIC_DISCOVERY_CUSTOM_VARIANT_PURCHASE_PRICE_FIELD || null,
    brEnvType: channelParams?.discoveryRealm === 'PRODUCTION'
      ? ''
      : channelParams?.discoveryRealm || process.env.NEXT_PUBLIC_BR_ENV_TYPE,
    brAccountName: getBrAccountName(page, query),
  };

  return commerceConfig;
}

export const notEmpty = <T>(value: T | null | undefined): value is T => {
  return !!value;
}

const getBrAccountName = (pageModel: PageModel, query?: ParsedUrlQuery): string | undefined => {
  if (process.env.NEXT_PUBLIC_BR_ACCOUNT_NAME) {
    return process.env.NEXT_PUBLIC_BR_ACCOUNT_NAME;
  }

  const { graphqlTenantName } = pageModel.channel?.info.props as ChannelParameters;
  if (graphqlTenantName) {
    return graphqlTenantName.toLowerCase();
  }

  const endpoint = NEXT_PUBLIC_BRXM_ENDPOINT;
  if (!endpoint) {
    return undefined;
  }
  const endpointValue = Array.isArray(endpoint) ? endpoint[0] : endpoint;
  return new URL(endpointValue).hostname.split('.')[0];
}


export const parseCategoryPickerField = (categoryIdValue?: string): { categoryId: string, connectorId?: string; } | undefined => {
  if (!categoryIdValue) {
    return undefined;
  }

  try {
    // new field format in JSON
    const { categoryid: categoryId, connectorid: connectorId } = JSON.parse(categoryIdValue);
    if (categoryId) {
      return {
        categoryId,
        connectorId,
      };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error parsing categoryid as JSON: ', err);
  }

  // fall-back to old field format (categoryid as string)
  return { categoryId: categoryIdValue };
}


export const parseProductPickerField = (
  productIdValue?: string,
  variantIdValue?: string
): { itemId: string, connectorId?: string; } | undefined => {
  if (!productIdValue) {
    return undefined;
  }

  try {
    // new field format as a combination of productid/variantid in JSON
    const { productid: productId, variantid: variantId, connectorid: connectorId } = JSON.parse(productIdValue);
    const selectedId = variantId?.id ? variantId : productId;
    const { id, code } = selectedId;
    if (code) {
      return {
        itemId: `${id}___${code}`,
        connectorId,
      };
    }

    if (id) {
      return {
        itemId: `${id}___${id}`,
        connectorId,
      };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error parsing itemid as JSON: ', err);
  }

  // fall-back to old field format as separated productid and variantid fields
  const selectedId = variantIdValue?.length ? variantIdValue : productIdValue;
  const [, id, code] = selectedId?.match(/id=([\w\d._=-]+[\w\d=]?)?;code=([\w\d._=/-]+[\w\d=]?)?/i) ?? [];
  if (code) {
    return { itemId: `${id}___${code}` };
  }
  return { itemId: `${id}___${id}` };
}


export const sanitize = (content: string): string => {
  return sanitizeHTML(content, {
    allowedAttributes: {
      a: ['href', 'name', 'target', 'title', 'data-type', 'rel'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
    },
    allowedTags: sanitizeHTML.defaults.allowedTags.concat(['img']),
  });
}
