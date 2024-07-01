import { Reference } from '@bloomreach/spa-sdk';
import sanitizeHTML from 'sanitize-html';


export const parseBrxEndpoint = (endpoint: string) => {
  const regexp = /https?\:\/\/([a-zA-Z0-9\-]+)\.(?:.*)\/channels\/([a-zA-Z0-9\-]+)\/pages/g
  const match = [...endpoint.matchAll(regexp)];
  console.log('buildCongiguration [match]', match)
  const environment = match?.[0]?.[1]
  const channel = match?.[0]?.[2]
  console.log('buildCongiguration [environment]', environment)
  console.log('buildCongiguration [channel]', channel)

  return { environment, channel}
}

export const parseCategoryPickerField = (
  categoryIdValue?: string
): {
  categoryId: string,
  connectorId?: string;
} | undefined => {
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
): {
  itemId: string,
  connectorId?: string;
} | undefined => {
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

export const resolve = <T>(object: Record<string, any>, reference: Reference): T | undefined => {
  return reference.$ref.split('/').reduce((value, key) => (key ? value?.[key] : object), object) as T;
}

